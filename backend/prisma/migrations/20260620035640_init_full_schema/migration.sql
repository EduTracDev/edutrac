-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_createdById_fkey";

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
