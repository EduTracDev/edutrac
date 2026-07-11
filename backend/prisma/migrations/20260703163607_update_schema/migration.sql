/*
  Warnings:

  - Made the column `publicId` on table `tenant_website_gallery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tenant_website_gallery" ALTER COLUMN "publicId" SET NOT NULL;
