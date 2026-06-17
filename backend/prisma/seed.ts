import { PrismaClient } from '../src/generated/prisma/client';
import {PrismaBetterSqlite3} from '@prisma/adapter-better-sqlite3';
import {Permissions, PackagePlans} from '../src/core/rbac/constants';

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: "file:./dev.db",
  }),
});

async function main() {
  // await prisma.packagePlan.createMany({
  //   data: PackagePlans.map((plan) => ({
  //     ...plan,
  //     features: JSON.parse(plan.features),
  //   })),
  // });


  // for (const permission of Permissions) {
  //   await prisma.permission.upsert({
  //     where: {
  //       name: permission,
  //     },
  //     update: {},
  //     create: {
  //       name: permission,
  //     },
  //   });
  // }
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