import React, { useMemo } from "react";
import { Activity, ShieldCheck, Zap } from "lucide-react";

interface WelcomeBannerProps {
  schoolName: string;
  schoolId: string;
  registeredDate: string;
  planName: string;
}

export default function WelcomeBanner({
  schoolName = "Lincoln High",
  schoolId = "LHS-2025",
  registeredDate = "March 11, 2026",
  planName = "Premium plan",
}: WelcomeBannerProps) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 16) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden rounded-4xl bg-linear-to-br from-[#923CF9] via-[#8126e8] to-[#6d1ccf] p-8 md:p-12 text-white shadow-2xl shadow-purple-200/50"
      aria-labelledby="welcome-heading"
    >
      {/* Decorative SaaS elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        {/* Left Content */}
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-2">
              <Zap size={14} className="text-yellow-300 fill-yellow-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Dashboard Overview
              </span>
            </div>
            <h1
              id="welcome-heading"
              className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]"
            >
              {greeting},{" "}
              <span className="text-white/80 font-medium">Admin</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100/90 font-medium max-w-lg">
              Here’s what is happening at{" "}
              <span className="text-white decoration-purple-300/50">
                {schoolName}
              </span>{" "}
              today.
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 bg-white/5 pr-4 pl-2 py-2 rounded-xl border border-white/5">
              <div className="p-2 bg-[#923CF9] rounded-lg shadow-inner">
                <Activity size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                  Joined System
                </span>
                <span className="text-sm font-semibold">{registeredDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 pr-4 pl-2 py-2 rounded-xl border border-white/5">
              <div className="p-2 bg-[#923CF9] rounded-lg shadow-inner">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                  Status
                </span>
                <span className="text-sm font-semibold">{planName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: The ID Card Badge */}
        <div
          className="w-full lg:w-auto min-w-50 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center lg:text-right"
          role="region"
          aria-label="School Identification"
        >
          <span className="block text-sm font-medium text-white/80 uppercase tracking-wider mb-1">
            School ID
          </span>
          <span className="text-3xl md:text-4xl font-black tracking-tighter">
            #{schoolId}
          </span>
        </div>
      </div>
    </section>
  );
}
