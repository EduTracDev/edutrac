import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthStateService } from '../services/oauthstate.service';

@Injectable()
export class GoogleTenantGuard extends AuthGuard('google') {
  constructor(private oauthstateService:OAuthStateService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const rawStatePayload = {
      action: 'register_tenant',
      organisation_name: req.query.organisation_name,
      tenantDomain: req.query.tenantDomain,
      packagePlanId: req.query.packagePlanId,
    };

    req.oauthStatePayload = rawStatePayload;
    return super.canActivate(context) as Promise<boolean>;
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const state = this.oauthstateService.sign(req.oauthStatePayload);
    return { state };
  }
}