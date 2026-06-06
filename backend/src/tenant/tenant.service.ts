import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from '../auth/services/roles.service'
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class TenantService {
    constructor(private prismaService: PrismaService, private rolesService: RolesService) { }

    async createTenant(params: {
        organisation_name: string;
        slug: string;
        email: string;
        password_hash?: string;
        firstName?: string;
        lastName?: string;
        packagePlanId: number;
        isOAuth?: boolean;
    }) {
        return await this.prismaService.$transaction(async (tx) => {
            //Create Tenant
            const name = params.organisation_name;
            const tenant = await tx.tenant.create({
                data: {
                    organisation_name: name,
                    slug: name
                }
            });
            //Seed roles
            await this.rolesService.seedDefaultRoles(String(tenant.id));
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
                    password_hash: params.isOAuth ? null : params.password_hash,
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
    }
}