import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import {Permissions, PackagePlans} from '../src/core/rbac/constants';
import * as dotenv from 'dotenv'
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';



dotenv.config();
let adapter;
if(process.env.DB_TYPE === 'neonpsql') {
  adapter = new PrismaNeon({connectionString: `${process.env.DATABASE_URL}`});
}
if(process.env.DB_TYPE === 'postgresql'){
  const pool = new Pool({
    connectionString: process.env['LOCAL_DATABASE_URL'],
  });
  adapter = new PrismaPg(pool);
}
const prisma = new PrismaClient({
  adapter
})

async function main() {
  await prisma.packagePlan.createMany({
    data: PackagePlans.map((plan) => ({
      ...plan,
      features: JSON.parse(plan.features),
    })),
  });
// await prisma.packagePlan.deleteMany();
// await prisma.permission.deleteMany();

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