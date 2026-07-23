import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantWebsiteService } from './tenant-website.service';
import { TenantController } from './tenant.controller';
import { RolesService } from '../auth/services/roles.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [TenantService, TenantWebsiteService, RolesService],
  controllers: [TenantController],
  exports: [TenantService, TenantWebsiteService],
})
export class TenantModule {}
