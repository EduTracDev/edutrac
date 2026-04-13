"use client";
import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import TeacherWelcomeBanner from "@/modules/teacher/components/dashboard/TeacherWelcomeBanner";
import TimetableList from "@/modules/teacher/components/dashboard/TimetableList";
import FlaggedResults from "@/modules/teacher/components/dashboard/FlaggedResults";
import QuickActions from "@/modules/teacher/components/dashboard/QuickActions";
import { Megaphone } from "lucide-react";

export default function Page() {
  // In a real app, these come from your Auth/User hook
  const teacherData = {
    name: "Thompson",
    subject: "Mathematics",
    nextClass: "09:00 AM",
    room: "JSS 3 Gold",
  };
  return (
    <TeacherLayout>
      <div className="space-y-8">
        {/* 1. The Banner Section */}
        <TeacherWelcomeBanner
          teacherName={teacherData.name}
          subject={teacherData.subject}
          nextClassTime={teacherData.nextClass}
          nextClassRoom={teacherData.room}
        />

        {/* 2. The Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timetable  */}
            <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-800">
                    Daily Schedule
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Monday, April 13, 2026
                  </p>
                </div>
                <button className="text-xs font-bold text-[#923CF9] hover:underline">
                  View Full Week
                </button>
              </div>

              <TimetableList />
            </section>
            {/* Flagged Results Section */}
            <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black text-slate-800 italic">
                  Action Required
                </h2>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                  2
                </span>
              </div>
              <FlaggedResults />
            </section>
          </div>

          {/* Sidebar Column (1/3 width) */}
          <aside className="space-y-8">
            <QuickActions />

            {/* Reusable Announcement Card */}
            <div className="p-6 bg-[#923CF9] rounded-[32px] text-white shadow-xl shadow-purple-200/50">
              <h3 className="font-black text-sm mb-2 flex items-center gap-2">
                <Megaphone size={16} />
                School Notice
              </h3>
              <p className="text-xs text-purple-100 leading-relaxed font-medium">
                Mid-term break starts on Monday. Ensure all results are uploaded
                by Friday COB.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </TeacherLayout>
  );
}
