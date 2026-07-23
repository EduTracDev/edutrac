import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadedCompleteOnboardingFiles, UploadedOnboardingUrls } from 'src/core/types/onboarding.types';
import { promises as fsPromises } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadsService {
    constructor(private readonly cloudinaryService: CloudinaryService, private readonly prismaService: PrismaService) {}

    async processCompleteOnboardingUploads(tenantId: number, userId: number, files: UploadedCompleteOnboardingFiles): Promise<UploadedOnboardingUrls> {
        const tenant = await this.prismaService.tenant.findUnique({
            where: {
                id: tenantId,
            }
        });
        if (!tenant) throw new BadRequestException('School not found');
        if (tenant.onboardingCompleted) throw new BadRequestException('Onboarding already completed');
        const tenantPublicId = tenant.publicId;
        const tenantFolder = `edutrac/tenants/${tenantPublicId}/`;
        if (process.env.NODE_ENV === 'production') return this.uploadCompleteToCloudinary(files, tenantFolder);

        return this.uploadCompleteLocally(files);
    }

    private async uploadCompleteToCloudinary(files: UploadedCompleteOnboardingFiles, tenantFolder: string): Promise<UploadedOnboardingUrls> {
        if (!files.logo || !files.primaryBanner || !files.secondaryBanner) throw new BadRequestException('Logo, Primary banner, Secondary banner are required');
        const logo = await this.cloudinaryService.uploadImage(files.logo[0], `${tenantFolder}/logo`);
        const primaryBanner = await this.cloudinaryService.uploadImage(files.primaryBanner[0], `${tenantFolder}/banners`);
        const secondaryBanner = await this.cloudinaryService.uploadImage(files.secondaryBanner[0], `${tenantFolder}/banners`);
        
        if (!files.galleryImages || files.galleryImages.length === 0) throw new BadRequestException('Atleast 3 Gallery images are required');
        if (files.galleryImages.length < 3) throw new BadRequestException('Atleast 3 Gallery images are required');
        if (files.galleryImages.length > 4) throw new BadRequestException('Atmost 4 Gallery images are allowed');
        
        const galleryImages = await Promise.all(files.galleryImages.map((file) => this.cloudinaryService.uploadImage(file, `${tenantFolder}/gallery`)));

        return {
            logoUrl: logo?.url,
            primaryBannerUrl: primaryBanner?.url,
            secondaryBannerUrl: secondaryBanner?.url,
            galleryImages,
        };
    }

    private async uploadCompleteLocally(files: UploadedCompleteOnboardingFiles): Promise<UploadedOnboardingUrls> {
        try {
            if (!files.logo || !files.primaryBanner || !files.secondaryBanner) throw new BadRequestException('Logo, Primary banner, Secondary banner are required');

            const galleryImagesFilesCount = files.galleryImages?.length ?? 0;
            if (galleryImagesFilesCount === 0) throw new BadRequestException('Atleast 3 Gallery images are required');    
            if (galleryImagesFilesCount < 3) throw new BadRequestException('Atleast 3 Gallery images are required');
            if (galleryImagesFilesCount > 4) throw new BadRequestException('Atmost 4 Gallery images are allowed');

            return {
                logoUrl: `/uploads/onboarding/${files.logo[0].filename}`,
                primaryBannerUrl: `/uploads/onboarding/${files.primaryBanner[0].filename}`,
                secondaryBannerUrl: `/uploads/onboarding/${files.secondaryBanner[0].filename}`,
                galleryImages: files.galleryImages?.map((file) => ({
                    url: `/uploads/onboarding/${file.filename}`,
                    publicId: file.filename + randomUUID()
                })) ?? [],
            };
        } catch(err){
            await this.cleanupLocalUploads(files);
            throw err;   
        }
    }

    private async cleanupLocalUploads(files: UploadedCompleteOnboardingFiles) {
    const uploadedFiles = [
        ...(files.logo ?? []),
        ...(files.primaryBanner ?? []),
        ...(files.secondaryBanner ?? []),
        ...(files.galleryImages ?? []),
    ];

    await Promise.allSettled(
        uploadedFiles.map(file => fsPromises.unlink(file.path)),
    );
    }
}