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
import GenderChart from "@/modules/school-admin/components/dashboard/GenderChart";
import AcademicChart from "@/modules/school-admin/components/dashboard/AcademicChart";
import RecentActivity from "@/modules/school-admin/components/dashboard/RecentActivity";
import Modal from "@/modules/school-admin/components/dashboard/Modal";
import {
  UserCheck,
  GraduationCap,
  Users,
  Layout,
  UserPlus,
  PlusSquare,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import { Metadata } from "next";
import { toast } from "react-hot-toast";

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
        <Modal title="Announcement" onClose={closeModal} isOpen={true}>
          <form className="space-y-5" onSubmit={handleAnnouncementSubmit}>
            {/* Message Title */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Announcement Title
              </label>
              <input
                name="title"
                placeholder="e.g. Mid-term Break Notice"
                className={`w-full p-3 bg-slate-50 border ${
                  formErrors.title ? "border-red-500" : "border-slate-200"
                } rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all text-slate-800 placeholder:text-slate-400`}
              />
              {formErrors.title && (
                <p className="text-red-500 text-[11px] mt-1 font-medium">
                  {formErrors.title}
                </p>
              )}
            </div>

            {/* Content Area */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Detailed Message
              </label>
              <textarea
                name="content"
                placeholder="Type your message to parents and staff here..."
                rows={5}
                className={`w-full p-3 bg-slate-50 border ${
                  formErrors.content ? "border-red-500" : "border-slate-200"
                } rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all text-slate-800 placeholder:text-slate-400 resize-none`}
              />
              {formErrors.content && (
                <p className="text-red-500 text-[11px] mt-1 font-medium">
                  {formErrors.content}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] py-4 bg-[#923CF9] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#7c28e0] active:scale-[0.95] transition-all disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Broadcast"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {activeModal === "class" && (
        <Modal title="Create Class" onClose={closeModal} isOpen={true}>
          <form className="space-y-5" onSubmit={handleClassSubmit}>
            {/* Class Name Input */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Class Name
              </label>
              <input
                name="className"
                type="text"
                placeholder="e.g. SSS 3 Emerald"
                className={`w-full p-3 bg-slate-50 border ${
                  formErrors.className ? "border-red-500" : "border-slate-100"
                } rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all`}
              />
              {formErrors.className && (
                <p className="text-red-500 text-[11px] mt-1 font-medium italic">
                  {formErrors.className}
                </p>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Section / Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  className={`w-full p-3 bg-slate-50 border ${
                    formErrors.category ? "border-red-500" : "border-slate-100"
                  } rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all`}
                >
                  <option value="">Select a section</option>
                  <option value="nursery">Nursery / Primary</option>
                  <option value="junior">Junior Secondary (JSS)</option>
                  <option value="senior">Senior Secondary (SSS)</option>
                </select>
                {/* Custom Chevron for the Select */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {formErrors.category && (
                <p className="text-red-500 text-[11px] mt-1 font-medium italic">
                  {formErrors.category}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] py-4 bg-[#923CF9] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#7c28e0] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Class"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
}
