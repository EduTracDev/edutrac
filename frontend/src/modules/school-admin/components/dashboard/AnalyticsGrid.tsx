import React from "react";

interface AnalyticsGridProps {
  children: React.ReactNode;
}

export default function AnalyticsGrid({ children }: AnalyticsGridProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          School Performance Insights
        </h2>
        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          Updated: Just now
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {children}
      </div>
    </section>
  );
}
