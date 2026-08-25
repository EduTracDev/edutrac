"use client";

import React from "react";
import { ActivityLog } from "../types/dashboard.types";

export function ActivityFeed({ activities }: { activities: ActivityLog[] }) {
  const getStatusColor = (status: ActivityLog["status"]) => {
    switch (status) {
      case "success": return "bg-emerald-100 text-emerald-600";
      case "warning": return "bg-amber-100 text-amber-600";
      case "danger": return "bg-red-100 text-red-600";
      case "info":
      default: return "bg-indigo-100 text-indigo-600";
    }
  };

  const getIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "onboarding": return "🏢";
      case "subscription": return "💳";
      case "alert": return "⚠️";
      case "system": return "⚙️";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-200 bg-slate-50">
        <h3 className="text-sm font-bold text-slate-900">Platform Activity</h3>
      </div>
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4 relative">
              {/* Timeline connecting line */}
              {index !== activities.length - 1 && (
                <div className="absolute top-8 left-4 bottom-[-24px] w-0.5 bg-slate-100" />
              )}
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${getStatusColor(activity.status)}`}>
                <span className="text-xs">{getIcon(activity.type)}</span>
              </div>
              
              <div className="flex-1 pb-1">
                <p className="text-sm font-semibold text-slate-800">{activity.message}</p>
                <div className="flex justify-between mt-1 items-center">
                  <span className="text-xs font-medium text-slate-500">{activity.entityName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
          View All Audit Logs →
        </button>
      </div>
    </div>
  );
}