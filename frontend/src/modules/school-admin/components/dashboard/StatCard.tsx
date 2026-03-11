// src/modules/school-admin/components/StatCard.tsx
import { LucideIcon, UserPlus } from "lucide-react";

interface StatCardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  color: string; // Tailwind color class like "text-blue-600"
  // loading?: boolean;
  // onEmptyAction?: () => void; function to trigger "add" modal
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  //  Loading State (Skeleton)
  // if (loading) {
  //   return (
  //     <div className="bg-white border border-slate-100 rounded-2xl p-6 animate-pulse">
  //       <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4" />
  //       <div className="h-4 bg-slate-100 rounded w-1/2 mb-2" />
  //       <div className="h-8 bg-slate-100 rounded w-3/4" />
  //     </div>
  //   );
  // }
  // const isEmpty = value === "0" || value === 0;
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-opacity-10 ${color.replace("text", "bg")}`}
        >
          <Icon className={color} size={24} />
        </div>
        {/* Placeholder for a trend sparkline or % if you want to add later */}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        {/* {isEmpty ? (
          <button
            onClick={onEmptyAction}
            className="mt-2 flex items-center gap-1 text-[#923CF9] font-bold text-sm hover:underline"
          >
            <UserPlus size={14} /> Get Started: Add first{" "}
            {title.toLowerCase().slice(0, -1)}
          </button>
        ) : (
          <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
        )} */}
        <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}
