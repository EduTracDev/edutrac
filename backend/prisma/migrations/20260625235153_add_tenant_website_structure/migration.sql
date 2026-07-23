/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `tenants` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "TenantStatus" ADD VALUE 'ONBOARDING';

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "logoUrl",
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingStep" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "tenant_websites" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "themeColor" TEXT,
    "logoUrl" TEXT,
    "primaryBannerUrl" TEXT,
    "secondaryBannerUrl" TEXT,
    "bannerTitle" TEXT,
    "bannerSubtitle" TEXT,
    "bannerDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_websites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_website_gallery" (
    "id" SERIAL NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_website_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_websites_tenantId_key" ON "tenant_websites"("tenantId");

-- AddForeignKey
ALTER TABLE "tenant_websites" ADD CONSTRAINT "tenant_websites_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_website_gallery" ADD CONSTRAINT "tenant_website_gallery_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "tenant_websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
