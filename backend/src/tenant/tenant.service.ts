import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from '../auth/services/roles.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TenantService {
  constructor(
    private prismaService: PrismaService,
    private rolesService: RolesService,
  ) {}

  async createTenant(params: {
    school_name: string;
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
        const tenant = await tx.tenant.create({
          data: {
            school_name: params.school_name,
            contactEmail: params.email,
            status: params.isOAuth ? 'ACTIVE' : 'PENDING_EMAIL_VERIFICATION',
            isActive: params.isOAuth ? true : false,
          },
        });
        //Seed roles
        await this.rolesService.seedDefaultRoles(tx, tenant.id);
        //Create tenant subscription
        const subscription = await tx.subscription.create({
          data: {
            tenantId: tenant.id,
            packagePlanId: params.packagePlanId,
            status: 'ACTIVE',
          },
        });
        //Create tenant admin
        const user = await tx.user.create({
          data: {
            email: params.email,
            password: params.isOAuth ? null : params.password,
            status: params.isOAuth ? 'ACTIVE' : 'DISABLED',
            emailVerified: params.isOAuth ? true : false,
            emailVerifiedAt: params.isOAuth ? new Date() : null,
            firstName: params.isOAuth ? params.firstName : null,
            lastName: params.isOAuth ? params.lastName : null,
            tenantId: tenant.id,
          },
        });
        //Update tenant admin
        const updatedTenant = await tx.tenant.update({
          where: {
            id: tenant.id,
          },
          data: {
            createdById: user.id,
          },
        });
        // 5. Assign role
        const tenantRoles = await tx.role.findMany({
          where: {
            tenantId: tenant.id,
          },
        });
        const adminRole = tenantRoles.find((role) => role.name === 'ADMIN');
        if (!adminRole) throw new BadRequestException('Admin role not found');
        await tx.userRole.create({
          data: {
            userId: user.id,
            roleId: adminRole.id,
          },
        });

        return {
          tenant: updatedTenant,
          user,
          subscription,
          adminRole,
        };
      });
    } catch (error) {
      console.error(error?.message ?? error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new ConflictException('This domain is already taken');
          default:
            throw new InternalServerErrorException('Server DB error');
        }
      }
      throw error;
    }
  }
  //suspendTenant activateTenant cancelTenant
}