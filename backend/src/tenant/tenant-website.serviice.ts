import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { UploadUrls } from 'src/core/types/onboarding.types';
import { OnboardingUpdateDto } from 'src/onboarding/dto';
import { CreateGalleryImageDto } from './dto/create-gallery-image.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { number } from 'joi';
import { error } from 'console';



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

    async getOnboardingState(tenantId: number, userId: number){
        const tenant = await this.prismaService.tenant.findUnique({
            where: {
                id: tenantId
            },
            include: {
                website: {
                    include: {
                        gallery: {
                            orderBy: {
                                displayOrder: 'asc'
                            }
                        }
                    }
                }
            }
        });
        if (!tenant) throw new BadRequestException('Tenant not found');
        if (tenant.createdById !== userId) throw new ForbiddenException('You are not authorised for this request');
        return {
            success: true,
            message: 'Request successful',
            data: {
                tenant: {
                    schoolName: tenant.school_name,
                    domain: tenant.domain,
                    contactPhone: tenant.contactPhone,
                    contactAddress: tenant.contactAddress,
                    contactEmail: tenant.contactEmail
                },
                website: tenant.website ? {
                    themeColor: tenant.website.themeColor,
                    logoUrl: tenant.website.logoUrl,
                    primaryBanner: tenant.website.primaryBannerUrl,
                    secondaryBanner: tenant.website.secondaryBannerUrl,
                    bannerTitle: tenant.website.bannerTitle,
                    bannerSubtitle: tenant.website.bannerSubtitle,
                    bannerDescription: tenant.website.bannerDescription,
                } : null,
                gallery: tenant.website?.gallery.map((image) => ({
                    id: image.id,
                    imageUrl: image.imageUrl,
                    publicId: image.publicId,
                    caption: image.caption,
                    displayOrder: image.displayOrder,
                })) ?? [],
                currentStep: tenant.onboardingStep,
                completed: tenant.onboardingCompleted,
                tenantStatus: tenant.status,
            },
            error: null,
        }
    }

    async updateDuringOnboarding(tenantId: number, userId: number, dto: OnboardingUpdateDto, { logoUrl, primaryBannerUrl, secondaryBannerUrl }: UploadUrls) {
        return this.prismaService.$transaction(async (tx) => {
            const tenant = await tx.tenant.findUnique({
                where: {
                    id: tenantId,
                },
                select: {
                    id: true,
                    onboardingStep: true,
                    createdById: true,
                }
            });
            if (!tenant) throw new BadRequestException('This school does not exist');
            if (tenant.createdById !== userId) throw new ForbiddenException('You are not authorized to carry out this operation');
            if (dto.step > tenant.onboardingStep) throw new BadRequestException(`Preceeding onboarding steps must be completed first. Complete step ${tenant.onboardingStep} before proceeding`);

            const isEditingCompletedStep = dto.step < tenant.onboardingStep;
            const updateData: Prisma.TenantUpdateInput = {};
            if (dto.step === 0 && dto.accountInfo) {
                if (!isEditingCompletedStep && (!dto.accountInfo.domain || !dto.accountInfo.contactPhone || !dto.accountInfo.contactAddress)) throw new BadRequestException('Missing required fields: domain, contactPhone and contactAddress');

                const { domain, contactPhone, contactAddress } = dto.accountInfo;
                const domainExists = await tx.tenant.findFirst({
                    where: {
                        domain,
                        NOT: { id: tenantId }
                    }
                })
                if (domainExists) throw new ConflictException('Domain already taken');
                updateData.domain = domain;
                updateData.contactPhone = contactPhone;
                updateData.contactAddress = contactAddress;
                updateData.onboardingStep = Math.max(tenant.onboardingStep, 1);
            }

            if (dto.step === 1 && dto.homePage) {
                if (!isEditingCompletedStep && (!logoUrl || !primaryBannerUrl || !secondaryBannerUrl)) throw new BadRequestException('Missing required fields: logoUrl, primaryBannerUrl and secondaryBannerUrl');

                await tx.tenantWebsite.upsert({
                    where: {
                        tenantId,
                    },
                    create: {
                        tenantId,
                        themeColor: dto.homePage.themeColor,
                        logoUrl,
                        primaryBannerUrl,
                        secondaryBannerUrl,
                    },

                    update: {
                        ...(dto.homePage.themeColor && {
                            themeColor: dto.homePage.themeColor,
                        }),

                        ...(logoUrl && {
                            logoUrl,
                        }),

                        ...(primaryBannerUrl && {
                            primaryBannerUrl,
                        }),

                        ...(secondaryBannerUrl && {
                            secondaryBannerUrl,
                        }),
                    },
                });

                updateData.onboardingStep = Math.max(
                    tenant.onboardingStep,
                    dto.step + 1,
                );
            }

            if (dto.step === 2 && dto.banner) {
                if (!isEditingCompletedStep && (!dto.banner.title || !dto.banner.subtitle || !dto.banner.description)) throw new BadRequestException('Missing required fields: title, subtitle and description');

                const { title, subtitle, description } = dto.banner;
                await tx.tenantWebsite.upsert({
                    where: { tenantId },
                    create: {
                        tenantId,
                        bannerTitle: title,
                        bannerSubtitle: subtitle,
                        bannerDescription: description,
                    },
                    update: {
                        tenantId,
                        bannerTitle: title,
                        bannerSubtitle: subtitle,
                        bannerDescription: description,
                    }
                });
                updateData.onboardingStep = Math.max(tenant.onboardingStep, dto.step + 1);
            }
            if (Object.keys(updateData).length > 0) {
                await tx.tenant.update({
                    where: { id: tenantId },
                    data: updateData,
                });
            }
            const onboarding = await tx.tenant.findUnique({
                where: { id: tenantId },
                include: {
                    website: {
                        include: {
                            gallery: true,
                        },
                    },
                },
            });
            return {
                success: true,
                message: 'Onboarding update successful',
                data: onboarding,
                error: null,
                currentStep: updateData.onboardingStep,
                completed: false
            }
        })
    }

    async addGalleryImages(
        tenantId: number,
        userId: number,
        files: GalleryUpload[],
        dto: CreateGalleryImageDto
    ) {
        return this.prismaService.$transaction(async (tx) => {
            const tenant = await tx.tenant.findUnique({
                where: { id: tenantId },
                select: {
                    id: true,
                    createdById: true,
                },
            });
            if (!tenant) throw new BadRequestException('Tenant not found');
            if (tenant.createdById !== userId) throw new ForbiddenException();

            const website = await tx.tenantWebsite.findUnique({
                where: { tenantId },
                include: {
                    gallery: {
                        orderBy: {
                            displayOrder: 'desc',
                        },
                        take: 1,
                    },
                },
            });
            if (!website) throw new BadRequestException('Website configuration has not been created.');
            const galleryCount = await tx.tenantWebsiteGallery.count({
                where: {
                    websiteId: website.id,
                },
            });
            if (galleryCount + files.length > 4) throw new BadRequestException('Maximum of 4 gallery images allowed.');
            
            let nextOrder = website.gallery.length > 0 ? website.gallery[0].displayOrder + 1 : 0;
            const createdImages = await tx.tenantWebsiteGallery.createMany({
                data: files.map((file, index) => ({
                    websiteId: website.id,
                    imageUrl: file.url,
                    publicId: file.publicId,
                    caption: dto.caption?.[index] ?? "",
                    displayOrder: nextOrder + index,
                })),
            });
            const gallery = await tx.tenantWebsiteGallery.findMany({
                where: {
                    websiteId: website.id,
                },
                orderBy: {
                    displayOrder: 'asc',
                },
            });

            return {
                success: true,
                message: 'Gallery image added.',
                data: createdImages,
            };
        });
    }

    async completeOnboarding(tenantId: number, userId: number){
        return this.prismaService.$transaction(async(tx) => {
            const tenant = await tx.tenant.findUnique({
                where: {
                    id: tenantId,
                },
                include: {
                    website: {
                        include: {
                            gallery: true
                        }
                    },
                }
            });
            if (!tenant) throw new BadRequestException("Tenant not found");
            if (tenant.createdById !== userId) throw new ForbiddenException("You are not authorized to complete this request");
            if (!tenant.website) throw new BadRequestException("Website configuration has not been created.");

            this.validateCompletion(tenant);

            const updatedTenant = await tx.tenant.update({
                where: {
                    id: tenantId,
                },
                data: {
                    onboardingCompleted: true,
                    onboardingStep: 3,
                    status: 'ACTIVE',
                    isActive: true
                },
                include: {
                    website: {
                        include: {
                            gallery: true
                        }
                    }
                }
            })

            return {
                success: true,
                mesage: 'Onboarding completed successfully',
                data: updatedTenant,
                error: null,
            }
        })
    }

    validateCompletion(tenant){
        const website = tenant.website;
        const missingFields: string[] = [];
        
        if (!tenant.domain) missingFields.push('domain');
        if (!tenant.contactPhone) missingFields.push('contactPhone');
        if (!tenant.contactAddress) missingFields.push('contactAddress');
        if (!website.themeColor) missingFields.push('themeColor');
        if (!website.primaryBanner) missingFields.push('primaryBanner');
        if (!website.secondaryBanner) missingFields.push('secondaryBanner');
        if (!website.bannerTitle) missingFields.push('bannerTitle');
        if (!website.bannerSubtitle) missingFields.push('bannerSubtitle');
        if (!website.bannerDescription) missingFields.push('bannerDescription');
        if (website.gallery.length < 3) missingFields.push('At lease three gallery images are required.');
        
        if (missingFields.length > 0) throw new BadRequestException({
            success: false,
            message: 'Missing fields. Please complete onboarding before proceeding with completion',
            missingFields
        })
    }

    async deleteGalleryImage(
        tenantId: number,
        userId: number,
        imageId: number
        ) {
        const tenant = await this.prismaService.tenant.findUnique({
            where: { id: tenantId },
            include: {
                website: true
            }
        });
        if (!tenant) throw new BadRequestException("This school does not exist");
        if (userId !== tenant.createdById) throw new ForbiddenException("unable to carry out this action");
        if (!tenant.website) throw new BadRequestException("This action can not e completed because the resource does not exist");
        const image = await this.prismaService.tenantWebsiteGallery.findFirst({
            where: {
                id: imageId,
                websiteId: tenant.website.id,
                website: {
                    tenantId
                }
            },
            select: {
                id: true,
                publicId: true
            }
        });
        if (!image) throw new BadRequestException("This image does not exist");

        await this.prismaService.tenantWebsiteGallery.delete({
            where: {
                id: imageId
            }
        });
        //delete the image from cloudinary after deletion from db. I would implement this later
        await this.cloudinaryService.deleteImage(image.publicId);
        return {
            success: true,
            message: 'Gallery image deleted.',
            data: null,
            error: null
        };
    }


    async reorderGallery(dto, tenantId, userId) {
        await this.prismaService.$transaction(async(tx) => {
            const tenant = await tx.tenant.findUnique({
                where: { id: tenantId },
                select: { createdById: true },
            });
            if (!tenant || tenant.createdById !== userId) throw new ForbiddenException();

            const images = await tx.tenantWebsiteGallery.findMany({
                where: {
                    id: { in: dto.imageIds },
                    website: {
                        tenantId,
                    },
                },
            });
            const uniqueIds = new Set(dto.imageIds);
            if (uniqueIds.size !== dto.imageIds.length) throw new ForbiddenException();

            await Promise.all(
                dto.imageIds.map((id, index) =>
                    tx.tenantWebsiteGallery.update({
                        where: { id },
                        data: { displayOrder: index },
                    }),
                ),
            );

            return {
                success: true,
                message: 'Gallery images reordered.',
                data: null,
                error: null
            };            
        })
    }
    //getWebsite(){}
}