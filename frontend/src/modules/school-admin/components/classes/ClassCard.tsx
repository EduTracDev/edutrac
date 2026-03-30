"use client";

import React from "react";
import Link from "next/link";
import { Users, GraduationCap, ArrowRight, BookOpen } from "lucide-react";

interface ClassCardProps {
  className: string;
  studentCount?: number;
  formTeacher?: string;
  category?: "Junior" | "Senior" | "Primary";
  onViewStudents: (className: string) => void;
}

export const ClassCard = ({
  className,
  studentCount = 0,
  formTeacher,
  category,
  onViewStudents,
}: ClassCardProps) => {
  // Simple logic to determine category if not provided
  const displayCategory =
    category || (className.startsWith("JSS") ? "Junior" : "Senior");

  return (
    <div
      onClick={() => onViewStudents(className)}
      className="cursor-pointer group bg-white border border-slate-100 p-6 rounded-[32px] ..."
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-[#923CF9]/10 rounded-2xl flex items-center justify-center text-[#923CF9]">
            <GraduationCap size={24} />
          </div>
          <div className="p-2 rounded-full bg-slate-50 text-slate-300 group-hover:text-[#923CF9] group-hover:bg-[#923CF9]/5 transition-all">
            <ArrowRight size={18} />
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-1">{className}</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          {displayCategory} Secondary Division
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 space-y-3">
        {formTeacher && (
          <div className="flex items-center gap-2 text-slate-500">
            <BookOpen size={14} className="text-[#923CF9]" />
            <span className="text-[11px] font-medium truncate">
              {formTeacher}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Users size={14} />
            <span className="text-xs font-bold">{studentCount} Students</span>
          </div>
          <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};
