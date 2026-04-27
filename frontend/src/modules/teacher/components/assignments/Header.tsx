"use client";

import { X } from "lucide-react";

interface HeaderProps {
  studentName: string;
  onClose: () => void;
  submissionDate?: string;
}

export const Header = ({
  studentName,
  onClose,
  submissionDate,
}: HeaderProps) => {
  return (
    <div className="flex justify-between items-start w-full">
      <div>
        <h2 className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight">
          {studentName}
        </h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#923CF9]" />
          {submissionDate
            ? `Submitted ${submissionDate}`
            : "Reviewing Submission"}
        </p>
      </div>

      <button
        onClick={onClose}
        className="group p-2 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all duration-300"
        aria-label="Close review"
      >
        <X
          size={20}
          className="text-slate-400 group-hover:text-slate-600 group-hover:rotate-90 transition-all duration-300"
        />
      </button>
    </div>
  );
};
