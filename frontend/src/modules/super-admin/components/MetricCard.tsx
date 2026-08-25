"use client";

import React from "react";
import { SystemKPI } from "../types/dashboard.types";

export function MetricCard({ kpi }: { kpi: SystemKPI }) {
  const isPositiveTrend = kpi.trend === "up";
  const isErrorRate = kpi.label.includes("Error");
  
  // Downward trend on errors is structurally a positive outcome
  const isGood = isErrorRate ? !isPositiveTrend : isPositiveTrend;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <p className="text-sm font-semibold text-slate-500">{kpi.label}</p>
      
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl font-extrabold text-slate-900">{kpi.value}</span>
        <div className="text-right">
          <div
            className={`flex items-center gap-1 text-xs font-bold ${
              isGood ? "text-emerald-600" : "text-red-600"
            }`}
          >
            <span>{isPositiveTrend ? "↑" : "↓"}</span>
            <span>{kpi.changeValue}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">{kpi.timeframe}</span>
        </div>
      </div>
    </div>
  );
}