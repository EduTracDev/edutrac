import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const AttendanceStats = () => {
  const stats = [
    {
      label: "Attendance",
      value: "98%",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Late Entries",
      value: "2",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Absent",
      value: "1",
      icon: AlertTriangle,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-6 bg-white border border-slate-100 rounded-[32px] flex items-center gap-4"
        >
          <div
            className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}
          >
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <p className="text-xl font-black text-slate-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
