import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class RolesService {
  async seedDefaultRoles(tx: Prisma.TransactionClient, tenantId: number) {
    const defaultRoles = ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'];
    return tx.role.createMany({
      data: defaultRoles.map((roleName) => ({
        name: roleName,
        description: roleName,
        tenantId,
      })),
    });
  }
}
