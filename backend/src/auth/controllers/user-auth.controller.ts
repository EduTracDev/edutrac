import { Controller, Body, Post, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto, VerifyAccountDto } from '../dto';
import {MailService} from '../../mail/mail.service';

@Controller('auth/user')
export class UserAuthController {
    constructor(private authService: AuthService, private mailService: MailService) { }

    @Post('register-user')
    async register(@Body() dto: RegisterUserDto) {
        return this.authService.registerUser(dto);
    }

    @Post('verify-email')
    async verifyEmailAddress(@Body() dto: VerifyAccountDto){
        return this.authService.verifyAccount(dto);
    }

    @Post('signin')
    async signin(@Body() dto: RegisterUserDto) {
        return this.authService.signInUser(dto);
    }
}