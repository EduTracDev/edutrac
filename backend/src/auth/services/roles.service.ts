import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class RolesService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async seedDefaultRoles(tenantId: string) {
    const defaultRoles = ["ADMIN", "TEACHER", "STUDENT", "PARENT"];
    const createdRoles = await this.prismaService.role.createMany({
      data: defaultRoles.map(roleName => ({
        name: roleName,
        description: roleName,
        tenantId: Number(tenantId),
      })),
    });
  }
}