import type { Request } from 'express';
import { Controller, Body, Post, Get, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterTenantDto } from '../dto';
import { Tenant } from 'src/core/decorators/get-tenant.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('/auth')
export class TenantAuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: {limit: 2,ttl: 60}})
  @Get('test')
  test(@Tenant() tenant) {
    console.log("Got to the auth controller");
    return 'testing';
  }

  @Throttle({ default: {limit: 5,ttl: 60}})
  @Post('register')
  async registerTenant(@Body() dto: RegisterTenantDto) {
    return this.authService.registerTenantViaEmailPassword(dto);
  }
}
