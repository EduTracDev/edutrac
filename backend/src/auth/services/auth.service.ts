import {
  BadRequestException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TenantService } from '../../tenant/tenant.service';
import { OAuthStateService } from './oauthstate.service';
import {
  RegisterTenantDto,
  VerifyAccountDto,
  LoginDto,
  UpdatePasswordDto,
  resendVerificationEmailDto,
  ForgotPasswordDto,
} from '../dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { Request } from 'express';
import { Prisma } from 'src/generated/prisma/client';


/**
 * @description: Handles authentication related operations
    - Register tenant via email and password
    - Verify account via email
    - Sign in user via email and password
    - Password reset via email
    - Resend verification email
*/

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private mailService: MailService,
    private tenantService: TenantService,
    private config: ConfigService,
    private oauthStateService: OAuthStateService,
  ) {}

  async registerTenantViaEmailPassword(dto: RegisterTenantDto) {
    try {
      if (dto.password !== dto.passwordConfirm)
        throw new BadRequestException('Passwords do not match');
      
      const hash = await argon.hash(dto.password);
      const existingTenantOwner = await this.prismaService.tenant.findFirst({
        where: {
          createdBy: {
            email: dto.email.toLowerCase(),
          }
        },
        select: {
          id: true,
          publicId: true,
          school_name: true,
        }
      })
      if (existingTenantOwner) throw new ConflictException('This email is already registered on this platform');
      const result = await this.tenantService.createTenant({
        school_name: dto.school_name.toLowerCase(),
        password: hash,
        packagePlanId: dto.packagePlanId,
        email: dto.email,
        isOAuth: false,
      });
      if (!result) throw new BadRequestException('Tenant creation failed');
      //Send verification email
      try {
        await this.sendVerificationEmail(
          result.tenant.school_name,
          result.user.id,
          result.user.email,
          'auth/verify-email',
        );
      } catch (emailError) {
        console.error(
          'Tenant created successfully, but verification email not sent',
          emailError,
        );
      }
      return {
        success: true,
        message:
          'School registration successful. Please verify your email to continue.',
        data: null,
        error: null,
      };
    } catch (err) {
      throw err;
    }
  }

  async signInUserViaEmailPassword(dto: LoginDto, tenantId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email_tenantId: {
            email: dto.email.toLowerCase(),
            tenantId,
          },
        },
      });
      if (!user) throw new ForbiddenException('Incorrect credentials');

      const passwordVerified = await argon.verify(user.password!, dto.password);
      if (!passwordVerified) throw new ForbiddenException('incorrect credentials');
      return this.signToken(user.id, user.email, user.tenantId);
    } catch (err) {
      throw err;
    }
  }

  async registerTenantViaGoogle(profile: any, state: any) {
    try {
      await this.prismaService.cleanDb();
      if (!profile || !state) throw new BadRequestException('Required fields missing');
            
      const existingTenantOwner = await this.prismaService.tenant.findFirst({
        where: {
          createdBy: {
            email: profile?.emails[0]?.value.toLowerCase(),
          },
        },
        select: {
          id: true,
          publicId: true,
          school_name: true,
        }
      })
      if (existingTenantOwner) throw new ConflictException('This email is already registered on this platform');

      const result = await this.tenantService.createTenant({
        school_name: state.school_name,
        packagePlanId: Number(state.packagePlanId),
        email: profile?.emails[0]?.value.toLowerCase(),
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        isOAuth: true,
      });
      if (!result) throw new InternalServerErrorException('Tenant and user creation failed');
      console.log("result:", result);
      return result.user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Tenant slug already exists');
        }
      }
      throw error;
    }
  }

  async validateSocialUser(req: Request, profile: any) {
    try {
      const state = this.oauthStateService.verify(req.query.state as string);

      if (state.action !== 'register_tenant' && state.action !== 'user_login')
        throw new BadRequestException(
          'invalid oauth action. contact for valid actions',
        );

      const user = state.action === 'register_tenant' ? await this.registerTenantViaGoogle(profile, state) : state.action === 'user_login' ? await this.signInUserViaGoogle(profile, state) : null;
      if (!user) throw new InternalServerErrorException('Failed to process request');
      return user;
    } catch (error) {
      throw error;
    }
  }

  //abcschools.edutrac.com
  async signInUserViaGoogle(profile: any, state: any) {
    try {
      const tenant = await this.prismaService.tenant.findFirst({
        where: {
          school_name: "Silverlite Montessori",
        },
      });
      // const tenant = await this.prismaService.tenant.findUnique({
      //   where: {
      //     domain: state.tenantDomain,
      //   },
      // });
      if (!tenant) throw new NotFoundException('Invalid request. Contact your schools administrator to ensure this service still exists');

      const user = await this.prismaService.user.findFirst({
        where: {
          email: profile?.emails[0]?.value.toLowerCase(),
          tenantId: tenant.id,
        },
      });
      if (!user) throw new NotFoundException('Account not found');

      return { user };
    } catch (error) {
      throw error;
    }
  }

  /*
        Schools Admin 1 After Reg
    */
  async verifyAccount(dto: VerifyAccountDto) {
    const tokenHash = this.tokenService.hashToken(dto.token);
    const verificationToken = await this.prismaService.verificationToken.findFirst({
        where: {
          tokenHash: tokenHash,
          type: 'EMAIL_VERIFICATION'
        },
        include: {
          user: true,
        },
      });

    if (!verificationToken) throw new ForbiddenException('Invalid verification token');
    if (verificationToken.expiresAt < new Date()) throw new ForbiddenException('Expired token');
    if (verificationToken.usedAt) throw new ForbiddenException('Invalid or expired verification token');
    if(verificationToken.user.email !== dto.email) throw new ForbiddenException('Invalid verification token');

    await this.prismaService.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: verificationToken.userId,
          tenantId: verificationToken.user.tenantId,
        },
        data: {
          emailVerified: true,
          status: 'ACTIVE',
          emailVerifiedAt: new Date(),
        },
      });
      await tx.tenant.update({
        where: {
          id: verificationToken.user.tenantId,
        },
        data: {
          isActive: true,
          status: 'ACTIVE',
        },
      });
      await tx.schoolAdmin.create({
        data: {
          userId: verificationToken.user.id,
          tenantId: verificationToken.user.tenantId,
          employeeId: 'emp-tye17',
        },
      });
      await tx.verificationToken.delete({
        where: {
          id: verificationToken.id,
        },
      });
    });
    return {
      success: true,
      message: 'email verification successful',
    };
  }

  /*
        Admin, Parents, Teachers
    */
  async passwordReset(dto: UpdatePasswordDto, tenantId) {
    if (dto.newPassword !== dto.passwordConfirm) throw new BadRequestException('Passwords do not match');
    //Check if current password is correct
    const user = await this.prismaService.user.findUnique({
      where: {
        email_tenantId: {
          email: dto.email,
          tenantId,
        },
      },
    });
    if (!user) throw new NotFoundException('Account not found');
    const passwordVerified = await argon.verify(
      user.password!,
      dto.currentPassword,
    );
    if (!passwordVerified) throw new ForbiddenException('incorrect credentials');
    //Update password
    await this.prismaService.user.update({
      where: {
        id: user.id,
        tenantId: user.tenantId,
      },
      data: {
        password: await argon.hash(dto.newPassword),
      },
    });
    return {
      success: true,
      message: 'Your password has been reset successfully. You can log back in',
    };
  }

  /*
        Admin, Parents, Teachers
    */
  async resendVerificationEmail(
    dto: resendVerificationEmailDto
  ) {
    // const user = await this.prismaService.user.findUnique({
    //   where: {
    //     email_tenantId: {
    //       email: dto.email,
    //       tenantId,
    //     },
    //   },
    // });
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email
      },
    });
    if (!user) throw new NotFoundException('Account not found');
    if (user.emailVerified) throw new ForbiddenException('Email already verified');
    //Send verification email
    await this.sendVerificationEmail(
      user.firstName ?? 'user',
      user.id,
      user.email,
      'auth/verify-email',
    );
    return {
      success: true,
      message: 'Verification email sent. Please verify your email to continue.',
    };
  }

  /*
        Admin, Parents, Teachers
    */
  async forgotPassword(dto: ForgotPasswordDto, tenantId) {
    if (dto.newPassword !== dto.passwordConfirm)
      throw new BadRequestException('Passwords do not match');
    const user = await this.prismaService.user.findUnique({
      where: {
        email_tenantId: {
          email: dto.email,
          tenantId,
        },
      },
    });
    if (!user) throw new BadRequestException('Account not found');
    await this.sendVerificationEmail(user.firstName || '', user.id, user.email, 'auth/reset-password');
    return {
      success: true,
      message: 'Password reset email sent. Please verify your email to continue.',
    };
  }

  // Technical debt...Considering Moving to a Dedeicated Service
  async signToken(
    userId: number,
    email: string,
    tenantId: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      tenantId,
    };
    const secret = this.config.get('JWT_SECRET');
    const expiresIn = this.config.get('EXPIRES_IN');
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
    return {
      access_token,
    };
  }
  // Technical debt...Considering Moving to a Dedeicated Service
  async sendVerificationEmail(name: string, userId: number, email: string, mailTemplate: string) {
    const token = this.tokenService.generateToken();
    const tokenHash = this.tokenService.hashToken(token);
    await this.prismaService.verificationToken.create({
      data: {
        tokenHash,
        type: 'EMAIL_VERIFICATION',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        userId: userId,
      },
    });

    const verificationUrl = `${this.config.get('FRONTEND_URL')}/auth/verify-email?token=${token}&email=${email}`;

    await this.mailService.sendEmail({
      subject: 'Account Services',
      template: mailTemplate,
      to: email,
      context: {
        firstName: name,
        email: email,
        verificationUrl,
      },
    });
  }

  //GET USER
  async getUserInfo(tenantId: number, userPublicId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        publicId: userPublicId,
        tenantId,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}