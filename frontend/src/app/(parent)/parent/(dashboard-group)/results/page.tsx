"use client";

import { useWard } from "@/modules/context/WardContext";
import { PerformanceHeader } from "@/modules/parent/components/results/PerformanceHeader";
import { ResultsTable } from "@/modules/parent/components/results/ResultsTable";

export default function ResultsPage() {
  const { activeWard } = useWard();

  if (!activeWard) return null;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            Academic Results
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            Performance records for{" "}
            <span className="text-[#923CF9] font-bold">{activeWard.name}</span>.
          </p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 focus:outline-none">
            <option>2025/2026 Academic Year</option>
          </select>
          <select className="bg-white border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 focus:outline-none">
            <option>Term 3 (Final)</option>
            <option>Term 2</option>
            <option>Term 1</option>
          </select>
        </div>
      </header>

      <PerformanceHeader avg="88.4%" position="2nd" />
      <ResultsTable />
    </div>
  );
}
