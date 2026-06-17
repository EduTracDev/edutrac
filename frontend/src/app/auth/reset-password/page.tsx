"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/routes/auth.routes";
import { ChevronLeft } from "lucide-react";

interface ResetFormData {
  email: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>();

  const onSubmit = async (data: ResetFormData) => {
    console.log("Sending token initialization to:", data.email);
    router.push(`${AuthRoutes.verifyToken}?email=${encodeURIComponent(data.email)}&role=${role}&school=${school}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans bg-white">
      <div className="hidden lg:col-span-5 bg-[#A361FF] lg:flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute w-[440px] h-[440px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-[320px] h-[320px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
        </div>
      </div>

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
              Reset Password
            </h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Click the button below to send a verification authorization reset link to your email address.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-semibold text-gray-500 transition-colors group-focus-within:text-[#923CF9]">
                Email
              </label>
              <input
                {...register("email", { required: "Email address is required verification marker" })}
                type="email"
                defaultValue="john.doe@gmail.com"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-sm text-[#1E1E2F] font-medium bg-white focus:outline-none focus:border-gray-500 transition-all"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.99]">
              Send Verification link
            </button>
          </form>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}