import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateUserInvitationDto,
  AcceptUserInvitationDto,
  AcceptUserInvitationGoogleDto,
  ResendInvitationDto,
} from '../dto';
import { TokenService } from '../../auth/services/token.service';
import { MailService } from '../../mail/mail.service';
import * as argon from 'argon2';
import { AuthService } from '../../auth/services/auth.service';
import { GoogleAuthService } from './googleAuthService.service';
import { INVITATION_EMAIL_CONFIG } from '../config/invitation-email-config';
import { ProfileFactory } from './invitation-profile.factory';
import { Logger } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InvitationService {
  private logger = new Logger();
  constructor(
    private prismaService: PrismaService,
    private tokenService: TokenService,
    private mailService: MailService,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private invitationProfileFactory: ProfileFactory,
    private config: ConfigService
  ) {}

  async inviteUser(dto: CreateUserInvitationDto, tenantId:number, school_name:string, adminUserId: number) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email_tenantId: {
          email: dto.email,
          tenantId,
        },
      },
    });
    if (existingUser) throw new ConflictException(`A ${dto.invitationType} with this email already exists in your organisation`);

    const token = this.tokenService.generateToken();
    const tokenHash = this.tokenService.hashToken(token);

    const userInvitation = await this.prismaService.$transaction(async (tx) => {
      const role = await tx.role.findFirst({
        where: {
          tenantId,
          name: dto.invitationType,
        },
      });
      if (!role) {
        throw new NotFoundException(`${dto.invitationType} role not found`);
        //Technical debt... Perhaps create the role instead of throwing error? Inconsideration
      }

      await tx.user.create({
        data: {
          email: dto.email,
          tenantId,
          status: 'INVITED',
        },
      });

      const userInvitation = await tx.invitation.create({
        data: {
          email: dto.email,
          type: dto.invitationType,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          tenantId,
          invitedById: adminUserId,
          tokenHash,
          roleId: role.id,
        },
      });
      return userInvitation;
    });

    const invitationUrl = `${this.config.get('FRONTEND_URL')}/invitation/accept?token=${token}`;
    const invitionMailConfig = INVITATION_EMAIL_CONFIG[dto.invitationType];
    //Technical debt...Try catch block for now. Later move to queue based delivery
    try {
      await this.mailService.sendEmail({
        to: dto.email,
        subject: invitionMailConfig.subject,
        template: invitionMailConfig.template,
        context: { invitationUrl, schoolName: school_name },
      });
    } catch (error) {
      this.logger.error('email sending failed:', error);
    }
    return {
      message: 'Invitation sent successfully',
      userInvitation: userInvitation,
    };
  }

  async validateInvitation(token: string) {
    const tokenHash = this.tokenService.hashToken(token);

    const invitation = await this.prismaService.invitation.findUnique({
      where: {
        tokenHash,
      },
      include: {
        role: true,
        tenant: true,
      },
    });
    if (!invitation) throw new ForbiddenException('Invalid invitation');
    if (invitation.status !== 'PENDING') throw new ForbiddenException('Invitation already used');
    if (invitation.expiresAt < new Date()) throw new ForbiddenException('Invitation has expired');

    return invitation;
  }

  async acceptInvitation(dto: AcceptUserInvitationDto, { tenantId }) {
    const tokenHash = this.tokenService.hashToken(dto.token);

    const invitation = await this.prismaService.invitation.findUnique({
      where: {
        tokenHash,
      },
    });
    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.status !== 'PENDING')
      throw new BadRequestException('Invitation already used');
    if (invitation.expiresAt < new Date())
      throw new BadRequestException('Invitation has expired');
    if (invitation.tenantId !== tenantId)
      throw new BadRequestException('Invitation url');

    const user = await this.prismaService.user.findUnique({
      where: {
        email_tenantId: {
          email: invitation.email,
          tenantId: invitation.tenantId,
        },
      },
    });
    if (!user)
      throw new NotFoundException(
        'This account does not exist. Kindly contact the admininstrator for assistance',
      );
    const password = await argon.hash(dto.password);
    const profileData = {
      firstName: dto.firstName,
      lastName: dto.lastName,
    };
    await this.prismaService.$transaction(async (tx) => {
      await this.activateUser(tx, user, profileData, password);
      await this.assignRole(tx, invitation, user);
      await this.createProfile(tx, invitation, user);
    });

    const access_token = await this.authService.signToken(
      user.id,
      user.email,
      user.tenantId,
    );
    return {
      success: true,
      message: 'Your account has been created',
      access_token,
    };
  }

  async acceptInvitationViaGoogle(
    dto: AcceptUserInvitationGoogleDto,
    { tenantId },
  ) {
    const tokenHash = this.tokenService.hashToken(dto.token);
    const invitation = await this.prismaService.invitation.findUnique({
      where: {
        tokenHash,
      },
    });
    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.status !== 'PENDING')
      throw new BadRequestException('Invitation already used');
    if (invitation.expiresAt < new Date())
      throw new BadRequestException('Invitation has expired');
    if (invitation.tenantId !== tenantId)
      throw new BadRequestException('Invitation url');

    const googleUser = await this.googleAuthService.verifyGoogleToken(
      dto.googleToken,
    );
    if (!googleUser || !googleUser.email)
      throw new BadRequestException('Invalid token');
    if (invitation.email !== googleUser.email)
      throw new ForbiddenException(
        'Invalid request. Suspicious activity detected',
      );
    const user = await this.prismaService.user.findUnique({
      where: {
        email_tenantId: {
          email: invitation.email,
          tenantId: invitation.tenantId,
        },
      },
    });
    if (!user)
      throw new NotFoundException(
        'This account does not exist. Kindly contact the administrator for assistance',
      );
    const profileData = {
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
    };
    await this.prismaService.$transaction(async (tx) => {
      await this.activateUser(tx, user, profileData);
      await this.assignRole(tx, invitation, user);
      await this.createProfile(tx, invitation, user);
    });

    const access_token = await this.authService.signToken(
      user.id,
      user.email,
      user.tenantId,
    );
    return {
      success: true,
      message: 'Your account has been created',
      access_token,
    };
  }

  async resendInvitation(dto: ResendInvitationDto, tenantId: number, adminUserId: number) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: {
        id: dto.invitationId,
      },
    });
    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.tenantId !== tenantId)
      throw new BadRequestException('Invitation request');
    if (invitation.status === 'ACCEPTED')
      throw new BadRequestException(
        'This invitation has already been accepted',
      );
    if (invitation.status !== 'PENDING')
      throw new BadRequestException('Invalid or expired invalid');
    const token = this.tokenService.generateToken();
    const tokenHash = this.tokenService.hashToken(token);
    await this.prismaService.invitation.update({
      where: {
        id: dto.invitationId,
      },
      data: {
        tokenHash,
        invitedById: Number(adminUserId),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return {
      success: true,
      message: 'Invitation has been resent',
      token,
    };
  }

  /*
    Helpers
*/
  private async activateUser(
    tx: Prisma.TransactionClient,
    user,
    profileData,
    password?: string,
  ) {
    await tx.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: password ?? null,
        status: 'ACTIVE',
        emailVerified: true,
        emailVerifiedAt: new Date(),
        firstName: profileData.firstName ?? null,
        lastName: profileData.lastName ?? null,
      },
    });
  }
  private async assignRole(tx: Prisma.TransactionClient, invitation, user) {
    const role = await tx.role.findFirst({
      where: {
        id: invitation.roleId!,
        tenantId: invitation.tenantId,
      },
    });
    if (!role) throw new ForbiddenException('Invalid role assignment');
    await tx.userRole.create({
      data: {
        userId: user.id,
        roleId: invitation.roleId!,
      },
    });
  }
  private async createProfile(tx: Prisma.TransactionClient, invitation, user) {
    await tx.invitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });
    const tenant = await tx.tenant.findUnique({
      where: {
        id: invitation.tenantId,
      },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    const school_name = tenant.school_name;
    await this.invitationProfileFactory.create(
      tx,
      invitation.type,
      user.id,
      invitation.tenantId,
      school_name
    );
  }
}