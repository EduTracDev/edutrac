import React from "react";
import { Users } from "lucide-react";

interface AttendanceStatCardProps {
  present: number;
  total: number;
}

export const AttendanceStatCard = ({
  present,
  total,
}: AttendanceStatCardProps) => {
  const percentage = Math.round((present / total) * 100);
  const strokeDasharray = 251.2; // 2 * PI * 40 (radius)
  const offset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-emerald-50 rounded-xl">
          <Users className="w-5 h-5 text-emerald-600" />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Today&apos; Pulse
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-100"
            />
            {/* Progress Circle */}
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              className="text-emerald-500 transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-sm font-black text-slate-800">
            {percentage}%
          </span>
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            Attendance
          </p>
          <h3 className="text-xl font-black text-slate-900 leading-tight">
            {present.toLocaleString()}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            out of {total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-1.5">
        <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
        <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
        <div
          className={`h-1 flex-1 rounded-full ${percentage > 90 ? "bg-emerald-500" : "bg-slate-100"}`}
        />
        <div
          className={`h-1 flex-1 rounded-full ${percentage > 95 ? "bg-emerald-500" : "bg-slate-100"}`}
        />
      </div>
    </div>
  );
};
