import React, { useState } from "react";
import { AlertCircle, Edit3, SendHorizontal } from "lucide-react";
import EditResultModal, { FlaggedResult } from "./EditResultModal";

const flaggedData: FlaggedResult[] = [
  {
    id: "res-001",
    studentName: "Adewale Ciroma",
    subject: "Mathematics",
    currentGrade: "F",
    reason: "Incorrect CA1 entry. Please verify the script.",
    date: "2 hours ago",
    scores: { ca1: 5, ca2: 10, exam: 20 },
  },
  {
    id: "res-004",
    studentName: "Blessing Okon",
    subject: "Mathematics",
    currentGrade: "B",
    reason: "Missing mid-term exam score.",
    date: "Yesterday",
    scores: { ca1: 15, ca2: 15, exam: 40 },
  },
];

export default function FlaggedResults() {
  const [selectedResult, setSelectedResult] = useState<FlaggedResult | null>(
    null,
  );
  return (
    <div className="space-y-4">
      {flaggedData.map((item) => (
        <div
          key={item.id}
          className="group p-5 rounded-3xl border border-red-100 bg-red-50/30 hover:bg-white hover:border-red-200 transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-100 text-red-600 rounded-2xl">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-sm">
                  {item.studentName}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  {item.subject} • {item.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white border border-red-100 rounded-full text-[10px] font-black text-red-600 uppercase">
                Grade: {item.currentGrade}
              </span>
            </div>
          </div>

          {/* Admin's Comment Box */}
          <div className="mt-4 p-3 bg-white rounded-2xl border border-red-100/50 text-xs text-slate-600 italic leading-relaxed">
            <span className="font-bold text-red-500 not-italic mr-1">
              Admin:
            </span>
            `&quot;{item.reason}&quot;`
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setSelectedResult(item)}
              className="flex items-center gap-2 px-4 py-2 text-[11px] font-black text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Edit3 size={14} />
              Correct Entry
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#923CF9] text-white text-[11px] font-black rounded-xl hover:bg-[#8126e8] shadow-lg shadow-purple-200">
              <SendHorizontal size={14} />
              Resubmit
            </button>
          </div>
        </div>
      ))}
      <EditResultModal
        isOpen={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        result={selectedResult}
      />
    </div>
  );
}
