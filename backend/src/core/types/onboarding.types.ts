export interface UploadedOnboardingFiles {
  logo?: Express.Multer.File[];
  primaryBanner?: Express.Multer.File[];
  secondaryBanner?: Express.Multer.File[];
}

export interface UploadUrls {
  logoUrl?: string;
  primaryBannerUrl?: string;
  secondaryBannerUrl?: string;
}