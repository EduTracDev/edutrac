"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { AuthRoutes } from "@/routes/auth.routes";
import { useSearchParams, useRouter } from "next/navigation";
import client from "@/utils/client";
import {
  authServices,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  VerifyAccountRequest,
  VerifyAccountResponse,
} from "@/services/auth.service";

interface VerifyEmailData {
  email: string;
}

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";
  const defaultEmail = searchParams.get("email") || "";
  const token = searchParams.get("token");

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isVerifyingToken, setIsVerifyingToken] = useState<boolean>(!!token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailData>({
    defaultValues: {
      email: defaultEmail,
    },
  });

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      setIsVerifyingToken(true);
      setApiError(null);

      try {
        const response = await client.request<
          VerifyAccountRequest,
          VerifyAccountResponse
        >({
          path: authServices.verifyAccount.path,
          method: authServices.verifyAccount.method,
          data: {
            email: defaultEmail,
            token: token,
          },
        });

        if (response?.success) {
          if (response?.data?.access_token) {
            localStorage.setItem("accessToken", response.data.access_token);
          }

          setSuccessMessage(
            response?.message || "Email verification successful! Redirecting..."
          );
          setTimeout(() => {
            router.push(`${AuthRoutes.login}?role=${role}&school=${encodeURIComponent(school)}`);
          }, 2000);
        } else {
          setApiError(response?.message || "Email verification failed.");
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to verify account token. The link may have expired.";
        setApiError(errorMessage);
      } finally {
        setIsVerifyingToken(false);
      }
    };

    verifyToken();
  }, [token, defaultEmail, router, role, school]);

  const onSubmit = async (data: VerifyEmailData) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await client.request<
        ResendVerificationEmailRequest,
        ResendVerificationEmailResponse
      >({
        path: authServices.resendEmailVerification.path,
        method: authServices.resendEmailVerification.method,
        data: { email: data.email },
      });

      setSuccessMessage(
        response?.message || "Verification link sent successfully to your email."
      );
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while sending the verification email.";
      setApiError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans bg-white">
      <div className="hidden lg:col-span-5 bg-[#A361FF] lg:flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute w-[440px] h-[440px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-[320px] h-[320px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-[200px] h-[200px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white/30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
                <circle cx="12" cy="16" r="1.5" fill="currentColor" className="text-white/30" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-between min-h-screen px-6 py-8 sm:px-16 md:px-24 xl:px-32">

        <div className="w-full flex justify-end">
          <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="object-contain" />
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-10">

          <Link
            href={AuthRoutes.login + `?role=${role}&school=${school}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-4 transition-colors"
          >
            <ChevronLeft size={14} />
            Back to login
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
              Verify your email
            </h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Click the button below to send a verification code to your email
            </p>
          </div>

          {apiError && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
              {apiError}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3.5 bg-green-50 border border-green-200 text-green-600 rounded-xl text-xs font-medium">
              {successMessage}
            </div>
          )}

          {isVerifyingToken ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-gray-600">
                Verifying your account activation token...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative group">
                <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-semibold text-gray-500 transition-colors group-focus-within:text-[#923CF9]">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3.5 border rounded-xl text-sm text-[#1E1E2F] font-medium bg-white focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-gray-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-500 mt-1.5 pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Verification link"}
              </button>
            </form>
          )}
        </div>
        <div className="h-4" />
      </div>

    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}