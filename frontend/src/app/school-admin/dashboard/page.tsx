import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import WelcomeBanner from "@/modules/school-admin/components/dashboard/WelcomeBanner";
import StatCard from "@/modules/school-admin/components/StatCard";
import QuickActionCard from "@/modules/school-admin/components/QuicActionCard";
import {
  UserCheck,
  GraduationCap,
  Users,
  Layout,
  UserPlus,
  PlusSquare,
  Megaphone,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edutrac - School Owner Dashboard",
  description: "School Owner Dashboard",
};

export default function Page() {
  // From Auth Context or Database
  const schoolData = {
    name: "Lincoln High School",
    id: "LHS-2025",
    date: "March 11, 2026",
    plan: "Premium plan",
  };
  return (
    <AdminLayout>
      <div className="space-y-8">
        <WelcomeBanner
          schoolName={schoolData.name}
          schoolId={schoolData.id}
          registeredDate={schoolData.date}
          planName={schoolData.plan}
        />

        {/* Section 1: Key Metrics */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            School Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Teachers"
              value="87"
              icon={UserCheck}
              color="text-blue-600"
            />
            <StatCard
              title="Students"
              value="1,247"
              icon={GraduationCap}
              color="text-purple-600"
            />
            <StatCard
              title="Parents"
              value="980"
              icon={Users}
              color="text-orange-600"
            />
            <StatCard
              title="Classes"
              value="47"
              icon={Layout}
              color="text-emerald-600"
            />
          </div>
        </section>

        {/* Section 2: Actions & Content split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* You could put a Recent Activity table or Chart here */}
            <div className="bg-white border rounded-3xl p-8 min-h-[300px] flex items-center justify-center text-slate-400 italic">
              Revenue Chart / Enrollment Analytics coming soon...
            </div>
          </div>

          <aside>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Quick Management
            </h2>
            <div className="flex flex-col gap-3">
              <QuickActionCard title="Add Teacher" icon={UserPlus} />
              <QuickActionCard title="Add Student" icon={UserPlus} />
              <QuickActionCard title="Create Class" icon={PlusSquare} />
              <QuickActionCard title="Post Announcement" icon={Megaphone} />
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
