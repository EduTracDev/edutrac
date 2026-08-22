"use client";

import React from "react";
import { MetricCard } from "@/modules/super-admin/components/MetricCard";
import { ActivityFeed } from "@/modules/super-admin/components/ActivityFeed";
import { MOCK_KPIS, MOCK_CHART_DATA, MOCK_ACTIVITIES } from "@/modules/super-admin/types/dashboard.types";

export default function SuperAdminDashboard() {
  // Calculate max revenue to scale the CSS chart properly
  const maxRevenue = Math.max(...MOCK_CHART_DATA.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-sm text-slate-500">
          Real-time metrics, revenue growth, and system health across all EduTrac tenants.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_KPIS.map((kpi) => (
          <MetricCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">SaaS Revenue Growth (2026)</h3>
            <select className="text-xs bg-white border border-slate-200 rounded p-1.5 text-slate-600 outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
              <option>All Datate</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-end">
            {/* Minimal CSS Bar Chart */}
            <div className="flex items-end justify-between h-64 gap-2">
              {MOCK_CHART_DATA.map((data, idx) => {
                const heightPercentage = (data.revenue / maxRevenue) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      ${data.revenue.toLocaleString()}
                      <br />
                      <span className="text-slate-300">{data.activeSchools} Schools</span>
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-full max-w-[48px] bg-indigo-100 hover:bg-indigo-500 transition-colors rounded-t-sm"
                      style={{ height: `${heightPercentage}%` }}
                    />
                    {/* Label */}
                    <span className="mt-3 text-xs font-bold text-slate-400 uppercase">
                      {data.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activity Feed Section */}
        <div className="lg:col-span-1 h-[400px] lg:h-auto">
          <ActivityFeed activities={MOCK_ACTIVITIES} />
        </div>
      </div>
    </div>
  );
}