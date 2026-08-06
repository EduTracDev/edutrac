"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginSchema } from "@/utils/validation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import client from "@/utils/client";
import { authServices, LoginRequest, LoginResponse } from "@/services/auth.service";

function LoginContent() {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);

    try {
      const response = await client.request<LoginRequest, LoginResponse>({
        path: authServices.login.path,
        method: authServices.login.method,
        data: {
          email: data.email,
          password: data.password,
        },
      });

      if (response?.accessToken) {
        document.cookie = `accessToken=${encodeURIComponent(response.accessToken)}; path=/; SameSite=Lax`;
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken);
        }

        // Redirect based on role or to home dashboard
        router.push(`/dashboard?role=${role}&school=${encodeURIComponent(school)}`);
      } else {
        setApiError(response?.message || "Invalid email or password.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred during sign in. Please try again.";
      setApiError(errorMessage);
    }
  };

  const handleGoogleAuth = () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    window.location.href = `${backendUrl}/api/v1/auth/google/login-user`;
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
        <div className="w-full max-w-md mx-auto my-auto py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1E1E2F]">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to continue manage your school.
            </p>
          </div>

          {apiError && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#1E1E2F]">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none placeholder-gray-300 text-gray-700 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-gray-400 bg-white"
                }`}
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#1E1E2F]">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-4 pr-10 py-3 border rounded-xl text-sm transition-all focus:outline-none placeholder-gray-300 text-gray-700 ${
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password Section */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 font-medium">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#923CF9] focus:ring-[#923CF9] accent-[#923CF9]"
                />
                Remember me
              </label>
              <Link
                href={AuthRoutes.forgotPassword + `?role=${role}&school=${school}`}
                className="text-sm font-semibold text-[#1E1E2F] hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            {/* Main Action Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 cursor-pointer font-bold rounded-xl text-sm transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                isSubmitting
                  ? "bg-[#E2E4E9] text-[#1E1E2F]"
                  : "bg-[#923CF9] text-white hover:bg-[#7e2ed4]"
              }`}
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </button>
          </form>

          {/* Social Dividers Alternative buttons */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Image src="/google-icons.svg" alt="Google Icon" width={18} height={18} />
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        {/* Footer Links layout */}
        <div className="text-center text-sm text-gray-500 mt-auto">
          Don&apos;t have an account?{" "}
          <Link
            href={AuthRoutes.register + `?role=${role}&school=${school}`}
            className="text-[#1E1E2F] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Right Side: Showcase Branding Panel */}
      <div className="hidden lg:col-span-5 bg-[#923CF9] lg:flex flex-col justify-center items-start p-16 xl:p-16 relative overflow-hidden">
        
        {/* Main Header Quote Layout */}
        <div className="max-w-md text-white mb-12 z-10">
          <h2 className="text-3xl xl:text-[30px] font-bold leading-tight">
            Join Edutrac, A Modern tools for Smarter classrooms.
          </h2>
        </div>

        {/* Abstract Stacked Dashboard Graphic Components Mockup */}
        <div className="relative w-full max-w-lg select-none">
          <Image
            src="/loginImg.png"
            alt="Dashboard Mockup"
            width={484}
            height={425}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-12 h-12 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}