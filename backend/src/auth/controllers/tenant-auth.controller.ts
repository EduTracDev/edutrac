import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dto';
import {MailService} from '../../mail/mail.service'
import { RegisterTenantDto, VerifyAccountDto } from '../dto';

@Controller('auth/tenant')
export class TenantAuthController {
    constructor(private authService: AuthService, private mailService: MailService) { }

    @Post('register-platform')
    async registerTenant(@Body() dto:RegisterTenantDto){
        return this.authService.registerTenant(dto)
    }

    @Post('signin')
    async signin(@Body() dto: RegisterUserDto) {
        return this.authService.signInUser(dto);
    }

    @Post('verifyaccount')
    async verifyEmailAddress(@Body() dto: VerifyAccountDto){
        return this.authService.verifyAccount(dto);
    }
}