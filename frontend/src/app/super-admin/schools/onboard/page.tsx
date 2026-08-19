"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SchoolOnboardingWizard } from "@/modules/super-admin/components/SchoolOnboardingWizard";
import { OnboardingWizardData } from "@/modules/super-admin/types/onboarding.types";

const MOCK_PLANS = [
  { id: "plan_basic", name: "Starter Tier", priceMonthly: 99, maxStudents: 250 },
  { id: "plan_pro", name: "Professional Tier", priceMonthly: 249, maxStudents: 1000 },
  { id: "plan_enterprise", name: "Enterprise Tier", priceMonthly: 599, maxStudents: 5000 },
];

export default function OnboardSchoolPage() {
  const router = useRouter();

  const handleComplete = async (data: OnboardingWizardData) => {
    // Simulate tenant creation and administrative email dispatch
    await new Promise((res) => setTimeout(res, 1200));
    router.push("/super-admin/schools");
  };

  return (
    <div className="py-6 space-y-6">
      <SchoolOnboardingWizard
        plans={MOCK_PLANS}
        onCancel={() => router.push("/super-admin/schools")}
        onComplete={handleComplete}
      />
    </div>
  );
}