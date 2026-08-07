import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterTenantDto } from '../dto';
import { Throttle } from '@nestjs/throttler';

@Controller('/auth')
export class TenantAuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: {limit: 5,ttl: 60}})
  @Post('register')
  async registerTenant(@Body() dto: RegisterTenantDto) {
    return this.authService.registerTenantViaEmailPassword(dto);
  }
}
