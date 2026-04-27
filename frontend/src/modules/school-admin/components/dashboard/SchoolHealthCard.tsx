import React from "react";

interface SchoolHealthCardProps {
  finance: number;
  attendance: number;
  academic: number;
  admissions: number;
}

export const SchoolHealthCard = ({
  finance,
  attendance,
  academic,
  admissions,
}: SchoolHealthCardProps) => {
  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-1">
        School Health Index
      </h3>

      <div className="space-y-6">
        <HealthMetric label="Financial Health" value={finance} />
        <HealthMetric label="Attendance" value={attendance} />
        <HealthMetric label="Academic Performance" value={academic} />
        <HealthMetric label="Admissions" value={admissions} />
      </div>
    </div>
  );
};

// Helper Component with Color Logic
const HealthMetric = ({ label, value }: { label: string; value: number }) => {
  // Logic: Red for Danger, Orange for Warning, Emerald for Healthy
  const getStatusColor = (val: number) => {
    if (val < 50) return "bg-red-500 shadow-red-100";
    if (val < 75) return "bg-orange-500 shadow-orange-100";
    return "bg-emerald-500 shadow-emerald-100";
  };

  const getTextColor = (val: number) => {
    if (val < 50) return "text-red-600";
    if (val < 75) return "text-orange-600";
    return "text-emerald-600";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[11px] font-bold">
        <span className="text-slate-500 uppercase tracking-tight">{label}</span>
        <span className={getTextColor(value)}>{value}%</span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-[2px]">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${getStatusColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
