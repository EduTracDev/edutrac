import type { User } from "@/redux/store/slices/authSlice";
import { ApiMethods } from "@/utils/client";

const authRoot = "/api/v1/auth";

export interface LoginRequest {
  email?: string;
  password: string;
}

export interface LoginResponse {
  data?: { user: User };
  status?: string;
  message?: string;
  user?: User;
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  school_name: string;
  packagePlanId: number;
}

export interface RegisterResponse {
  success: boolean;
  status: string;
  message: string;
  data: unknown | null;
  error: unknown | null;
}

export interface ResendVerificationEmailRequest {
  email: string;
}

export interface ResendVerificationEmailResponse {
  status?: string;
  message: string;
  success?: boolean;
}

export interface VerifyAccountRequest {
  email: string;
  token: string;
}

export interface VerifyAccountResponse {
  message: string;
  success?: boolean;
  data?: {
    access_token?: string;
  } | null;
  error?: unknown | null;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  status: string;
  message: string;
  accessToken: string;
  refreshToken: string;
  user?: User;
}

export interface InitResetPasswordRequest {
  email: string;
}

export interface VerifyResetTokenRequest {
  email: string;
  token: string;
}

export interface FinalizeResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

const authEndpoints = {
  login: { path: `${authRoot}/signin`, method: ApiMethods.POST },
  register: { path: `${authRoot}/register`, method: ApiMethods.POST },
  refreshToken: { path: `${authRoot}/refresh`, method: ApiMethods.POST },
  resendEmailVerification: {
    path: `${authRoot}/resend-verification`,
    method: ApiMethods.POST,
  },
  verifyAccount: { path: `${authRoot}/verify-account`, method: ApiMethods.POST },
  initResetPassword: {
    path: `${authRoot}/forgot-password`,
    method: ApiMethods.POST,
  },
  verifyResetToken: {
    path: `${authRoot}/verify-reset-token`,
    method: ApiMethods.POST,
  },
  finalizeResetPassword: {
    path: `${authRoot}/reset-password`,
    method: ApiMethods.POST,
  },
  userProfile: { path: `${authRoot}/profile`, method: ApiMethods.GET },
  logout: { path: `${authRoot}/logout`, method: ApiMethods.POST },
};

type ServiceEntry = { path: string; method: ApiMethods };

function generateServices<T extends Record<string, ServiceEntry>>(
  endpoints: T
): T {
  return endpoints;
}

export const authServices = generateServices(authEndpoints);
