"use client";
import { useRouter } from "next/navigation";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import WelcomeBanner from "@/modules/school-admin/components/dashboard/WelcomeBanner";
import StatCard from "@/modules/school-admin/components/dashboard/StatCard";
import QuickActionCard from "@/modules/school-admin/components/dashboard/QuicActionCard";
import AnalyticsGrid from "@/modules/school-admin/components/dashboard/AnalyticsGrid";
import { ChartCard } from "@/modules/school-admin/components/dashboard/ChartCard";
import RevenueChart from "@/modules/school-admin/components/dashboard/RevenueChart";
import EnrollmentChart from "@/modules/school-admin/components/dashboard/EnrollmentChart";
import {
  schoolData,
  revenueData,
  enrollmentData,
  genderData,
  academicData,
  recentActivities,
} from "@/modules/constants/dashboard";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import AnnouncementModal from "@/modules/school-admin/components/dashboard/modals/AnnouncementModal";
import ExpensesModal from "@/modules/school-admin/components/dashboard/modals/ExpensesModal";
import GenderChart from "@/modules/school-admin/components/dashboard/GenderChart";
import AcademicChart from "@/modules/school-admin/components/dashboard/AcademicChart";
import RecentActivity from "@/modules/school-admin/components/dashboard/RecentActivity";
import { ExpenseSummaryCard } from "@/modules/school-admin/components/dashboard/ExpenseSummaryCard";
import Modal from "@/modules/school-admin/components/dashboard/Modal";
import {
  UserCheck,
  GraduationCap,
  Users,
  Layout,
  UserPlus,
  Wallet,
  PlusSquare,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import { Metadata } from "next";
import { toast } from "react-hot-toast";
import CreateClassModal from "@/modules/school-admin/components/dashboard/modals/CreateClassModal";

// export const metadata: Metadata = {
//   title: "School Overview | EduTrac Proprietor",
//   description:
//     "Monitor your school's financial health, student enrollment, and academic progress in real-time.",
//   robots: {
//     index: false,
//     follow: false,
//   },
//   openGraph: {
//     title: "EduTrac Proprietor Portal",
//     description: "Your school's vital signs at a glance.",
//     type: "website",
//   },
// };

export default function Page() {
  const {
    activeModal,
    setActiveModal,
    closeModal,
    formErrors,
    handleAnnouncementSubmit,
    handleClassSubmit,
    handleExpenseSubmit,
    isSubmitting,
  } = useDashboardForms();

  const router = useRouter();

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
          <ExpenseSummaryCard
            total={1250000}
            budget={2000000}
            month="March 2026"
          />
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
                <QuickActionCard
                  title="Post Announcement"
                  icon={Megaphone}
                  onClick={() => setActiveModal("announcement")}
                />
                <QuickActionCard
                  title="Approve Results"
                  icon={CheckCircle2}
                  onClick={() => {
                    toast.loading("Loading result portal...");
                    router.push("/school-admin/results/approve");
                  }}
                />
                <QuickActionCard
                  title="Expenses"
                  icon={Wallet}
                  onClick={() => setActiveModal("expenses")}
                />
              </div>
            </div>

            {/* Setup/Management Actions */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                School Setup
              </h2>
              <div className="flex flex-col gap-3">
                <QuickActionCard
                  title="Add Teacher"
                  icon={UserPlus}
                  onClick={() => router.push("/school-admin/teachers/add")}
                />
                <QuickActionCard
                  title="Add Student"
                  icon={UserPlus}
                  onClick={() => router.push("/school-admin/students/add")}
                />
                <QuickActionCard
                  title="Add Parent"
                  icon={UserPlus}
                  onClick={() => router.push("/school-admin/parents/add")}
                />
                <QuickActionCard
                  title="Create Class"
                  icon={PlusSquare}
                  onClick={() => setActiveModal("class")}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
      {activeModal === "announcement" && (
        <AnnouncementModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleAnnouncementSubmit}
          errors={formErrors}
          isSubmitting={isSubmitting}
        />
      )}
      {activeModal === "expenses" && (
        <ExpensesModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleExpenseSubmit}
          errors={formErrors}
          isSubmitting={isSubmitting}
        />
      )}
      {activeModal === "class" && (
        <CreateClassModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleClassSubmit}
          errors={formErrors}
          isSubmitting={isSubmitting}
        />
      )}
    </AdminLayout>
  );
}
