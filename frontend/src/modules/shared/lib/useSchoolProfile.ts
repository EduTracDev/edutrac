"use client";

import { useEffect, useState } from "react";
import {
  getSchoolProfile,
  subscribeToSchoolProfile,
  SchoolBrandProfile,
} from "./schoolProfileStore";

export interface UseSchoolProfileResult {
  profile: SchoolBrandProfile | null;
  /** True until the first lookup (client-only, backed by localStorage) has run. */
  isLoading: boolean;
}

export function useSchoolProfile(slug: string): UseSchoolProfileResult {
  const [profile, setProfile] = useState<SchoolBrandProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setProfile(getSchoolProfile(slug));
    setIsLoading(false);
    return subscribeToSchoolProfile(slug, () => {
      setProfile(getSchoolProfile(slug));
    });
  }, [slug]);

  return { profile, isLoading };
}
