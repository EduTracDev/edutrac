import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthStateService } from '../services/oauthstate.service';

@Injectable()
export class GoogleUserGuard extends AuthGuard(
  'google',
) {
  constructor(
    private readonly oauthStateService: OAuthStateService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const host =
      req.headers['x-forwarded-host'] ||
      req.get('host');

    req.query.state =
      this.oauthStateService.sign({
        action: 'user_login',
        tenantDomain: host,
      });

    return super.canActivate(context) as Promise<boolean>;
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return {
      state: req.query.state,
    };
  }
}