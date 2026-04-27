"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, ShieldCheck, GraduationCap } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SchoolLandingPage({ params }: PageProps) {
  // Unwrap the params using the 'use' hook
  const { slug } = use(params);

  const router = useRouter();

  const portals = [
    {
      id: "admin",
      label: "School Admin",
      icon: ShieldCheck,
      color: "bg-slate-900",
    },
    {
      id: "teacher",
      label: "Teacher Portal",
      icon: GraduationCap,
      color: "bg-[#923CF9]",
    },
    {
      id: "parent",
      label: "Parent Portal",
      icon: UserCircle,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      {/* Now using the unwrapped 'slug' */}
      <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">
        Welcome to {slug.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {portals.map((portal) => (
          <button
            key={portal.id}
            onClick={() =>
              router.push(`/auth/login?role=${portal.id}&school=${slug}`)
            }
            className="group p-8 bg-white border border-slate-100 rounded-[40px] hover:shadow-2xl hover:shadow-purple-100 transition-all text-left"
          >
            <div
              className={`w-14 h-14 ${portal.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
            >
              <portal.icon size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-800">
              {portal.label}
            </h3>
            <p className="text-sm text-slate-400 mt-2 font-medium">
              Access your personalized dashboard.
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
