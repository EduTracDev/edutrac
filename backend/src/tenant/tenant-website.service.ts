import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { UploadedOnboardingUrls } from 'src/core/types/onboarding.types';
import { CompleteOnboardingDto } from 'src/onboarding/dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';



export interface GalleryUpload {
    url: string;
    publicId: string;
    caption?: string;
}

@Injectable()
export class TenantWebsiteService {
    constructor(
        private prismaService: PrismaService,
        private cloudinaryService: CloudinaryService
    ) { }


    async updateBasicInfo(
        tx: Prisma.TransactionClient,
        tenantId: number,
        userId: number,
        dto: CompleteOnboardingDto['account'],
    ) {
        const tenant = await tx.tenant.findUnique({
            where: { id: tenantId },
            select: {
                id: true,
                createdById: true,
            },
        });

        if (!tenant) {
            throw new BadRequestException('Tenant not found');
        }

        if (tenant.createdById !== userId) {
            throw new ForbiddenException();
        }

        const existingDomain = await tx.tenant.findFirst({
            where: {
                domain: dto.domain,
                NOT: {
                    id: tenantId,
                },
            },
        });

        if (existingDomain) {
            throw new ConflictException('Domain already exists');
        }

        await tx.tenant.update({
            where: {
                id: tenantId,
            },
            data: {
                domain: dto.domain,
                contactPhone: dto.contactPhone,
                contactAddress: dto.contactAddress,
                contactEmail: dto.contactEmail,
            },
        });
    }

    async updateWebsite(
        tx: Prisma.TransactionClient,
        tenantId: number,
        dto: CompleteOnboardingDto['website'],
        uploads: UploadedOnboardingUrls,
    ) {
        await tx.tenantWebsite.upsert({
            where: {
                tenantId,
            },
            create: {
                tenantId,
                themeColor: dto.themeColor,
                bannerTitle: dto.bannerTitle,
                bannerDescription: dto.bannerDescription,
                footerTitle: dto.footerTitle,
                history: dto.history,
                vision: dto.vision,
                mission: dto.mission,
                logoUrl: uploads.logoUrl,
                primaryBannerUrl: uploads.primaryBannerUrl,
                secondaryBannerUrl: uploads.secondaryBannerUrl,
            },
            update: {
                themeColor: dto.themeColor,
                bannerTitle: dto.bannerTitle,
                bannerDescription: dto.bannerDescription,
                footerTitle: dto.footerTitle,
                history: dto.history,
                vision: dto.vision,
                mission: dto.mission,
                logoUrl: uploads.logoUrl,
                primaryBannerUrl: uploads.primaryBannerUrl,
                secondaryBannerUrl: uploads.secondaryBannerUrl,
            },
        });
    }

    async replaceGallery(
        tx: Prisma.TransactionClient,
        tenantId: number,
        gallery: CompleteOnboardingDto['gallery'],
        uploads: GalleryUpload[],
    ) {
        const website = await tx.tenantWebsite.findUnique({
            where: {
                tenantId,
            },
        });

        if (!website) throw new BadRequestException('Website not found');

        if (!uploads.length) return;
        if (uploads.length < 3) throw new BadRequestException('At least 3 gallery images are required.');
        if (uploads.length > 4) throw new BadRequestException('Maximum of 4 gallery images allowed.');

        await tx.tenantWebsiteGallery.deleteMany({
            where: {
                websiteId: website.id,
            },
        });
        
        await tx.tenantWebsiteGallery.createMany({
            data: uploads.map((image, index) => ({
                websiteId: website.id,
                imageUrl: image.url,
                publicId: image.publicId,
                caption: gallery[index]?.caption ?? '',
                displayOrder: index,
            })),
        });
    }

    async markOnboardingComplete(
        tx: Prisma.TransactionClient,
        tenantId: number,
        userId: number,
    ) {
        return tx.tenant.update({
            where: {
                id: tenantId,
            },
            data: {
                onboardingCompleted: true,
                onboardingStep: 3,
                status: 'ACTIVE',
                isActive: true,
            },
            include: {
                website: {
                    include: {
                        gallery: true,
                    },
                },
            },
        });
    }


    // async deleteGalleryImage(
    //     tenantId: number,
    //     userId: number,
    //     imageId: number
    //     ) {
    //     const tenant = await this.prismaService.tenant.findUnique({
    //         where: { id: tenantId },
    //         include: {
    //             website: true
    //         }
    //     });
    //     if (!tenant) throw new BadRequestException("This school does not exist");
    //     if (userId !== tenant.createdById) throw new ForbiddenException("unable to carry out this action");
    //     if (!tenant.website) throw new BadRequestException("This action can not e completed because the resource does not exist");
    //     const image = await this.prismaService.tenantWebsiteGallery.findFirst({
    //         where: {
    //             id: imageId,
    //             websiteId: tenant.website.id,
    //             website: {
    //                 tenantId
    //             }
    //         },
    //         select: {
    //             id: true,
    //             publicId: true
    //         }
    //     });
    //     if (!image) throw new BadRequestException("This image does not exist");

    //     await this.prismaService.tenantWebsiteGallery.delete({
    //         where: {
    //             id: imageId
    //         }
    //     });
    //     //delete the image from cloudinary after deletion from db. I would implement this later
    //     await this.cloudinaryService.deleteImage(image.publicId);
    //     return {
    //         success: true,
    //         message: 'Gallery image deleted.',
    //         data: null,
    //         error: null
    //     };
    // }


    // async reorderGallery(dto, tenantId, userId) {
    //     await this.prismaService.$transaction(async(tx) => {
    //         const tenant = await tx.tenant.findUnique({
    //             where: { id: tenantId },
    //             select: { createdById: true },
    //         });
    //         if (!tenant || tenant.createdById !== userId) throw new ForbiddenException();

    //         const images = await tx.tenantWebsiteGallery.findMany({
    //             where: {
    //                 id: { in: dto.imageIds },
    //                 website: {
    //                     tenantId,
    //                 },
    //             },
    //         });
    //         const uniqueIds = new Set(dto.imageIds);
    //         if (uniqueIds.size !== dto.imageIds.length) throw new ForbiddenException();

    //         await Promise.all(
    //             dto.imageIds.map((id, index) =>
    //                 tx.tenantWebsiteGallery.update({
    //                     where: { id },
    //                     data: { displayOrder: index },
    //                 }),
    //             ),
    //         );

    //         return {
    //             success: true,
    //             message: 'Gallery images reordered.',
    //             data: null,
    //             error: null
    //         };            
    //     })
    // }
    //getWebsite(){}
}