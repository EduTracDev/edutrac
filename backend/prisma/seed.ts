import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import {Permissions, PackagePlans} from '../src/core/rbac/constants';
import * as dotenv from 'dotenv'
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';


dotenv.config();
let adapter;
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== 'development' && NODE_ENV !== 'production') throw new Error('Missing or Invalid node environment');
if(NODE_ENV === 'production') {
  adapter = new PrismaNeon({connectionString: `${process.env.DATABASE_URL}`});
}
if(NODE_ENV === 'development'){
  const pool = new Pool({
    connectionString: process.env['LOCAL_DATABASE_URL'],
  });
  adapter = new PrismaPg(pool);
}
const prisma = new PrismaClient({
  adapter
})

async function main() {
  
//await prisma.packagePlan.deleteMany();
//await prisma.permission.deleteMany();
  await prisma.packagePlan.createMany({
    data: PackagePlans.map((plan) => ({
      ...plan,
      features: JSON.parse(plan.features),
    })),
  });

  for (const permission of Permissions) {
    await prisma.permission.upsert({
      where: {
        name: permission,
      },
      update: {},
      create: {
        name: permission,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });