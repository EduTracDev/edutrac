import { Injectable } from '@nestjs/common';
import { InvitationType } from 'src/generated/prisma/enums';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class ProfileFactory {
  async create(
    tx: Prisma.TransactionClient,
    type: InvitationType,
    userId: number,
    tenantId: number,
    school_name: string
  ) {
    const creator = this.creators[type];
    if (!(type in this.creators))
      throw new Error(`Unsupported invitation type: ${type}`);

    return creator(tx, userId, tenantId, school_name);
  }

  private readonly creators = {
    TEACHER: (tx: Prisma.TransactionClient, userId: number, tenantId: number, school_name: string) =>
      tx.teacher.create({
        data: {
          userId,
          tenantId,
          employeeId: `${school_name.toLowerCase().slice(0, 3)}-tch-${userId.toString()}`,
        },
      }),

    PARENT: (tx: Prisma.TransactionClient, userId: number, tenantId: number) =>
      tx.parent.create({
        data: {
          userId,
          tenantId,
        },
      }),

    STUDENT: (tx: Prisma.TransactionClient, userId: number, tenantId: number, school_name: string) =>
      tx.student.create({
        data: {
          userId,
          tenantId,
          studentId: `${school_name.toLowerCase().slice(0, 3)}-sd-${userId.toString()}`,
        },
      }),

    ADMIN: (tx: Prisma.TransactionClient, userId: number, tenantId: number, school_name: string) =>
      tx.schoolAdmin.create({
        data: {
          userId,
          tenantId,
          employeeId: `${school_name.toLowerCase().slice(0, 3)}-adm-${userId.toString()}`,
        },
      }),
  };
}