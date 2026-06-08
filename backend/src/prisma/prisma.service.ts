import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';


@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        let adapter;
        if (process.env.DB_TYPE === "postgresql"){
            const pool = new Pool({
                connectionString: process.env["DATABASE_URL"]
            })
            adapter = new PrismaPg(pool)
        } else {
            const rawUrl = 'file:./dev.db';
            const filePath = rawUrl.replace('file:', '');
            const db = new Database(filePath);
            adapter = new PrismaBetterSqlite3({url:rawUrl});
        }
        super({
            adapter
        });
    }

    //To whomever may service this code in my absence, do not use this unless you fully understand the impact. Never use this in production database facing service
    cleanDb(){
        return this.$transaction([
            this.user.deleteMany(),
            this.tenant.deleteMany(),
            this.role.deleteMany(),
        ])
    }
}