"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/routes/auth.routes";
import { ChevronLeft } from "lucide-react";

interface ForgotPasswordFormData {
  email: string;
}

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("Sending password reset instructions to:", data.email);
    // Push seamlessly into your resend/confirmation flow route
    router.push(`${AuthRoutes.resendResetPassword}?email=${encodeURIComponent(data.email)}&role=${role}&school=${school}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans bg-white">
      
      {/* Left Column Graphic panel */}
      <div className="hidden lg:col-span-5 bg-[#A361FF] lg:flex flex-col justify-center items-center relative overflow-hidden">
        <Image src="/reset-icon.png" alt="Forgot Password Graphic" width={400} height={400} className="object-contain z-10" />
      </div>

      {/* Right Column Form Structure */}
      <div className="lg:col-span-7 flex flex-col justify-between min-h-screen px-6 py-8 sm:px-16 md:px-24 xl:px-32">
        <Link href="/" className="w-full flex justify-end">
          <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="object-contain" />
        </Link>

        <div className="w-full max-w-md mx-auto my-auto py-10">
          <Link href={`${AuthRoutes.login}?role=${role}&school=${school}`} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-4 transition-colors">
            <ChevronLeft size={14} />
            Back to login
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Enter your email address below and we will send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-semibold text-gray-500 transition-colors group-focus-within:text-[#923CF9]">
                Email Address
              </label>
              <input
                {...register("email", { 
                  required: "Email address is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                })}
                type="email"
                placeholder="name@example.com"
                className={`w-full px-4 py-3.5 border rounded-xl text-sm text-[#1E1E2F] font-medium bg-white focus:outline-none transition-all ${
                  errors.email ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
                }`}
              />
              {errors.email && <p className="text-xs font-medium text-red-500 mt-1.5 pl-1">{errors.email.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-60">
              {isSubmitting ? "Sending Link..." : "Send Reset Instructions"}
            </button>
          </form>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" /></div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}