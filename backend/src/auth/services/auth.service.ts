import { BadRequestException, ForbiddenException, ConflictException, NotFoundException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TenantService } from '../../tenant/tenant.service';
import { RegisterTenantDto, VerifyAccountDto, LoginDto } from '../dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService, private tokenService: TokenService, private mailService: MailService, private tenantService: TenantService, private config: ConfigService) { }


    async registerTenantViaEmailPassword(dto: RegisterTenantDto) {
        try {
            if (dto.password !== dto.passwordConfirm) throw new BadRequestException("Passwords do not match");
            const existingTenant = await this.prismaService.tenant.findUnique({
                where: {
                    slug: dto.organisation_name
                }
            })
            if (existingTenant) throw new BadRequestException("This name is not available");
            const hash = await argon.hash(dto.password);

            const result = await this.tenantService.createTenant({
                organisation_name: dto.organisation_name,
                slug: dto.organisation_name,
                password_hash: hash,
                packagePlanId: dto.packagePlanId,
                email: dto.email,
                isOAuth: false,
            })
            if (!result) throw new BadRequestException("Tenant creation failed");
            //Send verification email
            await this.sendVerificationEmail(result.tenant.organisation_name, result.user.id, result.user.email);
            return {
                success: true,
                message: "Organisation registration successful. Please verify your email to continue."
            }
        } catch (err) {
            console.error("error occurred:", err);
            throw new InternalServerErrorException(err.message);
        }
    }

    // async registerUser(dto: RegisterUserDto) {
    //     try {
    //         if (dto.password !== dto.passwordConfirm) throw new BadRequestException("Passwords do not match");
    //         const hash = await argon.hash(dto.password);
    //         const user = await this.prismaService.user.create({
    //             data: {
    //                 firstName: "Buchi",
    //                 lastName: "Edutrac",
    //                 tenantId: dto.tenantId,
    //                 email: dto.email,
    //                 password_hash: hash
    //             }
    //         })
    //         if (!user) throw new BadRequestException("User creation failed");

    //         //Send verification email
    //         const token = this.tokenService.generateToken();
    //         const tokenHash = this.tokenService.hashToken(token)
    //         await this.prismaService.verificationToken.create({
    //             data: {
    //                 tokenHash,
    //                 type: 'EMAIL_VERIFICATION',
    //                 expiresAt: new Date(
    //                     Date.now() + 1000 * 60 * 60 * 24,
    //                 ),
    //                 userId: user.id,
    //             }
    //         })

    //         const verificationUrl = `${this.config.get('callbackUrl')}?token=${token}&email=${user.email}`;

    //         await this.mailService.sendEmail({
    //             subject: 'Welcome to Edutrac',
    //             template: 'auth/verify-email',
    //             to: user.email,
    //             context: {
    //                 firstName: user.firstName,
    //                 email: user.email,
    //                 verificationUrl
    //             }
    //         })
    //         const { password_hash, ...userRes } = user;
    //         return userRes;
    //     } catch (err) {
    //         if (err instanceof Prisma.PrismaClientKnownRequestError) {
    //             if (err.code == "P2002") throw new ForbiddenException("Duplicate error");
    //         }
    //         throw err;
    //     }
    // }


    async signInUserViaEmailPassword(dto: LoginDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email_tenantId: {
                    email: dto.email,
                    tenantId: dto.tenantId,
                }
            }
        })
        if (!user) throw new ForbiddenException("Incorrect credentials");
        const passwordVerified = await argon.verify(user.password_hash!, dto.password)
        if (!passwordVerified) throw new ForbiddenException("incorrect credentials");
        return this.signToken(user.id, user.email);
    }

    async verifyAccount(dto: VerifyAccountDto) {
        const tokenHash = this.tokenService.hashToken(dto.token);
        const verificationToken = await this.prismaService.verificationToken.findUnique({
            where: {
                tokenHash: tokenHash,
                type: 'EMAIL_VERIFICATION',
            }
        })
        if (!verificationToken) throw new ForbiddenException("Invalid verification token");
        if (verificationToken.expiresAt < new Date()) throw new Error('Token expired');
        if (verificationToken.usedAt) throw new ForbiddenException("Verification token already used");

        await this.prismaService.user.update({
            where: {
                id: verificationToken.userId,
            },
            data: {
                emailVerified: true,
                emailVerifiedAt: new Date(),
            },
        });
        await this.prismaService.verificationToken.delete({
            where: {
                id: verificationToken.id,
            },
        });
        return {
            success: true,
            message: "email verification successful"
        }
    }

    private async signToken(userId: Number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        };
        const secret = this.config.get('JWT_SECRET');
        const expiresIn = this.config.get('EXPIRES_IN');
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn,
            secret
        })
        return {
            access_token
        }
    }


    async sendVerificationEmail(name: string, userId: number, email: string) {
        const token = this.tokenService.generateToken();
        const tokenHash = this.tokenService.hashToken(token)
        await this.prismaService.verificationToken.create({
            data: {
                tokenHash,
                type: 'EMAIL_VERIFICATION',
                expiresAt: new Date(
                    Date.now() + 1000 * 60 * 60 * 24,
                ),
                userId: userId,
            }
        })

        const verificationUrl = `${this.config.get('callbackUrl')}?token=${token}&email=${email}`;

        await this.mailService.sendEmail({
            subject: 'Welcome to Edutrac',
            template: 'auth/verify-email',
            to: email,
            context: {
                firstName: name,
                email: email,
                verificationUrl
            }
        })
    }

    async registerTenantViaGoogle(dto: {
        email: string;
        firstName: string;
        lastName: string;
        organisation_name: string;
        domain: string;
        packagePlanId: string;
    }) {
        try {
            const existingTenant = await this.prismaService.tenant.findUnique({
                where: {
                    slug: dto.domain,
                },
            });

            if (existingTenant) throw new ConflictException('This domain is already taken');

            const result = await this.tenantService.createTenant({
                organisation_name: dto.organisation_name,
                slug: dto.organisation_name,
                packagePlanId: Number(dto.packagePlanId),
                email: dto.email,
                isOAuth: true,
            })

            return this.signToken(result.user.id, result.user.email);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }


    async signInUserViaGoogle(
        socialUser: any,
        tenantDomain: string,
    ) {
        const tenant =
            await this.prismaService.tenant.findUnique({
                where: {
                    slug: tenantDomain,
                },
            });

        if (!tenant) throw new NotFoundException('Tenant not found');

        let user = await this.prismaService.user.findFirst({
            where: {
                email: socialUser.email,
                tenantId: tenant.id,
            },
        });

        if (!user) throw new NotFoundException('Account not found');

        return this.signToken(user.id, user.email);
    }
}