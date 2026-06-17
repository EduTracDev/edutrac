import { BadRequestException, ForbiddenException, ConflictException, NotFoundException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TenantService } from '../../tenant/tenant.service';
import { OAuthStateService } from './oauthstate.service';
import { RegisterTenantDto, VerifyAccountDto, LoginDto, UpdatePasswordDto, resendVerificationEmailDto, ForgotPasswordDto } from '../dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import {Request} from 'express';
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
    constructor(private prismaService: PrismaService, private jwtService: JwtService, private tokenService: TokenService, private mailService: MailService, private tenantService: TenantService, private config: ConfigService, private oauthStateService: OAuthStateService) { }


    async registerTenantViaEmailPassword(dto: RegisterTenantDto) {
        try {
            if (dto.password !== dto.passwordConfirm) throw new BadRequestException("Passwords do not match");
            const existingTenant = await this.prismaService.tenant.findUnique({
                where: {
                    slug: dto.organisation_name
                }
            });
            if (existingTenant) throw new BadRequestException("This name is not available. Please choose another");
            const hash = await argon.hash(dto.password);

            const result = await this.tenantService.createTenant({
                organisation_name: dto.organisation_name,
                slug: dto.organisation_name,
                password: hash,
                packagePlanId: dto.packagePlanId,
                email: dto.email,
                isOAuth: false,
            })
            if (!result) throw new BadRequestException("Tenant creation failed");
            //Send verification email
            try {
                await this.sendVerificationEmail(result.tenant.organisation_name, result.user.id, result.user.email);
            } catch (emailError) {
                console.error("Tenant created successfully, but verification email not sent", emailError);
            }
            return {
                success: true,
                message: "Organisation registration successful. Please verify your email to continue."
            }
        } catch (err) {
            throw err
        }
    }

    async signInUserViaEmailPassword(dto: LoginDto, tenantId: number) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email_tenantId: {
                        email: dto.email,
                        tenantId
                    }
                }
            })
            if (!user) throw new ForbiddenException("Incorrect credentials");

            const passwordVerified = await argon.verify(user.password!, dto.password)
            if (!passwordVerified) throw new ForbiddenException("incorrect credentials");
            return this.signToken(user.id, user.email, user.tenantId);
        } catch(err){
            throw err;
        }
    }

    async registerTenantViaGoogle(profile: any, state: any) {
        try {
            const existingTenant = await this.prismaService.tenant.findUnique({
                where: {
                    slug: state.tenantDomain,
                },
            });
            if (existingTenant) throw new ConflictException('This domain is already taken');

            const result = await this.tenantService.createTenant({
                organisation_name: state.organisation_name,
                slug: state.tenantDomain,
                packagePlanId: Number(state.packagePlanId),
                email: profile?.emails[0]?.value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                isOAuth: true,
            })
            if (!result) throw new InternalServerErrorException('Tenant and user creation failed');
            return result.user
        } catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Tenant slug already exists');
                }
            }
            throw error;
        }
    }

    async validateSocialUser(req: Request, profile:any){
        try{ 
            const state = this.oauthStateService.verify(req.query.state as string);
                
            if (state.action !== 'register_tenant' && state.action !== 'user_login') throw new BadRequestException('invalid oauth action');
            
            const user = state.action === 'register_tenant' ? await this.registerTenantViaGoogle(profile, state) : state.action === 'user_login' ? await this.signInUserViaGoogle(profile, state) : null;
            if(!user) throw new InternalServerErrorException('Failed to process request');
            return user;
        } catch(error){
            throw error
        }
    }

    async signInUserViaGoogle(profile:any, state:any) {
        try{
            const tenant = await this.prismaService.tenant.findUnique({
                    where: {
                        slug: state.tenantDomain,
                    },
                });
            if (!tenant) throw new NotFoundException('Tenant not found');

            let user = await this.prismaService.user.findFirst({
                where: {
                    email: profile?.emails[0]?.value,
                    tenantId: tenant.id,
                },
            });
            if (!user) throw new NotFoundException('Account not found');

            return { user }
        } catch(error){
            throw error
        }
    }

    /*
        Schools Admin 1 After Reg
    */
    async verifyAccount(dto: VerifyAccountDto, tenantId: number) {
        const tokenHash = this.tokenService.hashToken(dto.token);
        const verificationToken = await this.prismaService.verificationToken.findFirst({
            where: {
                tokenHash: tokenHash,
                type: 'EMAIL_VERIFICATION',
                user: {
                    tenantId: tenantId,
                }
            },
            include: {
                user: true,
            }
        })

        if (!verificationToken) throw new ForbiddenException("Invalid verification token");
        if (verificationToken.expiresAt < new Date()) throw new Error('Expired token');
        if (verificationToken.usedAt) throw new ForbiddenException("Invalid or expired verification token");


        await this.prismaService.$transaction(async(tx) => {
            await tx.user.update({
                where: {
                    id: verificationToken.userId,
                    tenantId: tenantId,
                },
                data: {
                    emailVerified: true,
                    status: 'ACTIVE',
                    emailVerifiedAt: new Date(),
                },
            });
            await tx.tenant.update({
                where: {
                    id: verificationToken.user.tenantId
                },
                data: {
                    isActive: true,
                    status: 'ACTIVE'
                }
            })
            await tx.schoolAdmin.create({
                data: {
                    userId: verificationToken.user.id,
                    tenantId: verificationToken.user.tenantId,
                    employeeId: "emp-tye17"
                }
            });
            await tx.verificationToken.delete({
                where: {
                    id: verificationToken.id,
                },
            });
        })
        return {
            success: true,
            message: "email verification successful"
        }
    }

    /*
        Admin, Parents, Teachers
    */
    async passwordReset(dto: UpdatePasswordDto, tenantId) {
        if (dto.newPassword !== dto.passwordConfirm) throw new BadRequestException("Passwords do not match");
        //Check if current password is correct
        const user = await this.prismaService.user.findUnique({
            where: {
                email_tenantId: {
                    email: dto.email,
                    tenantId
                }
            }
        })
        if (!user) throw new NotFoundException('Account not found');
        const passwordVerified = await argon.verify(user.password!, dto.currentPassword)
        if (!passwordVerified) throw new ForbiddenException("incorrect credentials");
        //Update password
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: await argon.hash(dto.newPassword),
            },
        });
        return {
            success: true,
            message: "Your password has been reset successfully. You can log back in"
        }
    }

    /*
        Admin, Parents, Teachers
    */
    async resendVerificationEmail(dto: resendVerificationEmailDto, tenantId: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email_tenantId: {
                    email: dto.email,
                    tenantId,
                }
            }
        })
        if (!user) throw new NotFoundException('Account not found');
        if (user.emailVerified) throw new ForbiddenException('Email already verified');
        //Send verification email
        await this.sendVerificationEmail(user.firstName ?? "user", user.id, user.email);
        return {
            success: true,
            message: "Verification email sent. Please verify your email to continue."
        }
    }

    /*
        Admin, Parents, Teachers
    */
    async forgotPassword(dto: ForgotPasswordDto, tenantId) {
        if (dto.newPassword !== dto.passwordConfirm) throw new BadRequestException('Passwords do not match');
        const user = await this.prismaService.user.findUnique({
            where: {
                email_tenantId: {
                    email: dto.email,
                    tenantId
                }
            }
        })
        if (!user) throw new BadRequestException('Account not found');
        await this.sendVerificationEmail(user.firstName || '', user.id, user.email);
        return {
            success: true,
            message: "Password reset email sent. Please verify your email to continue."
        }
    }

    // Technical debt...Considering Moving to a Dedeicated Service
    async signToken(userId: Number, email: string, tenantId:number): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
            tenantId
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
    // Technical debt...Considering Moving to a Dedeicated Service
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

    //GET USER
    async getUserInfo(tenantId: number, userId: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
                tenantId,
            }
        })
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

}