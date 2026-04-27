"use client";
import { useState, useMemo } from "react";
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
  mockDebtors,
} from "@/modules/constants/dashboard";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import AnnouncementModal from "@/modules/school-admin/components/dashboard/modals/AnnouncementModal";

import { FeeReminderModal } from "@/modules/school-admin/components/dashboard/modals/FeeReminderModal";
import { SchedulePTAModal } from "@/modules/school-admin/components/dashboard/modals/SchedulePTAModal";
import { BulkSMSModal } from "@/modules/school-admin/components/dashboard/modals/BulkSMSModal";
import GenderChart from "@/modules/school-admin/components/dashboard/GenderChart";
import AcademicChart from "@/modules/school-admin/components/dashboard/AcademicChart";
import RecentActivity from "@/modules/school-admin/components/dashboard/RecentActivity";
import { SmartActions } from "@/modules/school-admin/components/dashboard/SmartAction";
import { SchoolHealthCard } from "@/modules/school-admin/components/dashboard/SchoolHealthCard";

import { FinancialStatCard } from "@/modules/school-admin/components/dashboard/FinancialStatCard";
import { AttendanceStatCard } from "@/modules/school-admin/components/dashboard/AttendanceStatCard";
import { AdmissionsStatCard } from "@/modules/school-admin/components/dashboard/AdmissionsStatCard";
import { AddStudentModal } from "@/modules/school-admin/components/dashboard/modals/AddStudentModal";
import { AddTeacherModal } from "@/modules/school-admin/components/dashboard/modals/AddTeacherModal";
import { AddParentModal } from "@/modules/school-admin/components/dashboard/modals/AddParentModal";
import { ExpenseSummaryCard } from "@/modules/school-admin/components/dashboard/ExpensesSummaryCard";

import {
  UserCheck,
  GraduationCap,
  Users,
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
import { formatCurrency } from "@/utils/currency";

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
  const [records] = useState(mockDebtors);

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
    clearErrors,
    handleAnnouncementSubmit,
    handleClassSubmit,
    handleExpenseSubmit,
    handleTeacherSubmit,
    handleBulkTeacherSubmit,
    teacherBulkErrors,
    handleStudentSubmit,
    handleBulkStudentSubmit,
    studentBulkErrors,
    parentBulkErrors,
    handleParentSubmit,
    handleBulkParentSubmit,
    isSubmitting,
  } = useDashboardForms();

  const stats = useMemo(() => {
    const totalOutstanding = records.reduce((sum, r) => sum + r.balance, 0);
    const criticalDebtors = records.filter(
      (r) => r.status === "Overdue",
    ).length;

    return {
      totalOutstanding,
      debtorCount: records.length,
      criticalDebtors,
    };
  }, [records]);

  const router = useRouter();

  return (
    <AdminLayout>
      <WelcomeBanner
        schoolName={schoolData.name}
        schoolId={schoolData.id}
        registeredDate={schoolData.date}
        planName={schoolData.plan}
      />
      <div className="space-y-8">
        <SmartActions onAction={handleSmartAction} />
        {/* School Population (Desktop Only) */}
        <div className="hidden lg:block space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Population Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
        {/* Expense + Insights + Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ExpenseSummaryCard
            total={2400000}
            budget={2500000}
            month="March"
            href="/school-admin/fee-management"
          />
          <InsightCard />
          <SchoolHealthCard
            finance={65}
            attendance={92}
            academic={78}
            admissions={45}
          />
        </div>

        {/* Mobile-Only Quick Actions */}
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
            {/* <QuickActionCard
              title="Approve Results"
              icon={CheckCircle2}
              onClick={() => {
                toast.loading("Opening Approval Portal...");
                router.push("/school-admin/results/");
              }}
            /> */}
          </div>
        </section>
        {/* Section 2: Key Metrics Grid */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800">
              School Overview
            </h2>
            <span className="text-xs sm:text-sm text-slate-400 font-medium italic mt-2 sm:mt-0">
              Refreshed 12:19 PM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <FinancialStatCard
              title="Unpaid Fees"
              amount="₦4.25M"
              count={42}
              trend="+12%"
              onViewDetails={() => router.push("/school-admin/finance/debtors")}
            />
            <AttendanceStatCard present={1185} total={1247} />
            <AdmissionsStatCard pending={12} interviews={8} target={50} />
          </div>
        </section>
        <div className="grid grid-cols-1 gap-8">
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
        </div>
        <aside className="flex flex-col md:flex-row gap-6">
          <div className="hidden lg:flex justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Daily Operations
              </h2>
              <div className="mt-4 flex flex-row gap-3">
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
                {/* <QuickActionCard
                  title="Approve Results"
                  icon={CheckCircle2}
                  onClick={() => {
                    toast.loading("Loading result portal...");
                    router.push("/school-admin/results/approve");
                  }}
                /> */}
              </div>
              <div className="mt-8">
                <RecentActivity activities={recentActivities} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              School Management
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <QuickActionCard
                title="Add Teacher"
                icon={UserPlus}
                onClick={() => setActiveModal("teacher")}
              />
              <QuickActionCard
                title="Add Student"
                icon={UserPlus}
                onClick={() => setActiveModal("student")}
              />
              <QuickActionCard
                title="Add Parent"
                icon={UserPlus}
                onClick={() => setActiveModal("parent")}
              />
              <QuickActionCard
                title="Create Class"
                icon={PlusSquare}
                onClick={() => setActiveModal("class")}
              />
            </div>
          </div>
        </aside>
        {/* </div> */}

        {/* MODAL REGISTRY */}
        {activeModal === "fee-reminder-preview" && (
          <FeeReminderModal
            // debtorsCount={financialData.debtorsCount}
            // totalAmount={formatCurrency(stats.totalOutstanding)}
            // onClose={() => setActiveModal(null)}
            // onConfirm={async () => {
            //   const t = toast.loading("Broadcasting reminders...");
            //   await new Promise((res) => setTimeout(res, 2000));
            //   toast.success("Reminders sent successfully!", { id: t });
            //   setActiveModal(null);
            // }}
            debtorsCount={stats.debtorCount}
            totalAmount={stats.totalOutstanding}
            onClose={() => setActiveModal(null)}
            onConfirm={async () => {
              const t = toast.loading("Broadcasting reminders...");
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
              // Format the message for a URL
              const encodedMessage = encodeURIComponent(
                `*Broadcast from ${schoolData.name}*\n\n${data.message}`,
              );

              //  Logic for recipient ( loop or use a broadcast group)
              const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
              window.open(whatsappUrl, "_blank");
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
        {activeModal === "class" && (
          <CreateClassModal
            isOpen={activeModal === "class"}
            onClose={closeModal}
            onSubmit={handleClassSubmit}
            errors={formErrors}
            isSubmitting={isSubmitting}
          />
        )}
        {activeModal === "teacher" && (
          <AddTeacherModal
            isOpen={activeModal === "teacher"}
            onClose={closeModal}
            onSubmit={handleTeacherSubmit}
            onBulkSubmit={handleBulkTeacherSubmit}
            errors={formErrors}
            isSubmitting={isSubmitting}
            teacherBulkErrors={teacherBulkErrors}
            clearErrors={clearErrors}
          />
        )}
        {activeModal === "student" && (
          <AddStudentModal
            isOpen={activeModal === "student"}
            onClose={closeModal}
            onSubmit={handleStudentSubmit}
            onBulkSubmit={handleBulkStudentSubmit}
            errors={formErrors}
            isSubmitting={isSubmitting}
            studentBulkErrors={studentBulkErrors}
            clearErrors={clearErrors}
          />
        )}
        {activeModal === "parent" && (
          <AddParentModal
            isOpen={activeModal === "parent"}
            onClose={closeModal}
            onSubmit={handleParentSubmit}
            onBulkSubmit={handleBulkParentSubmit}
            errors={formErrors}
            isSubmitting={isSubmitting}
            parentBulkErrors={parentBulkErrors}
            clearErrors={clearErrors}
          />
        )}
        <BackToTop />
      </div>
    </AdminLayout>
  );
}
