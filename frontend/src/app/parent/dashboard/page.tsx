import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";

export default function ParentDashboardPage() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-neutral-100)]">
      <h1 className="text-2xl font-bold text-[var(--color-neutral-black)]">Parent Dashboard</h1>
      <p className="mt-2 text-[var(--color-neutral-700)] !text-primary-800 ">
        Placeholder. Add children, attendance, messages here.
      </p>
      <Link href={AuthRoutes.selectRole} className="link mt-4 inline-block">
        ← Back to role select
      </Link>
    </div>
  );
}
