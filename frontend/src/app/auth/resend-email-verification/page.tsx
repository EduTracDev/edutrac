"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/routes/auth.routes";
import { ChevronLeft } from "lucide-react";

function ResendEmailVerificationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email address";
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";

  const [isProcessing, setIsProcessing] = useState(false);

  const handleResend = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col justify-between p-6 sm:p-8 md:p-12">
      <div className="w-full flex items-center justify-between">
        <Link href={`${AuthRoutes.register}?role=${role}&school=${school}`} className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft size={16} />
          Back to registration
        </Link>
        <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="object-contain" />
      </div>

      <div className="w-full max-w-xl mx-auto my-auto flex flex-col items-center text-center px-4">
        <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
          Verify Email Address
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-md leading-relaxed">
          We need to authenticate your profile destination. If you haven&apos;t received your confirmation packet link at <span className="text-gray-700 font-semibold">{email}</span>, request another link below.
        </p>

        <div className="my-10 relative w-40 h-40 flex items-center justify-center">
          <div className="absolute w-32 h-32 bg-[#923CF9]/5 rounded-full blur-2xl" />
          <svg className="w-24 h-24 text-[#923CF9]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <button
          onClick={handleResend}
          disabled={isProcessing}
          className="w-full max-w-md py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-bold rounded-xl text-sm transition-all shadow-md disabled:opacity-50"
        >
          {isProcessing ? "Re-dispatching verification link..." : "Resend Verification Link"}
        </button>
      </div>
      <div className="h-6" />
    </div>
  );
}

export default function ResendEmailVerification() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" /></div>}>
      <ResendEmailVerificationContent />
    </Suspense>
  );
}