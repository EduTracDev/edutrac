import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from '../auth/services/roles.service'
import { BadRequestException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TenantService {
    constructor(private prismaService: PrismaService, private rolesService: RolesService) { }

    async createTenant(params: {
        organisation_name: string;
        slug: string;
        email: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        packagePlanId: number;
        isOAuth?: boolean;
    }) {
        try {
            return await this.prismaService.$transaction(async (tx) => {
                //Create Tenant
                const name = params.organisation_name;
                const tenant = await tx.tenant.create({
                    data: {
                        organisation_name: name,
                        slug: params.slug,
                        contactEmail: params.email,
                        status: params.isOAuth ?'ACTIVE' : 'PENDING_EMAIL_VERIFICATION',
                        isActive: params.isOAuth ? true : false
                    }
                });
                //Seed roles
                await this.rolesService.seedDefaultRoles(tx, tenant.id);
                //Create tenant subscription
                const subscription = await tx.subscription.create({
                    data: {
                        tenantId: tenant.id,
                        packagePlanId: params.packagePlanId,
                        status: "ACTIVE",
                    }
                })
                //Create tenant admin
                const user = await tx.user.create({
                    data: {
                        email: params.email,
                        password: params.isOAuth ? null : params.password,
                        status: params.isOAuth ? 'ACTIVE' : 'DISABLED',
                        emailVerified: params.isOAuth ? true : false,
                        emailVerifiedAt: params.isOAuth ? new Date : null,
                        tenantId: tenant.id
                    }
                })
                // 5. Assign role
                const tenantRoles = await tx.role.findMany({
                    where: {
                        tenantId: tenant.id,
                    }
                })
                const adminRole = tenantRoles.find(role => role.name === "ADMIN");
                if (!adminRole) throw new BadRequestException("Admin role not found");
                await tx.userRole.create({
                    data: {
                        userId: user.id,
                        roleId: adminRole.id,
                    },
                });

                return {
                    tenant,
                    user,
                    subscription,
                    adminRole
                }
            });
        } catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Tenant slug already exists');
                }
            }
        }
    }
}