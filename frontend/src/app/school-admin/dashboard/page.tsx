import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import WelcomeBanner from "@/modules/school-admin/components/dashboard/WelcomeBanner";
import StatCard from "@/modules/school-admin/components/dashboard/StatCard";
import QuickActionCard from "@/modules/school-admin/components/dashboard/QuicActionCard";
import AnalyticsGrid from "@/modules/school-admin/components/dashboard/AnalyticsGrid";
import { ChartCard } from "@/modules/school-admin/components/dashboard/ChartCard";
import RevenueChart from "@/modules/school-admin/components/dashboard/RevenueChart";
import EnrollmentChart, {
  EnrollmentDataPoint,
} from "@/modules/school-admin/components/dashboard/EnrollmentChart";
import GenderChart from "@/modules/school-admin/components/dashboard/GenderChart";
import AcademicChart from "@/modules/school-admin/components/dashboard/AcademicChart";
import RecentActivity from "@/modules/school-admin/components/dashboard/RecentActivity";
import {
  UserCheck,
  GraduationCap,
  Users,
  Layout,
  UserPlus,
  PlusSquare,
  Megaphone,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { Metadata } from "next";

// type ModalType =
//   | "add-teacher"
//   | "add-student"
//   | "add-parent"
//   | "create-class"
//   | null;

export const metadata: Metadata = {
  title: "School Overview | EduTrac Proprietor",
  description:
    "Monitor your school's financial health, student enrollment, and academic progress in real-time.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "EduTrac Proprietor Portal",
    description: "Your school's vital signs at a glance.",
    type: "website",
  },
};

export interface AcademicDataPoint {
  gradeLevel: string;
  exceeding: number;
  meeting: number;
  below: number;
}

export interface ActivityItem {
  id: string;
  type: "payment" | "admission" | "academic";
  title: string;
  subtitle: string;
  time: string;
}

export default function Page() {
  // From Auth Context or Database
  const schoolData = {
    name: "Lincoln High School",
    id: "LHS-2025",
    date: "March 11, 2026",
    plan: "Premium plan",
  };
  const revenueData = [
    { month: "Jan", revenue: 4500000, debt: 1200000 },
    { month: "Feb", revenue: 5200000, debt: 800000 },
    { month: "Mar", revenue: 4800000, debt: 1500000 },
  ];

  const enrollmentData: EnrollmentDataPoint[] = [
    { period: "Sept '24", students: 800 },
    { period: "Jan '25", students: 950 },
    { period: "May '25", students: 980 },
    { period: "Sept '25", students: 1100 },
    { period: "Jan '26", students: 1247 },
  ];

  const academicData: AcademicDataPoint[] = [
    { gradeLevel: "JSS 1", exceeding: 45, meeting: 30, below: 5 },
    { gradeLevel: "JSS 2", exceeding: 38, meeting: 42, below: 10 },
    { gradeLevel: "JSS 3", exceeding: 50, meeting: 25, below: 2 },
    { gradeLevel: "SSS 1", exceeding: 30, meeting: 35, below: 15 },
  ];

  const genderData = [
    { name: "Boys", value: 740, fill: "#923CF9" },
    { name: "Girls", value: 507, fill: "#FF64D4" },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: "1",
      type: "payment",
      title: "Fee Payment: Adebayo Samuel",
      subtitle: "Paid ₦150,000 for 2nd Term Tuition",
      time: "2 mins ago",
    },
    {
      id: "2",
      type: "admission",
      title: "New Student Enrolled",
      subtitle: "Chinedu Okoro joined Basic 4 Silver",
      time: "45 mins ago",
    },
    {
      id: "3",
      type: "academic",
      title: "Results Published",
      subtitle: "JSS 3 Mathematics midterm scores uploaded",
      time: "2 hours ago",
    },
  ];
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
            title="Fee Collection"
            subtitle="Revenue vs Debt"
            isEmpty={revenueData.length === 0}
          >
            <RevenueChart data={revenueData} />
          </ChartCard>

          <ChartCard
            title="Enrollment Growth"
            subtitle="Total students over the last 3 sessions"
            isEmpty={enrollmentData.length === 0}
          >
            <EnrollmentChart data={enrollmentData} />
          </ChartCard>

          <ChartCard
            title="Gender Distribution"
            subtitle="Male vs. Female population split"
            isEmpty={genderData.length === 0}
          >
            <GenderChart data={genderData} />
          </ChartCard>

          <ChartCard
            title="Academic Health"
            subtitle="Performance distribution by class"
            isEmpty={academicData.length === 0}
          >
            <AcademicChart data={academicData} />
          </ChartCard>
        </AnalyticsGrid>
        {/* Section 2: Actions & Content split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivity activities={recentActivities} />
          </div>
          <aside className="space-y-8">
            {/* daily/Strategic Actions */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Daily Operations
              </h2>
              <div className="flex flex-col gap-3">
                <QuickActionCard title="Post Announcement" icon={Megaphone} />
                <QuickActionCard title="Approve Results" icon={CheckCircle2} />
                <QuickActionCard title="Log Expense" icon={Wallet} />
              </div>
            </div>

            {/* Setup/Management Actions */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                School Setup
              </h2>
              <div className="flex flex-col gap-3">
                <QuickActionCard title="Add Teacher" icon={UserPlus} />
                <QuickActionCard title="Add Student" icon={UserPlus} />
                <QuickActionCard title="Add Parent" icon={UserPlus} />
                <QuickActionCard title="Create Class" icon={PlusSquare} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
