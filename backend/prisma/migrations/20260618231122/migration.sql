/*
  Warnings:

  - You are about to drop the column `slug` on the `tenants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenantDomain]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenantDomain` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tenants_slug_key";

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "slug",
ADD COLUMN     "tenantDomain" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_tenantDomain_key" ON "tenants"("tenantDomain");
