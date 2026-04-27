// src/modules/school-admin/components/dashboard/AdmissionsStatCard.tsx
import React from "react";
import { UserPlus, ArrowRight } from "lucide-react";

interface AdmissionsStatCardProps {
  pending: number;
  interviews: number;
  target: number;
}

export const AdmissionsStatCard = ({
  pending,
  interviews,
  target,
}: AdmissionsStatCardProps) => {
  // Calculate progress toward the school's enrollment target
  const progress = Math.min(
    Math.round(((pending + interviews) / target) * 100),
    100,
  );

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 rounded-2xl">
          <UserPlus className="w-6 h-6 text-blue-600" />
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">
            New Intake
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Admissions
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">
              {pending + interviews}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              Applications
            </span>
          </div>
        </div>

        {/* The Funnel Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>{" "}
              Pending Review
            </span>
            <span className="font-bold text-slate-700">{pending}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{" "}
              Interviews/Exams
            </span>
            <span className="font-bold text-slate-700">{interviews}</span>
          </div>
        </div>

        {/* Progress toward enrollment target */}
        <div className="pt-2">
          <div className="flex justify-between text-[10px] mb-1 font-bold uppercase tracking-tighter">
            <span className="text-slate-400">Target: {target}</span>
            <span className="text-blue-600">{progress}% Met</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
