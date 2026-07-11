import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import {UploadsModule} from 'src/uploads/uploads.module';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [UploadsModule, TenantModule],
  controllers: [OnboardingController],
  providers: [OnboardingService]
})
export class OnboardingModule {}