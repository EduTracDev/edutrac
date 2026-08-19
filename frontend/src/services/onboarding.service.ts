import { ApiMethods } from "@/utils/client";

const onboardingRoot = "/api/v1/onboarding";

export interface OnboardingSubmitRequest {
  account?: {
    domain?: string;
    contactPhone?: string;
    contactAddress?: string;
  };
  website?: {
    themeColor?: string;
    bannerTitle?: string;
    bannerDescription?: string;
    footerTitle?: string;
    history?: string;
    vision?: string;
    mission?: string;
  };
  logo?: File;
  primaryBanner?: File;
  secondaryBanner?: File;
  gallery?: File[];
}

export interface OnboardingSubmitResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    publicId: string;
    school_name: string;
    contactPhone: string | null;
    contactAddress: string | null;
    contactEmail: string;
    isActive: boolean;
    status: string;
    onboardingStep: number;
    onboardingCompleted: boolean;
    website: {
      id: number;
      tenantId: number;
      themeColor: string | null;
      logoUrl: string | null;
      primaryBannerUrl: string | null;
      secondaryBannerUrl: string | null;
      bannerTitle: string | null;
      bannerDescription: string | null;
      footerTitle: string | null;
      history: string | null;
      vision: string | null;
      mission: string | null;
      gallery: Array<{
        id: number;
        websiteId: number;
        imageUrl: string;
        publicId: string;
      }>;
    };
  } | null;
  error: unknown | null;
}

export const onboardingServices = {
  submitOnboarding: { path: onboardingRoot, method: ApiMethods.POST },
};