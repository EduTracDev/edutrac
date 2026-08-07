export interface UploadedCompleteOnboardingFiles {
  logo?: Express.Multer.File[];
  primaryBanner?: Express.Multer.File[];
  secondaryBanner?: Express.Multer.File[];
  galleryImages?: Express.Multer.File[];
}

export interface GalleryUpload {
  url: string;
  publicId: string;
}

export interface UploadedOnboardingUrls {
  logoUrl?: string;
  primaryBannerUrl?: string;
  secondaryBannerUrl?: string;
  galleryImages: GalleryUpload[];
}