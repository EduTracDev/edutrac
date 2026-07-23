import { Controller, Get, Patch, Post, Body, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { UseGuards } from '@nestjs/common';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/uploads/multer.config';
import { UploadsService } from 'src/uploads/uploads.service';
import { CompleteOnboardingDto } from './dto';
import { AllowIncompleteOnboarding } from './decorators/skip-onboarding.decorator';
import type { UploadedCompleteOnboardingFiles } from 'src/core/types/onboarding.types';

@Controller('onboarding')
@UseGuards(JWTGuard)
@AllowIncompleteOnboarding()
export class OnboardingController {
    constructor(private readonly onboardingService: OnboardingService, private readonly uploadsService: UploadsService) { }
    
    // @Get('')
    // test(@Req() req){
    //     return {status:200, message:"Onboarding route called", data:req.user ? {name: req.user.firstName} : {}}
    // }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 },
        { name: 'primaryBanner', maxCount: 1 },
        { name: 'secondaryBanner', maxCount: 1 },
        { name: 'galleryImages', maxCount: 20 },
    ], multerOptions))
    async completeOnboarding(@Req() req, @Body() dto: CompleteOnboardingDto, @UploadedFiles() files:UploadedCompleteOnboardingFiles){
        const uploads = await this.uploadsService.processCompleteOnboardingUploads(req.user.tenantId, req.user.id, files);
        return this.onboardingService.completeOnboarding(req.user.tenantId, req.user.id, uploads, dto);
    }
}