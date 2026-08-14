"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerSchema } from "@/utils/validation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import client from "@/utils/client";
import { authServices, RegisterRequest, RegisterResponse } from "@/services/auth.service";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "school-admin";
  const defaultSchoolName = searchParams.get("school") || "";

  const planIdParam = searchParams.get("packagePlanId");
  const packagePlanId = planIdParam ? parseInt(planIdParam, 10) : 1;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      schoolName: defaultSchoolName,
    },
  });

  const currentSchoolName = useWatch({
    control,
    name: "schoolName",
    defaultValue: defaultSchoolName,
  });

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);

    try {
      const response = await client.request<RegisterRequest, RegisterResponse>({
        path: authServices.register.path,
        method: authServices.register.method,
        data: {
          email: data.email,
          password: data.password,
          passwordConfirm: data.confirmPassword,
          school_name: data.schoolName,
          packagePlanId: packagePlanId,
        },
      });

      if (response?.success) {
        const verifyUrl = `${AuthRoutes.verifyEmail || "/auth/verify-email"}?email=${encodeURIComponent(
          data.email
        )}&role=${role}&school=${encodeURIComponent(data.schoolName)}`;

        router.push(verifyUrl);
      } else {
        setApiError(response?.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred during registration. Please check your browser extensions/ad-blockers.";
      setApiError(errorMessage);
    }
  };

  const handleGoogleAuth = () => {
    if (!currentSchoolName) {
      setApiError("Please enter your Institution name before continuing with Google.");
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://edutrac.onrender.com";
    const googleAuthUrl = `${backendUrl}/api/v1/auth/google/register?school_name=${encodeURIComponent(
      currentSchoolName
    )}&packagePlanId=${packagePlanId}`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans bg-white">

      {/* Left Side: Form Container */}
      <div className="lg:col-span-7 flex flex-col justify-between min-h-screen px-6 py-8 sm:px-16 md:px-24 xl:px-32">

        {/* Top Branding Header */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-[#923CF9]">
            <Image src="/logo.png" alt="Edutrac Logo" width={151} height={34} className="inline-block" />
          </Link>
        </div>

        {/* Form Body Wrapper */}
        <div className="w-full max-w-xl mx-auto my-auto py-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#1E1E2F]">
              Create your account
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Let&apos;s get your profile set up in less than 2minutes
            </p>
          </div>

          {apiError && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Form Fields 2x2 Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">

              {/* Institution Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1E2F]">
                  Institution name
                </label>
                <input
                  {...register("schoolName")}
                  type="text"
                  placeholder="Enter your Institution name"
                  className={`w-full px-4 py-2.5 border rounded-lg text-xs transition-all focus:outline-none placeholder-gray-300 text-gray-700 ${
                    errors.schoolName
                      ? "border-red-400 focus:border-red-500 bg-red-50/10"
                      : "border-gray-200 focus:border-gray-400 bg-white"
                  }`}
                />
                {errors.schoolName && (
                  <p className="text-[11px] font-medium text-red-500 mt-0.5">
                    {errors.schoolName.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1E2F]">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your organization email"
                  className={`w-full px-4 py-2.5 border rounded-lg text-xs transition-all focus:outline-none placeholder-gray-300 text-gray-700 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 bg-red-50/10"
                      : "border-gray-200 focus:border-gray-400 bg-white"
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] font-medium text-red-500 mt-0.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1E2F]">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    className={`w-full pl-4 pr-10 py-2.5 border rounded-lg text-xs transition-all focus:outline-none placeholder-gray-300 text-gray-700 ${
                      errors.password
                        ? "border-red-400 focus:border-red-500 bg-red-50/10"
                        : "border-gray-200 focus:border-gray-400 bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] font-medium text-red-500 mt-0.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1E2F]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    className={`w-full pl-4 pr-10 py-2.5 border rounded-lg text-xs transition-all focus:outline-none placeholder-gray-300 text-gray-700 ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-500 bg-red-50/10"
                        : "border-gray-200 focus:border-gray-400 bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] font-medium text-red-500 mt-0.5">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

            </div>

            {/* Main Action Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 cursor-pointer font-bold rounded-xl text-sm transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed ${
                isSubmitting
                  ? "bg-[#E2E4E9] text-[#1E1E2F]"
                  : "bg-[#923CF9] text-white hover:bg-[#7e2ed4]"
              }`}
            >
              {isSubmitting ? "Creating account..." : "Continue"}
            </button>
          </form>

          {/* Social Single-Sign-On Block */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Image src="/google-icons.svg" alt="Google Icon" width={18} height={18} />
              Google
            </button>

            <button
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        {/* Footer Redirect section */}
        <div className="text-center text-sm text-gray-500 mt-auto">
          Already have an account?{" "}
          <Link
            href={AuthRoutes.login + `?role=${role}&school=${encodeURIComponent(currentSchoolName)}`}
            className="text-[#1E1E2F] font-bold hover:underline ml-1"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Right Side: Feature Preview Panel */}
      <div className="hidden lg:col-span-5 bg-[#923CF9] lg:flex flex-col justify-center items-start p-16 relative overflow-hidden">
        <div className="max-w-md text-white mb-10 z-10">
          <h2 className="text-[24px] xl:text-[30px] font-bold leading-tight">
            Join Edutrac, A Modern tools for Smarter classrooms.
          </h2>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <Image
            src="/signupImg.png"
            alt="Live Classroom Interactive preview"
            width={485}
            height={300}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-12 h-12 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}