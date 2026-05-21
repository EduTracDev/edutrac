"use client";

import { PlanSelection } from "@/modules/onboarding/components/PlanSelection";
import { useRouter } from "next/navigation";

export default function PlanSelectionPage() {
  const router = useRouter();

  const handleSelect = (planId: string) => {
    //  Save selected plan to global state/localStorage
    console.log("Selected plan:", planId);
    router.push("/onboarding/school-info");
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="text-center max-w-2xl mx-auto mb-16 px-6">
        <h1 className="text-4xl font-black text-slate-800 mb-4">
          Choose your power.
        </h1>
        <p className="text-slate-400 font-medium leading-relaxed">
          Select the plan that fits your school&apos;s current size. You can
          upgrade or downgrade anytime as you grow.
        </p>
      </div>

      <PlanSelection onSelect={handleSelect} />

      <div className="text-center mt-12">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Step 2 of 4: Plan Configuration
        </p>
      </div>
    </div>
  );
}
