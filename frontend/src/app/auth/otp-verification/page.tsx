"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/routes/auth.routes";
import { ChevronLeft } from "lucide-react";

function OtpVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email address";
  
  // States: 'checking' | 'verified'
  const [verificationState, setVerificationState] = useState<'checking' | 'verified'>('checking');
  const [isResending, setIsResending] = useState(false);

  const handleResendCode = async () => {
    setIsResending(true);
    // Simulate backend request trigger
    setTimeout(() => {
      setIsResending(false);
      // For demonstration purposes, we switch to verified view when clicked
      setVerificationState('verified');
    }, 1500);
  };

  const handleContinue = () => {
    router.push(AuthRoutes.login);
  };

  return (
    <div className="min-h-screen bg-white font-sans relative flex flex-col justify-between p-6 sm:p-8 md:p-12">
      
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between">
        <Link 
          href={AuthRoutes.login} 
          className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to login
        </Link>
        
        <div className="flex items-center">
          <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="object-contain" />
        </div>
      </div>

      {/* Main Container Core */}
      <div className="w-full max-w-xl mx-auto my-auto flex flex-col items-center text-center px-4">
        {verificationState === 'checking' ? (
          <>
            {/* CHECK YOUR EMAIL STATE */}
            <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-gray-400 mt-3 max-w-md leading-relaxed">
              We&apos;ve sent a verification code to <span className="text-gray-600 font-medium">{email}</span>. It may take a few minutes to arrive.
            </p>

            {/* Mascot Running/Delivery Illustration Placeholder */}
            <div className="my-10 relative w-44 h-44 flex items-center justify-center">
              {/* Abstract layout matching the screenshot icon */}
              <div className="absolute w-28 h-28 bg-[#923CF9]/10 rounded-full blur-xl animate-pulse" />
              <div className="relative w-36 h-36">
                <Image 
                  src="/email-mascot.png" 
                  alt="Verification Mascot" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Action resend button element */}
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="w-full max-w-md py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          </>
        ) : (
          <>
            {/* ACCOUNT VERIFIED SUCCESS STATE */}
            <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
              Account Verified
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-sm">
              Your account has been successfully verified!
            </p>

            {/* Spacer to replicate clean minimal look from verification image */}
            <div className="h-24" />

            <button
              onClick={handleContinue}
              className="w-full max-w-md py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-[0.99]"
            >
              Continue
            </button>
          </>
        )}
      </div>

      {/* Empty bottom element matching the layout balance structure */}
      <div className="h-6" />
    </div>
  );
}

export default function OtpVerification() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OtpVerificationContent />
    </Suspense>
  );
}