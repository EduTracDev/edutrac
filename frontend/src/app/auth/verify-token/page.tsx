"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/routes/auth.routes";
import { ChevronLeft } from "lucide-react";

interface TokenFormData {
  token: string;
}

function VerifyTokenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";
  const email = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TokenFormData>();

  const onSubmit = async (data: TokenFormData) => {
    console.log("Validating security reset token:", data.token);
    router.push(`${AuthRoutes.createNewPassword}?token=${data.token}&role=${role}&school=${school}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans bg-white">
      <div className="hidden lg:col-span-5 bg-[#A361FF] lg:flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute w-[440px] h-[440px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-[320px] h-[320px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-between min-h-screen px-6 py-8 sm:px-16 md:px-24 xl:px-32">
        <div className="w-full flex justify-end">
          <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="object-contain" />
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-10">
          <Link href={`${AuthRoutes.resendResetPassword}?email=${encodeURIComponent(email)}&role=${role}&school=${school}`} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-4 transition-colors">
            <ChevronLeft size={14} />
            Back to resend setup
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
              Enter Security Token
            </h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Please enter the code sent to your dynamic configuration inbox below to verify identity authorization.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-semibold text-gray-500 transition-colors group-focus-within:text-[#923CF9]">
                Secure Reset Token Code
              </label>
              <input
                {...register("token", { required: "Security token is required to proceed" })}
                type="text"
                placeholder="Enter token code"
                className={`w-full px-4 py-3.5 border rounded-xl text-sm tracking-widest text-[#1E1E2F] font-bold bg-white focus:outline-none transition-all ${
                  errors.token ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
                }`}
              />
              {errors.token && <p className="text-xs font-medium text-red-500 mt-1.5 pl-1">{errors.token.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-60">
              {isSubmitting ? "Verifying..." : "Verify Token"}
            </button>
          </form>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

export default function VerifyToken() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" /></div>}>
      <VerifyTokenContent />
    </Suspense>
  );
}