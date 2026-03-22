"use client";

import React from "react";
import {
  MoreHorizontal,
  UserCheck,
  UserMinus,
  ChevronRight,
} from "lucide-react";
import { Teacher } from "@/modules/types/dashboard";

interface TeacherRowProps {
  teacher: Teacher;
  onView: () => void;
  onEdit: () => void; // Now we will use this
}

export const TeacherRow = ({ teacher, onView, onEdit }: TeacherRowProps) => {
  const isActive = teacher.status === "Active";

  return (
    <tr
      className="group hover:bg-slate-50/80 transition-all duration-200 cursor-pointer md:table-row flex flex-col md:flex-none p-5 md:p-0 border-b md:border-b-0 border-slate-50 relative"
      onClick={onView}
    >
      {/* 1. Instructor Column */}
      <td className="px-0 md:px-6 py-1 md:py-4 block md:table-cell">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-10 w-10 md:h-11 md:w-11 rounded-2xl bg-[#923CF9]/10 border border-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-black text-xs md:text-sm shrink-0">
            {teacher.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black text-slate-900 truncate group-hover:text-[#923CF9] transition-colors">
              {teacher.name}
            </span>
            <span className="text-[10px] md:text-[11px] font-bold text-slate-400">
              ID: {teacher.id}
            </span>
          </div>
        </div>
      </td>

      {/* 2. Subject & Role */}
      <td className="px-0 md:px-6 py-1 md:py-4 mt-1 md:mt-0 block md:table-cell">
        <div className="flex flex-wrap md:flex-col items-center md:items-start gap-2 md:gap-1">
          <span className="text-xs font-bold text-slate-700">
            {teacher.subject}
          </span>
          <span className="hidden md:inline text-[10px] font-black text-[#923CF9] uppercase opacity-70 tracking-tight">
            {teacher.role}
          </span>
          <span className="md:hidden text-slate-300 text-[10px]">•</span>
          <span className="md:hidden text-[11px] font-bold text-slate-400">
            {teacher.role}
          </span>
        </div>
      </td>

      {/* 3. Status */}
      <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell">
        <div
          className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full border ${
            isActive
              ? "text-emerald-600 bg-emerald-50 border-emerald-100"
              : "text-amber-600 bg-amber-50 border-amber-100"
          }`}
        >
          {isActive ? <UserCheck size={10} /> : <UserMinus size={10} />}
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider">
            {teacher.status}
          </span>
        </div>
      </td>

      {/* 4. Actions (Desktop) - Using onEdit here */}
      <td className="hidden md:table-cell px-6 py-4 text-right">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering onView
            onEdit();
          }}
          className="p-2.5 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-2xl text-slate-400 hover:text-[#923CF9] transition-all"
        >
          <MoreHorizontal size={20} />
        </button>
      </td>

      {/* 5. Mobile Chevron */}
      <td className="md:hidden absolute right-5 top-1/2 -translate-y-1/2 p-0 border-none pointer-events-none">
        <ChevronRight size={18} className="text-slate-300" />
      </td>
    </tr>
  );
};
