"use client";

import {
  ChevronRight,
  MoreHorizontal,
  UserCheck,
  UserMinus,
} from "lucide-react";

import { Teacher } from "@/modules/types/dashboard";

interface Props {
  teacher: Teacher;
  onView: () => void;
  onEdit: () => void;
}

export const TeacherMobileCard = ({ teacher, onView, onEdit }: Props) => {
  const isActive = teacher.status === "Active";

  const initials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={onView}
      className="bg-white border border-slate-100 rounded-2xl p-4 mb-3 shadow-sm cursor-pointer active:scale-[0.99] transition"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold text-xs">
          {initials}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">{teacher.name}</p>
          <p className="text-xs text-slate-400">ID: {teacher.id}</p>
        </div>
        {/* <ChevronRight size={18} className="text-slate-300" /> */}
      </div>
      <div className="mt-3 flex justify-between">
        <div>
          <p className="text-xs text-slate-400 font-bold">SUBJECT</p>
          <p className="text-sm font-semibold">{teacher.subject}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 font-bold">ROLE</p>
          <p className="text-sm font-semibold">{teacher.role}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold
${
  isActive
    ? "text-emerald-600 bg-emerald-50 border-emerald-100"
    : "text-amber-600 bg-amber-50 border-amber-100"
}`}
        >
          {isActive ? <UserCheck size={12} /> : <UserMinus size={12} />}

          {teacher.status}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 border border-slate-100 rounded-lg text-slate-400"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};
