// // src/modules/school-admin/components/StatCard.tsx
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  color: string; // e.g., "text-[#923CF9]"
  bgColor?: string; // e.g., "bg-[#923CF9]/10"
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor = "bg-slate-50", // Default fallback
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-4xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${bgColor}`}>
          <Icon className={color} size={24} />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-900 mt-1">
          {value ?? "0"}
        </h3>
      </div>
    </div>
  );
}
