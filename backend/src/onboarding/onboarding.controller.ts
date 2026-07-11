import { Controller, Get, Patch, Post, Body, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { UseGuards } from '@nestjs/common';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { OnboardingUpdateDto } from './dto';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/uploads/multer.config';
import { UploadsService } from 'src/uploads/uploads.service';
import type { UploadedOnboardingFiles } from 'src/core/types/onboarding.types';
import { CreateGalleryImageDto } from 'src/tenant/dto/create-gallery-image.dto';
import { AllowIncompleteOnboarding } from './decorators/skip-onboarding.decorator';


@Controller('onboarding')
@UseGuards(JWTGuard)
@AllowIncompleteOnboarding()
export class OnboardingController {
    constructor(private readonly onboardingService: OnboardingService, private readonly uploadsService: UploadsService) { }


    @Get()
    getOnboardingState(@Req() req) {
        return this.onboardingService.getOnboardingState(req.user.tenantId, req.user.id);
    }

    @Patch()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 },
        { name: 'primaryBanner', maxCount: 1 },
        { name: 'secondaryBanner', maxCount: 1 },
    ], multerOptions),
    )
    async update(@Req() req, @Body() dto: OnboardingUpdateDto, @UploadedFiles() files: UploadedOnboardingFiles) {
        const uploadedFiles = await this.uploadsService.processOnboardingUploads(files);
        return this.onboardingService.update(req.user.tenantId, req.user.id, dto, uploadedFiles);
    }


    @UseInterceptors(AnyFilesInterceptor(multerOptions))
    @Post('gallery')
    async addGalleryImages(@Req() req, @UploadedFiles() files: Express.Multer.File[], @Body() dto: CreateGalleryImageDto){
        const uploadedGalleryFiles = await this.uploadsService.processGalleryUploads(files);
        
        return await this.onboardingService.addGalleryImages(req.user.tenantId, req.user.id, uploadedGalleryFiles, dto);
    }

    @Post('complete')
    async completeOnboarding(@Req() req){
        return this.onboardingService.completeOnboarding(req.user.tenantId, req.user.id);
    }
}