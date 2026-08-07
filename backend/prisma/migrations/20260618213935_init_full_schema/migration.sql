/*
  Warnings:

  - Added the required column `description` to the `package_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "package_plans" ADD COLUMN     "description" TEXT NOT NULL;
