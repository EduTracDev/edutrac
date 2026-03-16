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
import { FeeReminderModal } from "@/modules/school-admin/components/dashboard/modals/FeeReminderModal";
import { SchedulePTAModal } from "@/modules/school-admin/components/dashboard/modals/SchedulePTAModal";
import { BulkSMSModal } from "@/modules/school-admin/components/dashboard/modals/BulkSMSModal";
import GenderChart from "@/modules/school-admin/components/dashboard/GenderChart";
import AcademicChart from "@/modules/school-admin/components/dashboard/AcademicChart";
import RecentActivity from "@/modules/school-admin/components/dashboard/RecentActivity";
import { SmartActions } from "@/modules/school-admin/components/dashboard/SmartAction";
import { SchoolHealthCard } from "@/modules/school-admin/components/dashboard/SchoolHealthCard";
import { ExpenseSummaryCard } from "@/modules/school-admin/components/dashboard/ExpenseSummaryCard";
import { FinancialStatCard } from "@/modules/school-admin/components/dashboard/FinancialStatCard";
import { AttendanceStatCard } from "@/modules/school-admin/components/dashboard/AttendanceStatCard";
import { AdmissionsStatCard } from "@/modules/school-admin/components/dashboard/AdmissionsStatCard";
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
import BackToTop from "@/app/BackToTop";
import { InsightCard } from "@/modules/school-admin/components/dashboard/InsightCard";

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
  const financialData = {
    unpaidFees: "₦4.25M",
    debtorsCount: 42,
    trend: "+12%",
  };

  const handleSmartAction = (id: string) => {
    switch (id) {
      case "fee-reminder":
        setActiveModal("fee-reminder-preview");
        break;

      case "pta-meeting":
        setActiveModal("schedule-pta");
        break;

      case "bulk-sms":
        setActiveModal("bulk-sms");
        break;

      case "approve-results":
        toast.loading("Opening result portal...");
        router.push("/school-admin/results/approve");
        break;

      default:
        console.warn(`Action ID "${id}" is not handled.`);
        break;
    }
  };
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
        <SmartActions onAction={handleSmartAction} />

        {/* Section 1: Mobile-Only Quick Actions */}
        <section className="lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            <QuickActionCard
              title="Post Announcement"
              icon={Megaphone}
              onClick={() => setActiveModal("announcement")}
            />
            <QuickActionCard
              title="Expenses"
              icon={Wallet}
              onClick={() => setActiveModal("expenses")}
            />
            <QuickActionCard
              title="Approve Results"
              icon={CheckCircle2}
              onClick={() => {
                toast.loading("Loading result portal...");
                router.push("/school-admin/results/approve");
              }}
            />
          </div>
        </section>

        {/* Section 2: Key Metrics Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              School Overview
            </h2>
            <span className="text-xs text-slate-400 font-medium italic">
              Refreshed 12:19 PM
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FinancialStatCard
              title="Unpaid Fees"
              amount="₦4.25M"
              count={42}
              trend="+12%"
              onViewDetails={() => router.push("/school-admin/finance/debtors")}
            />
            <AttendanceStatCard present={1185} total={1247} />
            <AdmissionsStatCard pending={12} interviews={8} target={50} />
            <ExpenseSummaryCard
              total={1250000}
              budget={2000000}
              month="March 2026"
            />
          </div>
        </section>

        {/* Section 3: Main Content & Sidebar Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Deep Data */}
          <div className="lg:col-span-2 space-y-8">
            <AnalyticsGrid>
              <ChartCard title="Fee Collection" subtitle="Revenue vs Debt">
                <RevenueChart data={revenueData} />
              </ChartCard>
              <ChartCard title="Enrollment Growth" subtitle="Last 3 sessions">
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

            <RecentActivity activities={recentActivities} />
          </div>

          {/* RIGHT COLUMN: Command Center & Population */}
          <aside className="space-y-8">
            {/* THE COMMAND CENTER (NEW) */}
            <InsightCard />
            <SchoolHealthCard
              finance={65}
              attendance={92}
              academic={78}
              admissions={45}
            />

            {/* School Population (Desktop Only) */}
            <div className="hidden lg:block space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Population Status
              </h2>
              <div className="grid grid-cols-1 gap-3">
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
              </div>
            </div>

            {/* Daily Operations (Desktop Only) */}
            <div className="hidden lg:block space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Daily Operations
              </h2>
              <div className="flex flex-col gap-3">
                <QuickActionCard
                  title="Post Announcement"
                  icon={Megaphone}
                  onClick={() => setActiveModal("announcement")}
                />
                <QuickActionCard
                  title="Expenses"
                  icon={Wallet}
                  onClick={() => setActiveModal("expenses")}
                />
                <QuickActionCard
                  title="Approve Results"
                  icon={CheckCircle2}
                  onClick={() => {
                    toast.loading("Loading result portal...");
                    router.push("/school-admin/results/approve");
                  }}
                />
              </div>
            </div>

            {/* Management (Visible All Sizes) */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                School Management
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

      {/* MODAL REGISTRY */}
      {activeModal === "fee-reminder-preview" && (
        <FeeReminderModal
          debtorsCount={financialData.debtorsCount}
          totalAmount={financialData.unpaidFees}
          onClose={() => setActiveModal(null)}
          onConfirm={async () => {
            const t = toast.loading("Broadcasting reminders...");
            // Simulate API Call
            await new Promise((res) => setTimeout(res, 2000));
            toast.success("Reminders sent successfully!", { id: t });
            setActiveModal(null);
          }}
        />
      )}
      {activeModal === "schedule-pta" && (
        <SchedulePTAModal
          onClose={() => setActiveModal(null)}
          onSubmit={(data) => {
            console.log("PTA Scheduled:", data);
            toast.success("Meeting invitation sent to all parents");
            setActiveModal(null);
          }}
        />
      )}
      {activeModal === "bulk-sms" && (
        <BulkSMSModal
          onClose={() => setActiveModal(null)}
          onSend={(data) => {
            // 1. Format the message for a URL
            const encodedMessage = encodeURIComponent(
              `*Broadcast from ${schoolData.name}*\n\n${data.message}`,
            );

            // 2. Logic for recipient (In a real app, you'd loop or use a broadcast group)
            // For now, we open the WhatsApp Web / App interface
            const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

            // 3. Open in new tab
            window.open(whatsappUrl, "_blank");

            // 4. Feedback & Close
            toast.success("WhatsApp interface opened!");
            setActiveModal(null);
          }}
        />
      )}
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
