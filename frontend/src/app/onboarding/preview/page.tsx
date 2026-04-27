// app/onboarding/preview/page.tsx
"use client";

import { useEffect, useState } from "react";

import { School } from "@/modules/types/dashboard";
import { LandingPagePreview } from "@/modules/onboarding/components/LandingPagePreview";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/modules/context/onbooardingContext";

export default function PreviewPage() {
  const { schoolData } = useOnboarding();
  const router = useRouter();

  if (!schoolData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <button
          onClick={() => router.push("/onboarding/school-info")}
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
