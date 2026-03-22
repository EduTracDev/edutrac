"use client";

import { MoreHorizontal, UserCheck, UserMinus } from "lucide-react";

import { Teacher } from "@/modules/types/dashboard";

interface Props {
  teacher: Teacher;
  onView: () => void;
  onEdit: () => void;
}

export const TeacherTableRow = ({ teacher, onView, onEdit }: Props) => {
  const isActive = teacher.status === "Active";

  const initials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <tr
      onClick={onView}
      className="hover:bg-slate-50 transition cursor-pointer"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold">
            {initials}
          </div>

          <div>
            <p className="text-sm font-bold">{teacher.name}</p>

            <p className="text-xs text-slate-400">ID: {teacher.id}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-semibold">{teacher.subject}</p>

        <p className="text-xs text-[#923CF9] font-bold uppercase">
          {teacher.role}
        </p>
      </td>

      <td className="px-6 py-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold w-fit
${
  isActive
    ? "text-emerald-600 bg-emerald-50 border-emerald-100"
    : "text-amber-600 bg-amber-50 border-amber-100"
}`}
        >
          {isActive ? <UserCheck size={14} /> : <UserMinus size={14} />}

          {teacher.status}
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#923CF9]"
        >
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
};
