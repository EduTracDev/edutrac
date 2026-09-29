"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import client from "@/utils/client";
import { authServices, LoginRequest, LoginResponse } from "@/services/auth.service";
import { useAppDispatch } from "@/redux/store/hooks";
import { setCredentials, User } from "@/redux/store/slices/authSlice";
import { setToken, setSchoolCookie } from "@/utils/helper";
import { AuthRoutes } from "@/routes/auth.routes";
import { SchoolAdminRoutes } from "@/routes/schoolAdmin.routes";
import { TeacherRoutes } from "@/routes/teacher.routes";
import { ParentRoutes } from "@/routes/parent.routes";
import { StudentRoutes } from "@/routes/student.routes";
import { SuperAdminRoutes } from "@/routes/superAdmin.routes";

const DASHBOARD_BY_ROLE: Record<string, string> = {
  superadmin: SuperAdminRoutes.dashboard,
  schooladmin: SchoolAdminRoutes.dashboard,
  admin: SchoolAdminRoutes.dashboard,
  owner: SchoolAdminRoutes.dashboard,
  teacher: TeacherRoutes.dashboard,
  parent: ParentRoutes.dashboard,
  student: StudentRoutes.dashboard,
};

function normalizeRole(role?: string | null): string {
  return (role || "").toLowerCase().replace(/[\s_-]+/g, "");
}

/** Resolve a dashboard path from a role string, e.g. "school_admin", "School Admin", "teacher". */
export function dashboardPathForRole(role?: string | null, fallbackRole?: string | null): string {
  return (
    DASHBOARD_BY_ROLE[normalizeRole(role)] ||
    DASHBOARD_BY_ROLE[normalizeRole(fallbackRole)] ||
    AuthRoutes.selectRole
  );
}

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Shared login flow used by both the generic auth login page and the
 * per-school ([slug]) portal login page.
 *
 * Persists the access token to the cookie the API client's Authorization
 * interceptor actually reads (`setToken`), fetches the user profile when the
 * login response doesn't already include one, and hydrates Redux so
 * `selectIsAuthenticated`/`selectCurrentUser` are correct immediately after
 * login instead of only after a page reload.
 */
export function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(
    credentials: LoginCredentials,
    domain: string,
    fallbackRole?: string
  ): Promise<boolean> {
    setError(null);
    setIsSubmitting(true);

    try {
      const requestPath = `${authServices.login.path}?domain=${encodeURIComponent(domain)}`;

      const response = await client.request<LoginRequest, LoginResponse>({
        path: requestPath,
        method: authServices.login.method,
        data: credentials,
      });

      const accessToken = response?.accessToken || response?.access_token;
      if (!accessToken) {
        setError(response?.message || "Invalid email or password.");
        return false;
      }

      // Must happen before the profile fetch below: the API client reads the
      // access token from this cookie for the Authorization header.
      setToken(accessToken);

      let user = response?.data?.user || response?.user;
      if (!user) {
        const profileResponse = await client.request<undefined, { data?: User; user?: User }>({
          path: authServices.userProfile.path,
          method: authServices.userProfile.method,
        });
        user =
          profileResponse?.data ||
          profileResponse?.user ||
          (profileResponse as unknown as User);
      }

      dispatch(
        setCredentials({
          user,
          accessToken,
          refreshToken: response?.refreshToken || "",
        })
      );

      // Assumes the login response may include tenant info as `school: { id, subDomain }`.
      // Verify this against the actual backend contract and adjust the field names if needed.
      const school = response?.school;
      if (school?.id != null && school?.subDomain) {
        setSchoolCookie({ id: school.id, subDomain: school.subDomain });
      }

      router.push(dashboardPathForRole(user?.role, fallbackRole));
      return true;
    } catch (err) {
      const apiError = err as { response?: { data?: { message?: string } }; message?: string };
      const message =
        apiError?.response?.data?.message ||
        apiError?.message ||
        "An error occurred during sign in. Please try again.";
      setError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { login, isSubmitting, error, setError };
}
