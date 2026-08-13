import { Controller, Get } from '@nestjs/common';
import { PackagePlanService } from './package-plan.service';


@Controller('pricing')
export class PackagePlanController {
    constructor(private packagePlanService: PackagePlanService) {}


    @Get()
    async getPackagePlans() {
        const packagePlans = await this.packagePlanService.getPackagePlans();
        return {
            success: "true",
            message: "Success",
            data: packagePlans
        };
    }
}