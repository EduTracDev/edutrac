"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoutes } from "@/routes/auth.routes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const passwordSchema = Yup.object().shape({
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Please confirm your password")
});

type CreateNewPasswordData = Yup.InferType<typeof passwordSchema>;

function CreateNewPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateNewPasswordData>({
    resolver: yupResolver(passwordSchema)
  });

  const onSubmit = async (data: CreateNewPasswordData) => {
    console.log("Saving new secured credential profiles...");
    // Simulate successful updates, then route them to the login screen
    router.push(`${AuthRoutes.login}?role=${role}&school=${school}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans bg-white">
      <div className="hidden lg:col-span-5 bg-[#A361FF] lg:flex flex-col justify-center items-center relative overflow-hidden">
        <div className="max-w-xs text-center text-white/90 z-10 space-y-3">
          <p className="text-xl font-bold">Secure Infrastructure</p>
          <p className="text-xs text-white/60">Your updates utilize top-tier encryption protocols to safeguard institutional information accounts.</p>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-between min-h-screen px-6 py-8 sm:px-16 md:px-24 xl:px-32">
        <Link href="/" className="w-full flex justify-end">
          <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="object-contain" />
        </Link>

        <div className="w-full max-w-md mx-auto my-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1E1E2F] tracking-tight">
              Create new password
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Please design a secure, unique password to ensure total workspace protection.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1E2F]">New Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter new password"
                className={`w-full px-4 py-3 border rounded-xl text-sm transition-all bg-white focus:outline-none ${
                  errors.password ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-gray-400"
                }`}
              />
              {errors.password && <p className="text-xs font-medium text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1E2F]">Confirm New Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm password"
                className={`w-full px-4 py-3 border rounded-xl text-sm transition-all bg-white focus:outline-none ${
                  errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-gray-400"
                }`}
              />
              {errors.confirmPassword && <p className="text-xs font-medium text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-bold rounded-xl text-sm transition-all mt-2 shadow-md">
              {isSubmitting ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

export default function CreateNewPassword() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-[#923CF9] border-t-transparent rounded-full animate-spin" /></div>}>
      <CreateNewPasswordContent />
    </Suspense>
  );
}