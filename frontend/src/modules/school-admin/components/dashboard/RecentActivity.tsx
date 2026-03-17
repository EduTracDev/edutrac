import React from "react";
import { CreditCard, UserPlus, BookOpen } from "lucide-react";
import { ActivityItem } from "@/modules/types/dashboard";

const iconMap = {
  payment: { icon: CreditCard, color: "bg-emerald-100 text-emerald-600" },
  admission: { icon: UserPlus, color: "bg-blue-100 text-blue-600" },
  academic: { icon: BookOpen, color: "bg-amber-100 text-amber-600" },
};

export default function RecentActivity({
  activities,
}: {
  activities: ActivityItem[];
}) {
  return (
    // Removed h-full and added overflow-hidden to keep the rounded corners sharp
    <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden flex flex-col">
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between p-6 lg:p-8 pb-4">
        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
        <button className="text-sm font-semibold text-[#923CF9] hover:underline">
          View All
        </button>
      </div>

      {/* Scrollable Container - Set a max-height (e.g., 400px to 500px) */}
      <div className="px-6 lg:px-8 pb-6 overflow-y-auto max-h-[480px] scrollbar-hide hover:scrollbar-default transition-all">
        <div className="space-y-8">
          {activities.map((item, index) => {
            const config =
              iconMap[item.type as keyof typeof iconMap] || iconMap.academic;
            const { icon: Icon, color } = config;

            return (
              <div key={item.id} className="flex gap-4 relative group">
                {/* Timeline Line (Optional SaaS Detail) */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-6 top-12 w-[1px] h-[calc(100%+8px)] bg-slate-50" />
                )}

                {/* The Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 ${color}`}
                >
                  <Icon size={20} />
                </div>

                {/* The Text Content */}
                <div className="flex-1 border-b border-slate-50 pb-4 group-last:border-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-800 leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap ml-2 bg-slate-50 px-2 py-1 rounded-md">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
