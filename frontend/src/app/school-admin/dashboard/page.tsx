import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import WelcomeBanner from "@/modules/school-admin/components/dashboard/WelcomeBanner";
import StatCard from "@/modules/school-admin/components/dashboard/StatCard";
import QuickActionCard from "@/modules/school-admin/components/dashboard/QuicActionCard";
import AnalyticsGrid from "@/modules/school-admin/components/dashboard/AnalyticsGrid";
import { ChartCard } from "@/modules/school-admin/components/dashboard/ChartCard";
import RevenueChart from "@/modules/school-admin/components/dashboard/RevenueChart";
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

// type ModalType =
//   | "add-teacher"
//   | "add-student"
//   | "add-parent"
//   | "create-class"
//   | null;

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
  // const [activeModal, setActiveModal] = useState<ModalType>(null);

  // const openModal = (type: ModalType) => {
  //   setActiveModal(type);
  //   console.log(`Opening modal: ${type}`);
  // };

  // const closeModal = () => setActiveModal(null);

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
              // loading={isLoading}
              // onEmptyAction={() => openModal("add-teacher")}
            />
            <StatCard
              title="Students"
              value="1,247"
              icon={GraduationCap}
              color="text-purple-600"
              // loading={isLoading}
              // onEmptyAction={() => openModal("add-student")}
            />
            <StatCard
              title="Parents"
              value="980"
              icon={Users}
              color="text-orange-600"
              // loading={isLoading}
              // onEmptyAction={() => openModal("add-parents")}
            />
            <StatCard
              title="Classes"
              value="47"
              icon={Layout}
              color="text-emerald-600"
              // loading={isLoading}
              // onEmptyAction={() => openModal("add-classes")}
            />
          </div>
        </section>
        {/* 2. TRENDS: The 4-Quadrant Grid */}
        <AnalyticsGrid>
          <ChartCard
            title="Fee Collection Overview"
            subtitle="Revenue vs. Outstanding Debt"
            // loading={isFinancialsLoading}
            // isEmpty={revenueData.length === 0}
            // emptyActionText="Record a payment"
            // onEmptyAction={() => openModal("add-payment")}
          >
            <RevenueChart />
          </ChartCard>

          <ChartCard
            title="Enrollment Growth"
            subtitle="Student population over last 3 terms"
          >
            <div className="text-slate-300 italic">
              Coming Next: Enrollment Line Chart
            </div>
          </ChartCard>

          <ChartCard
            title="Gender Distribution"
            subtitle="Male vs. Female population split"
          >
            <div className="text-slate-300 italic">
              Coming Soon: Gender Pie Chart
            </div>
          </ChartCard>

          <ChartCard
            title="Academic Health"
            subtitle="Overall Pass/Fail rate per term"
          >
            <div className="text-slate-300 italic">
              Coming Soon: Performance Stacked Bar
            </div>
          </ChartCard>
        </AnalyticsGrid>
        {/* Section 2: Actions & Content split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* You could put a Recent Activity table or Chart here */}
            <div className="bg-white border rounded-3xl p-8 min-h-75 flex items-center justify-center text-slate-400 italic">
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
