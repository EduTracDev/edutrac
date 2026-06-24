import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaNeon } from '@prisma/adapter-neon';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const db_type = process.env.DB_TYPE;
    if (!db_type) throw new Error('DB_TYPE environment variable is not configured');
    if(db_type !== 'neonpsql' && db_type !== 'postgresql') throw new Error('DB_TYPE environment variable is misconfigured');
    
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) throw new Error('DATABASE_URL is not configured');

    let adapter;
    if (db_type === 'neonpsql') {
      const connectionString = databaseUrl;
      adapter = new PrismaNeon({ connectionString });
    }
    if (db_type === 'postgresql') {
      const pool = new Pool({
        connectionString: process.env['LOCAL_DATABASE_URL'],
      });
      adapter = new PrismaPg(pool);
    }
    
    super({
      adapter,
    });
  }

  //To whomever may service this code in my absence, do not use this unless you fully understand the impact. Never use this in production database facing service
  cleanDb() {
    if (process.env.NODE_ENV === 'production') return 'This action cannot be carried out in production'
    return this.$transaction([
      this.userRole.deleteMany(),
      //this.rolePermission.deleteMany(),
      this.invitation.deleteMany(),
      this.verificationToken.deleteMany(),
      this.teacher.deleteMany(),
      this.parent.deleteMany(),
      this.student.deleteMany(),
      this.schoolAdmin.deleteMany(),
      this.user.deleteMany(),
      this.role.deleteMany(),
      this.subscription.deleteMany(),
      this.tenant.deleteMany(),
    ]);
  }
}