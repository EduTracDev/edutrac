import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PackagePlanService {

    constructor(private prismaService: PrismaService) {}

    async getPackagePlans() {
        return await this.prismaService.packagePlan.findMany();
    }
}