import "dotenv/config";
import { defineConfig } from "prisma/config";

const DB_URL = process.env.NODE_ENV === 'development' ? process.env["LOCAL_DATABASE_URL"] : process.env["DATABASE_URL"];

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts"
  },
  datasource: {
    url:  DB_URL,
  },
});