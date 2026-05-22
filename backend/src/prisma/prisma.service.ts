import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';


@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        const pool = new Pool({
            connectionString: process.env["DATABASE_URL"]
        })
        const adapter = new PrismaPg(pool)
        super({
            adapter
        });
    }

    //To whomever may service this code in my absence, do not use this unless you fully understand the impact. Never use this in production database facing service
    cleanDb(){
        return this.$transaction([
            this.user.deleteMany(),
            this.tenant.deleteMany()            
        ])
    }
}