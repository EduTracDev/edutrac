import { TrendingUp, Award, AlertCircle, CheckCircle } from "lucide-react";

interface StatsProps {
  average: number;
  highest: number;
  lowest: number;
  pendingCount: number;
}

export const ClassStatsHeader = ({
  average,
  highest,
  lowest,
  pendingCount,
}: StatsProps) => {
  const stats = [
    {
      label: "Class Average",
      value: `${average}%`,
      icon: TrendingUp,
      color: "text-[#923CF9]",
      bg: "bg-[#923CF9]/5",
    },
    {
      label: "Highest Score",
      value: highest,
      icon: Award,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Lowest Score",
      value: lowest,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "To Approve",
      value: pendingCount,
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4"
        >
          <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
            <stat.icon size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">
              {stat.label}
            </p>
            <p className="text-xl font-black text-slate-800 leading-none">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
