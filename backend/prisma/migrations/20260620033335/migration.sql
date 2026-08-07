/*
  Warnings:

  - You are about to drop the column `organisation_name` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `tenantDomain` on the `tenants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `SuperAdminUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `schooladmins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `publicId` was added to the `Attendance` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `Invitation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `SuperAdminUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `parents` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `permissions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `roles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `schooladmins` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `students` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `subscriptions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `teachers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `school_name` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - The required column `publicId` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "tenants_tenantDomain_key";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SuperAdminUser" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "parents" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schooladmins" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "organisation_name",
DROP COLUMN "tenantDomain",
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "school_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "publicId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_publicId_key" ON "Attendance"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_publicId_key" ON "Invitation"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdminUser_publicId_key" ON "SuperAdminUser"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "parents_publicId_key" ON "parents"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_publicId_key" ON "permissions"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_publicId_key" ON "roles"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "schooladmins_publicId_key" ON "schooladmins"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "students_publicId_key" ON "students"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_publicId_key" ON "subscriptions"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_publicId_key" ON "teachers"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_domain_key" ON "tenants"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "users_publicId_key" ON "users"("publicId");
