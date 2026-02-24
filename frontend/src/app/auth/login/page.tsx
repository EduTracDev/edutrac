import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";
import { LandingRoutes } from "@/routes/landing.routes";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-xl bg-[var(--color-neutral-100)] p-8 shadow-sm border border-[var(--color-neutral-300)]">
      <h1 className="text-2xl font-bold text-[var(--color-neutral-black)]">Sign in</h1>
      <p className="mt-2 text-sm text-[var(--color-neutral-700)]">
        Authentication form will be implemented here (e.g. with react-hook-form + yup + auth service).
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Link href={LandingRoutes.home} className="link text-center">
          Back to home
        </Link>
        <Link href={AuthRoutes.forgotPassword} className="link text-center text-sm">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
