"use client";
import { useMemo } from "react";
import { Info, CheckCircle2, FileUp } from "lucide-react";
import { Student } from "@/modules/types/dashboard";

interface ScoreSet {
  ca1: string;
  ca2: string;
  exam: string;
}

interface ResultsStatsProps {
  students: Student[];
  allScores: Record<string, ScoreSet>;
}

export const ResultsStats = ({ students, allScores }: ResultsStatsProps) => {
  const stats = useMemo(() => {
    const currentStudentIds = students.map((s) => s.id);

    const scoresInView = currentStudentIds
      .map((id) => {
        const s = allScores[id] || { ca1: "0", ca2: "0", exam: "0" };
        return Number(s.ca1) + Number(s.ca2) + Number(s.exam);
      })
      .filter((total) => total > 0);

    const average = scoresInView.length
      ? (scoresInView.reduce((a, b) => a + b, 0) / scoresInView.length).toFixed(
          1,
        )
      : "0";

    const passCount = scoresInView.filter((s) => s >= 40).length;

    return {
      average,
      passCount,
      totalEntered: scoresInView.length,
      percentageEntered: Math.round(
        (scoresInView.length / (students.length || 1)) * 100,
      ),
    };
  }, [allScores, students]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        label="Class Average"
        value={`${stats.average}%`}
        icon={<Info size={24} />}
        bgColor="bg-purple-50"
        textColor="text-[#923CF9]"
      />
      <StatCard
        label="Pass Rate"
        value={`${stats.passCount} / ${students.length}`}
        icon={<CheckCircle2 size={24} />}
        bgColor="bg-emerald-50"
        textColor="text-emerald-500"
      />
      <StatCard
        label="Entry Progress"
        value={`${stats.percentageEntered}%`}
        icon={<FileUp size={24} />}
        bgColor="bg-blue-50"
        textColor="text-blue-500"
      />
    </div>
  );
};

// Internal helper for clean UI
const StatCard = ({ label, value, icon, bgColor, textColor }: any) => (
  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className={`text-3xl font-black ${textColor}`}>{value}</p>
    </div>
    <div
      className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center ${textColor}`}
    >
      {icon}
    </div>
  </div>
);
