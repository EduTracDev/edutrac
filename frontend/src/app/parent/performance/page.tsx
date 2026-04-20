"use client";

import { useWard } from "@/modules/context/WardContext";
import { SubjectCard } from "@/modules/parent/components/performance/SubjectCard";
import { EmptyState } from "@/modules/shared/EmptyState";
import { BarChart3, Info } from "lucide-react";

export default function PerformancePage() {
  const { activeWard } = useWard();

  const scores = [
    { subject: "Mathematics", score: 88, previousScore: 82, grade: "A" },
    { subject: "Physics", score: 74, previousScore: 78, grade: "B" },
    { subject: "English", score: 92, previousScore: 90, grade: "A+" },
    { subject: "Chemistry", score: 65, previousScore: 60, grade: "C" },
  ];

  if (!activeWard) return null;

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            Academic Analytics
          </h1>
          <p className="text-slate-400 font-medium">
            Tracking growth and proficiency for{" "}
            <span className="text-[#923CF9] font-bold">{activeWard.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl">
          <Info size={16} className="text-amber-600" />
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">
            Mid-Term Report Available
          </span>
        </div>
      </header>

      {/* Performance Grid */}
      {scores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scores.map((item) => (
            <SubjectCard key={item.subject} {...item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BarChart3}
          title="No data yet"
          description="Grades and analytics will appear here once the term examinations begin."
        />
      )}
    </div>
  );
}
