// // src/modules/school-admin/components/StatCard.tsx
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  color: string;
  bgColor?: string;
  description?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor = "bg-slate-50",
  description,
}: StatCardProps) {
  return (
    <div className="group relative bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all h-full min-h-[110px]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-2xl ${bgColor} ${color} transition-transform group-hover:scale-110`}
        >
          <Icon size={20} />
        </div>
      </div>

      {/*  Hidden by default, slides up and fades in on hover */}
      {description && (
        <div className="absolute inset-x-5 bottom-4 translate-y-2 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out bg-white ">
          {description}
        </div>
      )}
    </div>
  );
}
