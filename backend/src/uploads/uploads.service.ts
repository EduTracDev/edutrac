import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadedOnboardingFiles } from 'src/core/types/onboarding.types';

@Injectable()
export class UploadsService {
    constructor(private cloudinaryService: CloudinaryService) { }

    async processGalleryUploads(files: Express.Multer.File[]){
        if (files.length < 1) throw new BadRequestException("No image files provided for upload");
        const uploads = await Promise.all(files.map(async (file) => {
            return this.cloudinaryService.uploadImage(file)
        }))
        return uploads;
    }

    async processOnboardingUploads(files: UploadedOnboardingFiles) {
        if (process.env.NODE_ENV === "production") return await this.uploadToCloudinary(files);
        return this.uploadLocal(files)
    }
    
    private async uploadToCloudinary(
        files: UploadedOnboardingFiles,
    )
    //: Promise<UploadedFileUrls> 
    {
        const logo = files.logo?.[0] ? await this.cloudinaryService.uploadImage(files.logo[0]) : undefined;
        const primaryBanner = files.primaryBanner?.[0] ? await this.cloudinaryService.uploadImage(files.primaryBanner[0]) : undefined;
        const secondaryBanner = files.secondaryBanner?.[0] ? await this.cloudinaryService.uploadImage(files.secondaryBanner[0]) : undefined;

        return {
            logoUrl: logo?.url,
            primaryBannerUrl: primaryBanner?.url,
            secondaryBannerUrl: secondaryBanner?.url,
        };
    }
    async uploadLocal(files: UploadedOnboardingFiles) {
        const logoUrl = files.logo?.[0] ? `/uploads/onboarding/${files.logo[0].filename}` : undefined;
        const primaryBannerUrl = files.primaryBanner?.[0] ? `/uploads/onboarding/${files.primaryBanner[0].filename}` : undefined;
        const secondaryBannerUrl = files.secondaryBanner?.[0] ? `/uploads/onboarding/${files.secondaryBanner[0].filename}` : undefined;
        return {
            logoUrl,
            primaryBannerUrl,
            secondaryBannerUrl,
        }
    }
}