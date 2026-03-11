// src/modules/school-admin/components/StatCard.tsx
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string; // Tailwind color class like "text-blue-600"
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
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
        <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}
