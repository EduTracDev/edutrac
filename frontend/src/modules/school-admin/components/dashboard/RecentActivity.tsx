import React from "react";
import { CreditCard, UserPlus, BookOpen } from "lucide-react";
import { ActivityItem } from "@/app/school-admin/dashboard/page";

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
    <div className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
        <button className="text-sm font-semibold text-[#923CF9] hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-8">
        {activities.map((item) => {
          const { icon: Icon, color } = iconMap[item.type];
          return (
            <div key={item.id} className="flex gap-4 relative">
              {/* The Icon Circle */}
              <div
                className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${color}`}
              >
                <Icon size={20} />
              </div>

              {/* The Text Content */}
              <div className="flex-1 border-b border-slate-50 pb-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap ml-2">
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
  );
}
