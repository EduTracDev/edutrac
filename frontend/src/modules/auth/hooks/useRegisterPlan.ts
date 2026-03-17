"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useRegisterPlan = (defaultPlan: string = "basic") => {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [searchParams]);

  return { selectedPlan, setSelectedPlan };
};
