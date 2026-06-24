import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { RolesService } from '../auth/services/roles.service';

@Module({
  providers: [TenantService, RolesService],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
