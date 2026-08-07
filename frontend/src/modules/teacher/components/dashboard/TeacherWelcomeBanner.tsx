import React, { useMemo } from "react";
import { Activity, BookOpen, Calendar, Zap } from "lucide-react";

interface TeacherWelcomeProps {
  teacherName: string;
  subject?: string;
  nextClassTime?: string;
  nextClassRoom?: string;
}

export default function TeacherWelcomeBanner({
  teacherName = "Thompson",
  subject = "Mathematics",
  nextClassTime = "09:00 AM",
  nextClassRoom = "JSS 3 Gold",
}: TeacherWelcomeProps) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 16) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden rounded-4xl bg-linear-to-br from-[#923CF9] via-[#8126e8] to-[#6d1ccf] p-8 md:p-12 text-white shadow-2xl shadow-purple-200/50"
      aria-labelledby="teacher-welcome-heading"
    >
      {/* Decorative SaaS elements (Kept consistent with Admin) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
        {/* Left Content */}
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-2">
              <Zap size={14} className="text-yellow-300 fill-yellow-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Teacher Portal
              </span>
            </div>
            <h1
              id="teacher-welcome-heading"
              className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]"
            >
              {greeting},{" "}
              <span className="text-white/80 font-medium">
                Mr. {teacherName}
              </span>
            </h1>
            <p className="text-lg text-purple-100/90 font-medium">
              Ready for your <span className="text-white">{subject}</span>{" "}
              sessions today?
            </p>
          </div>

          {/* Teacher Specific Metadata */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="flex items-center gap-3 bg-white/5 pr-4 pl-2 py-2 rounded-xl border border-white/5">
              <div className="p-2 bg-white/10 rounded-lg">
                <Calendar size={18} className="text-purple-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                  Next Period
                </span>
                <span className="text-sm font-semibold">{nextClassTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 pr-4 pl-2 py-2 rounded-xl border border-white/5">
              <div className="p-2 bg-white/10 rounded-lg">
                <BookOpen size={18} className="text-purple-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                  Classroom
                </span>
                <span className="text-sm font-semibold">{nextClassRoom}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: Attendance/Activity Quick View */}
        <div
          className="w-full lg:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 px-10 flex items-center gap-6"
          role="region"
          aria-label="Daily Progress"
        >
          <div className="text-center lg:text-right">
            <span className="block text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">
              Today's Attendance
            </span>
            <span className="text-4xl font-black tracking-tighter">92%</span>
          </div>
          <div className="h-12 w-[1px] bg-white/20 hidden md:block" />
          <div className="p-3 bg-emerald-400/20 rounded-2xl border border-emerald-400/30">
            <Activity size={24} className="text-emerald-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
