import { Injectable } from '@nestjs/common';
import { CompleteOnboardingDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadedOnboardingUrls } from 'src/core/types/onboarding.types';
import { TenantWebsiteService } from 'src/tenant/tenant-website.service';


@Injectable()
export class OnboardingService {
    constructor(private prismaService: PrismaService, private tenantWebsiteService: TenantWebsiteService) { }

    async completeOnboarding(tenantId: number, userId: number, uploads: UploadedOnboardingUrls, dto: CompleteOnboardingDto,) {
        return await this.prismaService.$transaction(async (tx) => {
            await this.tenantWebsiteService.updateBasicInfo(
                tx,
                tenantId,
                userId,
                dto.account,
            );

            await this.tenantWebsiteService.updateWebsite(
                tx,
                tenantId,
                dto.website,
                uploads,
            );

            await this.tenantWebsiteService.replaceGallery(
                tx,
                tenantId,
                dto.gallery,
                uploads.galleryImages,
            );

            const tenant = await this.tenantWebsiteService.markOnboardingComplete(
                    tx,
                    tenantId,
                    userId,
                );

            return {
                success: true,
                message: 'Onboarding completed successfully.',
                data: tenant,
                error: null,
            };
        });
    }
}