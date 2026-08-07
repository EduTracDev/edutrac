"use client";

import { Trophy, Calendar, Users, Clock } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { AssignmentFormData } from "@/utils/validation";

interface SidebarProps {
  register: UseFormRegister<AssignmentFormData>;
  availableClasses: string[];
}

export const AssignmentSidebar = ({
  register,
  availableClasses,
}: SidebarProps) => {
  return (
    <aside className="space-y-6 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 h-fit">
      {/* 1. Grading Section */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Trophy size={14} className="text-amber-500" /> Max Points
        </label>
        <div className="relative">
          <input
            {...register("points")}
            type="number"
            className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-slate-700 outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
            PTS
          </span>
        </div>
      </div>

      {/* 2. Target Class Selection */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Users size={14} className="text-blue-500" /> Target Class
        </label>
        <select
          {...register("targetClass")}
          className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#923CF9]/20 cursor-pointer"
        >
          <option value="">Select Class</option>
          {availableClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Deadline Logic */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Calendar size={14} className="text-[#923CF9]" /> Submission Deadline
        </label>
        <div className="space-y-2">
          <input
            {...register("dueDate")}
            type="date"
            className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#923CF9]/20"
          />
          <div className="relative">
            <Clock
              size={12}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
            />
            <input
              {...register("dueTime")}
              type="time"
              className="w-full p-3 pl-8 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#923CF9]/20"
            />
          </div>
        </div>
      </div>

      {/* 4. Submission Rules */}
      <div className="pt-4 border-t border-slate-200">
        <label className="relative flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              {...register("allowLateSubmission")}
              id="late"
              className="peer sr-only"
            />
            {/* Custom Toggle Switch UI */}
            <div className="w-10 h-5 bg-slate-200 rounded-full peer-checked:bg-[#923CF9] transition-colors" />
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
            Allow late submissions
          </span>
        </label>
      </div>
    </aside>
  );
};
