import RegisterForm from "@/modules/auth/components/RegisterForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6">
      {/* Suspense is required when using useSearchParams in Next.js Client Components */}
      <Suspense fallback={<div>Loading form...</div>}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
