"use client";

import { useEffect, useState } from "react";
import {
  getSchoolProfile,
  subscribeToSchoolProfile,
  SchoolBrandProfile,
} from "./schoolProfileStore";

export function useSchoolProfile(slug: string): SchoolBrandProfile | null {
  const [profile, setProfile] = useState<SchoolBrandProfile | null>(null);

  useEffect(() => {
    setProfile(getSchoolProfile(slug));
    return subscribeToSchoolProfile(slug, () => {
      setProfile(getSchoolProfile(slug));
    });
  }, [slug]);

  return profile;
}