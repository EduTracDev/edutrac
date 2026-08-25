"use client";

import React from "react";

interface SchoolSubscription {
  id: string;
  schoolName: string;
  planName: string;
  billingCycle: string;
  studentCount: number;
  maxStudents: number;
  currentPeriodEnd: string;
  status: string;
}

interface SubscriptionsTableProps {
  subscriptions: SchoolSubscription[];
  onChangePlanClick: (sub: SchoolSubscription) => void;
}

export function SubscriptionsTable({ subscriptions, onChangePlanClick }: SubscriptionsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-900">Active School Subscriptions</h3>
        <span className="text-xs text-slate-500">{subscriptions.length} Total Registered Accounts</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">School Name</th>
              <th className="p-3">Current Plan</th>
              <th className="p-3">Billing Cycle</th>
              <th className="p-3">Student Usage</th>
              <th className="p-3">Renewal Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {subscriptions.map((sub) => {
              const usagePercent = Math.round((sub.studentCount / sub.maxStudents) * 100);

              return (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">{sub.schoolName}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-800">
                      {sub.planName}
                    </span>
                  </td>
                  <td className="p-3">{sub.billingCycle}</td>
                  <td className="p-3 w-48">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>{sub.studentCount} / {sub.maxStudents}</span>
                        <span>{usagePercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            usagePercent > 90 ? "bg-red-500" : usagePercent > 75 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(usagePercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{sub.currentPeriodEnd}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        sub.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : sub.status === "Past Due"
                          ? "bg-red-100 text-red-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onChangePlanClick(sub)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Override Tier
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}