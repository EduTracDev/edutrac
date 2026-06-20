"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/routes/auth.routes";
import { ChevronLeft } from "lucide-react";

function ResendResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email address";
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";
  
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      // Simulate verification discovery redirect
      router.push(`${AuthRoutes.verifyToken}?email=${encodeURIComponent(email)}&role=${role}&school=${school}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans relative flex flex-col justify-between p-6 sm:p-8 md:p-12">
      <div className="w-full flex items-center justify-between">
        <Link href={`${AuthRoutes.forgotPassword}?role=${role}&school=${school}`} className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft size={16} />
          Back
        </Link>
        <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="object-contain" />
      </div>

      <div className="w-full max-w-xl mx-auto my-auto flex flex-col items-center text-center px-4">
        <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
          Check your email
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-md leading-relaxed">
          We have sent a password reset token link to <span className="text-gray-600 font-medium">{email}</span>. Click the button below to resend if it hasn&apos;t arrived.
        </p>

        <div className="my-10 relative w-44 h-44 flex items-center justify-center">
          <div className="absolute w-28 h-28 bg-[#923CF9]/10 rounded-full blur-xl" />
          <div className="relative w-36 h-36">
            <Image src="/email-mascot.png" alt="Mascot Illustration" fill className="object-contain" priority />
          </div>
        </div>

        <button
          onClick={handleResend}
          disabled={isResending}
          className="w-full max-w-md py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
        >
          {isResending ? "Resending Link..." : "Resend Link"}
        </button>
      </div>
      <div className="h-6" />
    </div>
  );
}

export default function ResendResetPassword() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" /></div>}>
      <ResendResetPasswordContent />
    </Suspense>
  );
}