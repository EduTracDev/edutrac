"use client";

import { SchoolInfoForm } from "@/modules/onboarding/components/SchoolInfoForm";
import { useRouter } from "next/navigation";
import { School } from "@/modules/types/dashboard";
import { useOnboarding } from "@/modules/context/onbooardingContext";
import { OnboardingRoutes } from "@/routes/onboardingRoutes";

export default function SchoolInfoPage() {
  const router = useRouter();
  const { updateSchoolData } = useOnboarding();

  const handleNext = (data: School) => {
    updateSchoolData(data);
    router.push(OnboardingRoutes.preview);
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">
          Identity & Branding
        </h1>
        <p className="text-slate-400 font-medium leading-relaxed">
          Tell us about your school. This information will be used to generate
          your landing page and official documents.
        </p>
      </div>
      <SchoolInfoForm onNext={handleNext} />
      <div className="text-center mt-12">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Step 3 of 4: School Setup
        </p>
      </div>
    </div>
  );
}
