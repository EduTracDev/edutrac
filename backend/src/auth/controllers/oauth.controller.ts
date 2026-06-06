import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { OAuthStateService } from '../services/oauthstate.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class OAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthStateService: OAuthStateService,
  ) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(
    @Req() req,
    @Res() res,
  ) {
    try {
      const state =
        this.oauthStateService.verify(
          req.query.state,
        );

      const socialUser = req.user;

      let tokens;

      if (
        state.action ===
        'register_tenant'
      ) {
        tokens =
          await this.authService.registerTenantViaGoogle({
            email: socialUser.email,
            firstName: socialUser.firstName,
            lastName: socialUser.lastName,
            organisation_name: state.organisation_name,
            domain: state.tenantDomain,
            packagePlanId: state.packagePlanId,
          });
      } else {
        tokens =
          await this.authService.signInUserViaGoogle(
            socialUser,
            state.tenantDomain,
          );
      }

      return res.redirect(
        `https://${state.tenantDomain}/auth/callback?token=${tokens.access_token}`,
      );
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}