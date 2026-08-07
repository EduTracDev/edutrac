import { ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthStateService } from '../services/oauthstate.service';


@Injectable()
export class GoogleUserGuard extends AuthGuard('google') {
  constructor(private oauthstateservice: OAuthStateService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const tenantDomain = req?.tenant['domain'];
    const tenantId = req.tenant['id'];
    if(!tenantDomain) throw new BadRequestException('Invalid request. No tenant in request context');
    const rawStatePayload = {
      action: 'user_login',
      tenantDomain,
      tenantId,
    };

    req.oauthStatePayload = rawStatePayload;

    return super.canActivate(context) as Promise<boolean>;
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const state = this.oauthstateservice.sign(req.oauthStatePayload);
    return { state };
  }
}
