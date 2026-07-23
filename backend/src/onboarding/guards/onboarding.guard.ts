import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "src/prisma/prisma.service";
import { ALLOW_INCOMPLETE_ONBOARDING_KEY} from '../decorators/skip-onboarding.decorator';

@Injectable()

export class OnboardingGuard implements CanActivate {
    constructor(private prismaService: PrismaService, private reflector: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const skip = this.reflector.getAllAndOverride<boolean>(
            ALLOW_INCOMPLETE_ONBOARDING_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );
        if (skip) return true
        
        const request = context.switchToHttp().getRequest();
        
        const user = request.user;
        if (!user) return true;
        
        const tenant = await this.prismaService.tenant.findUnique({
            where: {
                id: user.tenantId,
            },
            select: {
                onboardingCompleted: true
            }
        })
        if (!tenant) throw new ForbiddenException('Tenant not found');
        if (!tenant.onboardingCompleted) throw new ForbiddenException('Complete tenant onboarding before accessing this resource');
        
        return true;
    }
}