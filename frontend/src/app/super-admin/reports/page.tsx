"use client";

import React, { useState } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import {
  Users,
  School,
  Activity,
  Download,
  Calendar,
  BarChart2,
  PieChart,
  ArrowUpRight,
} from "lucide-react";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Reports & Analytics
            </h1>
            <p className="text-sm text-slate-500">
              Platform wide telemetry, tenant growth metrics, user active
              sessions, and usage adoption.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
              <Calendar size={14} className="text-slate-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent outline-none cursor-pointer"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">This Year (2026)</option>
              </select>
            </div>
            <button
              onClick={() => alert("Generating full PDF analytics report...")}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-sm font-semibold rounded-xl shadow-md hover:bg-brand/90 transition-all"
            >
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <School size={20} />
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight size={14} /> +12% MoM
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Tenant Retention
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">96.4%</h3>
              <p className="text-xs text-slate-500 mt-1">
                Low churn rate across Enterprise & Pro tiers.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-brand/10 text-brand rounded-xl">
                <Users size={20} />
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight size={14} /> +24.8% MoM
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Daily Active Users (DAU)
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                42,890
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Peak traffic between 09:00 AM - 02:00 PM WAT.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Activity size={20} />
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight size={14} /> 99.98%
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Platform Uptime
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                99.98%
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Average response latency: 142ms.
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Charts & Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Trends Visual Placeholder */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Tenant Acquisition & Churn
                </h3>
                <p className="text-xs text-slate-500">
                  Monthly new school onboardings vs cancellations
                </p>
              </div>
              <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                <BarChart2 size={18} />
              </div>
            </div>

            {/* Graphical Representation */}
            <div className="h-64 bg-slate-50/70 rounded-xl border border-dashed border-slate-200 flex flex-col justify-end p-4 gap-2">
              <div className="flex items-end justify-between h-48 px-4 gap-3">
                {[
                  { month: "Mar", value: "40%" },
                  { month: "Apr", value: "55%" },
                  { month: "May", value: "70%" },
                  { month: "Jun", value: "65%" },
                  { month: "Jul", value: "85%" },
                  { month: "Aug", value: "100%" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      style={{ height: item.value }}
                      className="w-full bg-brand/80 rounded-t-lg transition-all hover:bg-brand"
                    />
                    <span className="text-[10px] font-bold text-slate-400">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Usage Distribution Visual Placeholder */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Feature Utilization Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Most actively used modules by teachers & admins
                </p>
              </div>
              <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                <PieChart size={18} />
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Result Entry & Grading",
                  percentage: 42,
                  color: "bg-brand",
                },
                {
                  name: "Attendance Tracking",
                  percentage: 28,
                  color: "bg-indigo-500",
                },
                {
                  name: "Assignments & Submissions",
                  percentage: 18,
                  color: "bg-emerald-500",
                },
                {
                  name: "Fee Management & Receipts",
                  percentage: 12,
                  color: "bg-amber-500",
                },
              ].map((feature, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{feature.name}</span>
                    <span className="font-bold">{feature.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${feature.percentage}%` }}
                      className={`h-full ${feature.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
