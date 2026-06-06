import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthStateService } from '../services/oauthstate.service';

@Injectable()
export class GoogleTenantGuard extends AuthGuard(
  'google',
) {
  constructor(
    private readonly oauthStateService: OAuthStateService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    req.query.state =
      this.oauthStateService.sign({
        action: 'register_tenant',
        tenantDomain: req.query.tenantDomain,
        schoolName: req.query.schoolName,
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