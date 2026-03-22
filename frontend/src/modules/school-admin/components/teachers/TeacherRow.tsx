"use client";

import React from "react";
import { MoreHorizontal, UserCheck, UserMinus } from "lucide-react";
import { Teacher } from "@/modules/types/dashboard";

interface TeacherRowProps {
  teacher: Teacher; // ✅ Strictly typed
  onEdit: () => void;
  onView: () => void;
}

export const TeacherRow = ({ teacher, onEdit, onView }: TeacherRowProps) => {
  const isActive = teacher.status === "Active";

  return (
    <tr className="group hover:bg-slate-50/80 transition-all duration-200">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-[#923CF9]/10 border border-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-black text-sm">
            {/* Safe string manipulation */}
            {teacher.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900">
              {teacher.name}
            </span>
            <span className="text-[11px] font-bold text-slate-400 mt-0.5">
              ID: {teacher.id}
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-700">
            {teacher.subject}
          </span>
          <span className="text-[10px] font-black text-[#923CF9] uppercase opacity-70 italic">
            {teacher.role}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="px-3 py-1 bg-slate-100 rounded-lg w-fit text-[11px] font-black text-slate-600">
          {teacher.assignedClass}
        </div>
      </td>

      <td className="px-6 py-4">
        <div
          className={`flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full border ${
            isActive
              ? "text-emerald-600 bg-emerald-50 border-emerald-100"
              : "text-amber-600 bg-amber-50 border-amber-100"
          }`}
        >
          {isActive ? <UserCheck size={12} /> : <UserMinus size={12} />}
          <span className="text-[10px] font-black uppercase">
            {teacher.status}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={onView}
          className="p-2.5 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-2xl text-slate-400 hover:text-[#923CF9] transition-all"
          aria-label={`View details for ${teacher.name}`}
        >
          <MoreHorizontal size={20} />
        </button>
      </td>
    </tr>
  );
};
