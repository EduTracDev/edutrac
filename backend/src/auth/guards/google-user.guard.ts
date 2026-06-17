import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthStateService } from '../services/oauthstate.service';

@Injectable()
export class GoogleUserGuard extends AuthGuard( 'google' ) {
  constructor(private oauthstateservice: OAuthStateService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const host = req.headers['x-forwarded-host'] || req.get('host');
    
    const rawStatePayload = {
      action: 'user_login',
      tenantDomain: host,
    };

    req.oauthStatePayload = rawStatePayload;

    return super.canActivate(context) as Promise<boolean>;
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const state = this.oauthstateservice.sign(req.oauthStatePayload)
    return { state };
  }
}