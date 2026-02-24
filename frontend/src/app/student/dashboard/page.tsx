import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-neutral-100)]">
      <h1 className="text-2xl font-bold text-[var(--color-neutral-black)]">Student Dashboard</h1>
      <p className="mt-2 text-[var(--color-neutral-700)]">
        Placeholder. Add courses, assignments, grades here.
      </p>
      <Link href={AuthRoutes.selectRole} className="link mt-4 inline-block">
        ← Back to role select
      </Link>
    </div>
  );
}
