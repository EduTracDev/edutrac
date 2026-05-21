"use client";
import { createContext, useContext, useState, ReactNode } from "react";

import { School } from "@/modules/types/dashboard";

interface OnboardingContextType {
  schoolData: School | null;
  updateSchoolData: (data: Partial<School>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [schoolData, setSchoolData] = useState<School | null>(null);

  const updateSchoolData = (data: Partial<School>) => {
    setSchoolData((prev) => (prev ? { ...prev, ...data } : (data as School)));
  };

  return (
    <OnboardingContext.Provider value={{ schoolData, updateSchoolData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context)
    throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
};
