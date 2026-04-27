"use client";

import { useState } from "react";
import { ShieldCheck, MessageSquare, CheckCircle } from "lucide-react";

interface Props {
  totalPoints: number;
  onSave: (grade: number, feedback: string) => void;
  isMobile?: boolean;
}

export const GradingFields = ({ totalPoints, onSave, isMobile }: Props) => {
  const [grade, setGrade] = useState<string>("");
  const [feedback, setFeedback] = useState("");

  const handleFinalize = () => {
    if (!grade) return alert("Please enter a grade");
    onSave(Number(grade), feedback);
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      {/* Grade Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#923CF9]">
          <ShieldCheck size={18} />
          <label className="text-[11px] font-black uppercase tracking-widest">
            Score
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="0"
            className={`w-full ${isMobile ? "p-5 text-2xl" : "p-6 text-3xl"} bg-slate-50 border border-slate-100 rounded-[24px] font-black text-slate-800 outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all`}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-black text-slate-300">
            / {totalPoints}
          </span>
        </div>
      </div>

      {/* Feedback Input */}
      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-2 text-slate-400">
          <MessageSquare size={18} />
          <label className="text-[11px] font-black uppercase tracking-widest">
            Feedback
          </label>
        </div>
        <textarea
          rows={isMobile ? 5 : 8}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Constructive feedback..."
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-[24px] text-sm font-medium text-slate-700 outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all resize-none"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleFinalize}
        className="w-full py-5 bg-[#923CF9] text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-auto"
      >
        <CheckCircle size={18} /> Finalize Grade
      </button>
    </div>
  );
};
