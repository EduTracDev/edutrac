import { Injectable } from '@nestjs/common';
import { InvitationType } from 'src/generated/prisma/enums';
import { Prisma } from 'src/generated/prisma/client';


@Injectable()
export class ProfileFactory{

    async create(tx: Prisma.TransactionClient, type: InvitationType, userId: number, tenantId: number) {
        const creator = this.creators[type];
        if (!(type in this.creators)) throw new Error(`Unsupported invitation type: ${type}`);

        return creator(tx, userId, tenantId);
    }

    private readonly creators = {
    TEACHER: (tx:Prisma.TransactionClient, userId: number, tenantId: number) =>
        tx.teacher.create({ 
            data: {
                userId,
                tenantId,
                employeeId: userId.toString()
            }
    }),

    PARENT: (tx:Prisma.TransactionClient, userId: number, tenantId: number) =>
        tx.parent.create({ 
            data: {
                userId,
                tenantId,
                contactNumber: userId.toString()
            }
    }),

    STUDENT: (tx:Prisma.TransactionClient, userId: number, tenantId: number) =>
        tx.student.create({ 
            data: {
                userId,
                tenantId,
                studentId: userId.toString()
            }
    }),

    ADMIN: (tx:Prisma.TransactionClient, userId: number, tenantId: number) =>
        tx.schoolAdmin.create({
            data: {
                userId,
                tenantId,
                employeeId: 'emp-adm' + userId.toString()
            }
        }),
    };
}