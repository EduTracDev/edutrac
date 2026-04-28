"use client";
import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";
import { Suspense } from "react";
import { LandingRoutes } from "@/routes/landing.routes";
import { useSearchParams, useRouter } from "next/navigation";
import { use } from "react";
import {
  ShieldCheck,
  GraduationCap,
  UserCircle,
  Lock,
  Mail,
} from "lucide-react";
import { LoginFormData, loginSchema } from "@/utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { loginUser } from "@/modules/auth/services/authService";
// import { toast } from "react-hot-toast";

function LoginContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "parent";
  const school = searchParams.get("school") || "EduTrac";

  const config = {
    admin: {
      label: "Admin",
      icon: ShieldCheck,
      color: "text-slate-900",
      bg: "bg-slate-900",
    },
    teacher: {
      label: "Teacher",
      icon: GraduationCap,
      color: "text-[#923CF9]",
      bg: "bg-[#923CF9]",
    },
    parent: {
      label: "Parent",
      icon: UserCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-500",
    },
  }[role as "admin" | "teacher" | "parent"];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Attempting Login:", data);
    // This is where we will call Firebase Auth
  };

  //   const onSubmit = async (data: LoginFormData) => {
  //   try {
  //     const userProfile = await loginUser(data, role, school);

  //     toast.success(`Welcome back, ${userProfile.name}!`);

  //     // Route them to their specific dashboard
  //     // e.g., /parent/dashboard or /admin/dashboard
  //     router.push(`/${role}/dashboard`);

  //   } catch (error: any) {
  //     const message = error.code === 'auth/wrong-password'
  //       ? "Invalid credentials. Please try again."
  //       : error.message;

  //     toast.error(message);
  //     console.error("Login Error:", error);
  //   }
  // };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center px-8 md:px-20 bg-white">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div>
            <div
              className={`w-12 h-12 ${config.bg} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl`}
            >
              <config.icon size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              {config.label} Login
            </h1>
            <p className="text-slate-400 font-medium mt-2">
              Sign in to your portal at{" "}
              <span className={`${config.color} font-bold capitalize`}>
                {school.replace("-", " ")}
              </span>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? "text-rose-500" : "text-slate-300"}`}
                  size={18}
                />
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl text-sm font-bold focus:outline-none transition-all ${
                    errors.email
                      ? "border-rose-500 focus:border-rose-600"
                      : "border-slate-100 focus:border-slate-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] font-bold text-rose-500 ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? "text-rose-500" : "text-slate-300"}`}
                  size={18}
                />
                <input
                  {...register("password")}
                  type="password"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl text-sm font-bold focus:outline-none transition-all ${
                    errors.password
                      ? "border-rose-500 focus:border-rose-600"
                      : "border-slate-100 focus:border-slate-300"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-[10px] font-bold text-rose-500 ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className={`w-full py-5 ${config.bg} text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl disabled:opacity-50`}
            >
              {isSubmitting ? "Authenticating..." : "Secure Entry"}
            </button>
          </form>

          <p className="text-center text-xs font-medium text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href={AuthRoutes.register + `?role=${role}&school=${school}`}
              className={`${config.color} font-black underline`}
            >
              Contact your School Admin
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Branding/Visual */}
      <div
        className={`hidden lg:flex flex-col justify-center items-center p-20 ${config.bg} relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white blur-[120px]" />
        </div>

        <div className="relative z-10 text-center text-white space-y-6">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-[48px] border border-white/10 inline-block">
            <config.icon size={80} className="mx-auto text-white" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter">
            Your campus, <br />
            digitized.
          </h2>
          <p className="text-white/60 font-medium max-w-xs mx-auto">
            Experience the next level of school management and parent-teacher
            communication.
          </p>
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
