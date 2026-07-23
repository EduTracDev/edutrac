import { Controller, Get, Req, Res, UseGuards, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { OAuthStateService } from '../services/oauthstate.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleTenantGuard } from '../guards/google-tenant.guard';
import { GoogleUserGuard } from '../guards/google-user.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class OAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthStateService: OAuthStateService,
    private readonly config: ConfigService
  ) {}


  @Get('google/register') //tenant guard interceptor
  @UseGuards(GoogleTenantGuard)
  googleTenantRegister() {
    
  }

  @UseGuards(AuthGuard('google')) //GoogleStrategy interceptor
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    try {
      const user = req.user;
      const state = this.oauthStateService.verify(req.query.state);
      const tokens = await this.authService.signToken(
        user.id,
        user.email,
        user.tenantId,
      );

      const redirectUrl =
        state.action === 'register_tenant'
          ? `${this.config.get('FRONTEND_URL')}/auth/google/callback?access_token=${tokens.access_token}`
          : `${this.config.get('FRONTEND_URL')}/auth/google/callback?domain=${state.tenantDomain}&token=${tokens.access_token}`;  
          return res.redirect(redirectUrl);
    } catch (err) {
      console.error('Google OAuth Callback Error:', err);
      return res.redirect('/auth/error');
    }
  }

  @Get('google/signin')
  @UseGuards(GoogleUserGuard)
  async googleLoginUser() {}
}