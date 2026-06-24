import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('tenant')
export class TenantController {
    constructor(private prismaService:PrismaService){}

    
    @Get('onboarding')
    async getOnboardingStatus(){

    }

    @Post('onboarding')
    async onboardTenant(){
        //Step 0(account info): school domain(automatic check to see if the domain exists), school address, contact number
        //step 1(home page): theme color, primary banner image(image file), secondary banner image(image file), schoolband logo(image file)
        //step 2(setup options): 
        //step 3: banner title, banner subtitle description
        //step 4: image gallery upload
    }
}
