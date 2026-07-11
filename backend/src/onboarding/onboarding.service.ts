import { BadRequestException,Injectable } from '@nestjs/common';
import { OnboardingUpdateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadUrls } from 'src/core/types/onboarding.types';
import { TenantWebsiteService } from 'src/tenant/tenant-website.serviice';
import { CreateGalleryImageDto } from 'src/tenant/dto/create-gallery-image.dto';


export interface GalleryUpload {
    url: string;
    publicId: string;
    caption?: string;
}

@Injectable()
export class OnboardingService {
    constructor(private prismaService: PrismaService, private tenantWebsiteService: TenantWebsiteService) { }

    async getOnboardingState(tenantId: number, userId: number) {
        return this.tenantWebsiteService.getOnboardingState(tenantId, userId);
    }

    update(tenantId: number, userId: number, dto: OnboardingUpdateDto, { logoUrl, primaryBannerUrl, secondaryBannerUrl }: UploadUrls) {
        return this.tenantWebsiteService.updateDuringOnboarding(tenantId, userId, dto, { logoUrl, primaryBannerUrl, secondaryBannerUrl });
    }

    async addGalleryImages(tenantId: number, userId: number, files: GalleryUpload[], dto: CreateGalleryImageDto){
        return await this.tenantWebsiteService.addGalleryImages(tenantId, userId, files, dto);
    }

    async completeOnboarding(tenantId: number, userId: number){
        return this.tenantWebsiteService.completeOnboarding(tenantId, userId);
    }
}