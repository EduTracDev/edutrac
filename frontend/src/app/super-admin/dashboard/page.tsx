import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";
import { SuperAdminRoutes } from "@/routes/superAdmin.routes";

export default function SuperAdminDashboardPage() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-neutral-100)]">
      <h1 className="text-2xl font-bold text-[var(--color-neutral-black)]">Super Admin Dashboard</h1>
      <p className="mt-2 text-[var(--color-neutral-700)]">
        Placeholder. Add sidebar, stats, and super-admin features here.
      </p>
      <Link href={AuthRoutes.selectRole} className="link mt-4 inline-block">
        ← Back to role select
      </Link>
    </div>
  );
}
