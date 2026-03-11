import React from "react";
import { Activity, Grid } from "lucide-react";

interface WelcomeBannerProps {
  schoolName: string;
  schoolId: string;
  registeredDate: string;
  planName: string;
}

export default function WelcomeBanner({
  schoolName = "Lincoln High School",
  schoolId = "LHS-2025",
  registeredDate = "March 11, 2026",
  planName = "Premium plan",
}: WelcomeBannerProps) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-[#923CF9] to-[#AC6AFF] p-6 md:p-10 text-white shadow-lg"
      aria-labelledby="welcome-heading"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Content: Welcome & Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1
              id="welcome-heading"
              className="text-3xl md:text-5xl font-bold tracking-tight"
            >
              Welcome to {schoolName}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Your comprehensive school management solution is ready to go.
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 md:gap-12 pt-4 border-t border-white/20">
            <div
              className="flex items-center gap-3"
              aria-label={`Registered on ${registeredDate}`}
            >
              <div className="p-2 bg-white/10 rounded-full">
                <Activity size={20} className="text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="text-sm font-medium text-white/70">
                  Registered Date:
                </span>
                <span className="text-sm font-bold">{registeredDate}</span>
              </div>
            </div>

            <div
              className="flex items-center gap-3"
              aria-label={`License Type: ${planName}`}
            >
              <div className="p-2 bg-white/10 rounded-full">
                <Grid size={20} className="text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="text-sm font-medium text-white/70">
                  License:
                </span>
                <span className="text-sm font-bold">{planName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: School ID Card */}
        <div
          className="w-full lg:w-auto min-w-[200px] bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center lg:text-right"
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

      {/* Decorative Blur (Optional for that "SaaS" feel) */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
