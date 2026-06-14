import { PrismaClient } from '../src/generated/prisma/client';
import {PrismaBetterSqlite3} from '@prisma/adapter-better-sqlite3';

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: "file:./dev.db",
  }),
});

async function main() {
  await prisma.packagePlan.createMany({
    data: [
      {
        name: 'Free',
        features: JSON.stringify([
          'Student Management',
          'Teacher Management',
          'Attendance Tracking',
        ]),
        actual_price: 0,
        discount: 0,
        maxUsers: 100,
        maxRoles: 4,
        maxStorageMb: 1000,
        allowsAdvancedAnalytics: false,
      },
      {
        name: 'Standard',
        features: JSON.stringify([
          'Student Management',
          'Teacher Management',
          'Attendance Tracking',
          'Exam Management',
          'Report Cards',
        ]),
        actual_price: 99.99,
        discount: 10,
        maxUsers: 1000,
        maxRoles: 10,
        maxStorageMb: 5000,
        allowsAdvancedAnalytics: false,
      },
      {
        name: 'Premium',
        features: JSON.stringify([
          'Student Management',
          'Teacher Management',
          'Attendance Tracking',
          'Exam Management',
          'Report Cards',
          'Parent Portal',
          'Finance Management',
          'Advanced Analytics',
        ]),
        actual_price: 299.99,
        discount: 15,
        maxUsers: 10000,
        maxRoles: 50,
        maxStorageMb: 50000,
        allowsAdvancedAnalytics: true,
      },
    ],
  });
  //await prisma.
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