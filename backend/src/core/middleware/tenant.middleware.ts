import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const {domain} = req.query;
    if (!domain) throw new BadRequestException('Invalid request. Required: subdomain');
    const tenant = await this.prisma.tenant.findFirst({
      where: {
        domain: String(domain),
      },
    });
    if (!tenant) throw new BadRequestException('Invalid request. Confirm that this school exists');
    if (!tenant.isActive) throw new BadRequestException('Invalid request. Confirm that this school is active');
    req['tenant'] = tenant;
    console.log("tenant log in middleware:", tenant);
    // const allowedSuffix = this.config.get('TENANT_DOMAIN_SUFFIX');
    // const IS_DEV_ENV = this.config.get('NODE_ENV') === "development";
    // if (IS_DEV_ENV && !req.headers['x-tenant']) throw new BadRequestException('Invalid request. Required: subdomain');
    // const host = IS_DEV_ENV ? `${req.headers['x-tenant']}${allowedSuffix}` as string : req.hostname;
    // if (!host) throw new BadRequestException('Invalid request');
    // if(!host.endsWith(allowedSuffix)) throw new BadRequestException('Invalid request');
    // const tenantDomain = host.slice(0, -allowedSuffix.length);
    // if (!tenantDomain || tenantDomain.includes('.')) throw new BadRequestException('invalid tenant hostname');
    // if (!tenant) throw new BadRequestException('Invalid request. Confirm that this school exists');
    // req['tenant'] = tenant;
    next();
  }
}