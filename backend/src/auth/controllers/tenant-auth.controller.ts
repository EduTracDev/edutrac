import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterTenantDto } from '../dto';

@Controller('institution/auth')
export class TenantAuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async registerTenant(@Body() dto:RegisterTenantDto){
        return this.authService.registerTenantViaEmailPassword(dto)
    }
}