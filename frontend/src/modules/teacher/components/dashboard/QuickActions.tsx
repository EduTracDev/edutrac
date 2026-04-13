import React from "react";
import { ClipboardCheck, FilePlus, Megaphone, UserPlus } from "lucide-react";
import QuickActionCard from "@/modules/school-admin/components/dashboard/QuicActionCard";
import { useRouter } from "next/navigation";
import { TeacherRoutes } from "@/routes/teacher.routes";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Mark Attendance",
      icon: ClipboardCheck,
      path: TeacherRoutes.attendance,
    },
    {
      title: "Upload Results",
      icon: FilePlus,
      path: TeacherRoutes.results,
    },
    {
      title: "New Announcement",
      icon: Megaphone,
      path: TeacherRoutes.announcements,
    },
    // {
    //   title: "Add Student",
    //   icon: UserPlus,
    //   path: "#",
    // },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-black text-slate-800">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => (
          <QuickActionCard
            key={action.title}
            title={action.title}
            icon={action.icon}
            onClick={() => router.push(action.path)}
          />
        ))}
      </div>
    </section>
  );
}
