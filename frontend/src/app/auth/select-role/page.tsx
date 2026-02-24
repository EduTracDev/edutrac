"use client";

import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";
import { SuperAdminRoutes } from "@/routes/superAdmin.routes";
import { SchoolOwnerRoutes } from "@/routes/schoolOwner.routes";
import { TeacherRoutes } from "@/routes/teacher.routes";
import { ParentRoutes } from "@/routes/parent.routes";
import { StudentRoutes } from "@/routes/student.routes";

const roles = [
  { label: "Super Admin", path: SuperAdminRoutes.dashboard },
  { label: "School Owner", path: SchoolOwnerRoutes.dashboard },
  { label: "Teacher", path: TeacherRoutes.dashboard },
  { label: "Parent", path: ParentRoutes.dashboard },
  { label: "Student", path: StudentRoutes.dashboard },
] as const;

export default function SelectRolePage() {
  return (
    <div className="w-full max-w-md rounded-xl bg-[var(--color-neutral-100)] p-8 shadow-sm border border-[var(--color-neutral-300)]">
      <h1 className="text-2xl font-bold text-[var(--color-neutral-black)]">Select role</h1>
      <p className="mt-2 text-sm text-[var(--color-neutral-700)]">
        After login, user can select which dashboard to enter. For now, links below are placeholders.
      </p>
      <ul className="mt-6 space-y-2">
        {roles.map(({ label, path }) => (
          <li key={path}>
            {/* <Link href={path} className="link block py-2">
              {label} → {path}
            </Link> */}
          </li>
        ))}
      </ul>
      <Link href={AuthRoutes.login} className="link mt-6 inline-block text-sm">
        Back to login
      </Link>
    </div>
  );
}
