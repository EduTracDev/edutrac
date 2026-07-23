import {
  Controller,
  Body,
  Post,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  VerifyAccountDto,
  UpdatePasswordDto,
  LoginDto,
  resendVerificationEmailDto,
  ForgotPasswordDto,
} from '../dto';
import { Tenant } from 'src/core/decorators/get-tenant.decorator';
import { Throttle } from '@nestjs/throttler';
import { AllowIncompleteOnboarding } from 'src/onboarding/decorators/skip-onboarding.decorator';

//abcschools.edutrac.com
//Get the tenantDomain from req host
@Controller('/auth')
@AllowIncompleteOnboarding()
export class UserAuthController {
  constructor(private authService: AuthService) {}
  
  @Throttle({ default: {limit: 5,ttl: 60}})
  @Post('signin')
  async signin(@Tenant() tenant, @Body() dto: LoginDto) {
    return this.authService.signInUserViaEmailPassword(dto, tenant.id);
  }

  @Throttle({ default: {limit: 5,ttl: 60}})
  @Post('verify-account')
  async verifyEmailAddress(@Body() dto: VerifyAccountDto) {
    return this.authService.verifyAccount(dto);
  }

  @Throttle({ default: {limit: 5,ttl: 60}})
  @Post('reset-password')
  async resetPassword(@Tenant() tenant, @Body() dto: UpdatePasswordDto) {
    const tenantId = tenant['id'];
    return this.authService.passwordReset(dto, tenantId);
  }

  @Throttle({ default: {limit: 5,ttl: 60}})
  @Post('resend-verification-email')
  async resendVerificationEmail(
    // @Tenant() tenant,
    @Body() dto: resendVerificationEmailDto,
  ) {
    // const tenantId = tenant['id'];
    return this.authService.resendVerificationEmail(dto);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Tenant() tenant,
  ) {
    const tenantId = tenant['id']
    return this.authService.forgotPassword(dto, tenantId);
  }
}