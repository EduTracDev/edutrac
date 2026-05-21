"use client";

import { LandingPagePreview } from "@/modules/onboarding/components/LandingPagePreview";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/modules/context/onbooardingContext";
import { OnboardingRoutes } from "@/routes/onboardingRoutes";

export default function PreviewPage() {
  const { schoolData } = useOnboarding();
  const router = useRouter();

  if (!schoolData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <button
          onClick={() => router.push(OnboardingRoutes.schoolInfo)}
          className="font-black text-[#923CF9] uppercase tracking-widest"
        >
          ← Return to Setup
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <LandingPagePreview
        data={schoolData}
        onFinalize={() => router.push(`/${schoolData.slug}`)}
      />
    </div>
  );
}
