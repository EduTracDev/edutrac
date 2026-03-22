"use client";

import React from "react";
import { Filter, UserPlus, DownloadCloud, Search } from "lucide-react";

interface TeacherActionBarProps {
  onSearch: (query: string) => void;
  onAddClick: () => void;
}

export const TeacherActionBar = ({
  onSearch,
  onAddClick,
}: TeacherActionBarProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
      {/* 1. Local Table Filter (Specific to Teachers) */}
      <div className="relative w-full md:w-96 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#923CF9] transition-colors"
          size={18}
        />
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Filter teachers by name or ID..."
          aria-label="Filter teacher list by name or staff ID"
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
      </div>

      {/* 2. Page Specific Actions */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all border border-slate-100">
          <Filter size={18} />
          <span>Filters</span>
        </button>

        <button
          onClick={onAddClick}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#923CF9] text-white rounded-2xl text-sm font-bold hover:bg-[#7b2cd6] transition-all shadow-lg shadow-[#923CF9]/20"
        >
          <UserPlus size={18} />
          <span>Add Teacher</span>
        </button>
      </div>
    </div>
  );
};
