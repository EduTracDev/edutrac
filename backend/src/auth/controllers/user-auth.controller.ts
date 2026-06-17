import { Controller, Body, Post, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { VerifyAccountDto, UpdatePasswordDto, LoginDto, resendVerificationEmailDto, ForgotPasswordDto } from '../dto';


@Controller(':tenantId/auth')
export class UserAuthController {
    constructor(private authService: AuthService) { }

    @Post('signin')
    async signin(@Body() dto: LoginDto, @Param('tenantId', ParseIntPipe) tenantId: number) {
        return this.authService.signInUserViaEmailPassword(dto, tenantId);
    }

    @Post('verify-account')
    async verifyEmailAddress(@Body() dto: VerifyAccountDto, @Param('tenantId', ParseIntPipe) tenantId: number){
        return this.authService.verifyAccount(dto, tenantId);
    }

    @Post('reset-password')
    async resetPassword(@Body() dto: UpdatePasswordDto, @Param('tenantId', ParseIntPipe) tenantId: number){
        return this.authService.passwordReset(dto, tenantId);
    }

    @Post('resend-verification-email')
    async resendVerificationEmail(@Body() dto: resendVerificationEmailDto, @Param('tenantId', ParseIntPipe) tenantId: number){
        return this.authService.resendVerificationEmail(dto, tenantId);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() dto: ForgotPasswordDto, @Param('tenantId', ParseIntPipe) tenantId: number){
        return this.authService.forgotPassword(dto, tenantId);
    }

    @Post('me/:tenantId')
    async me(@Param('tenantId', ParseIntPipe) tenantId: number, @Query('userId', ParseIntPipe) userId: number){
        return this.authService.getUserInfo(tenantId, userId);
    }
}