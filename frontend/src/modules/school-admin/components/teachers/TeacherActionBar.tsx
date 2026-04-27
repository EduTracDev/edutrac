"use client";

import React, { useState } from "react";
import { Filter, UserPlus, Search } from "lucide-react";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { AccountStatus, EmploymentStatus } from "@/modules/types/dashboard";

interface TeacherActionBarProps {
  onSearch: (query: string) => void;

  activeFilters: {
    account: AccountStatus | "All";
    employment: EmploymentStatus | "All";
  };
  onFilterChange: (type: "account" | "employment", value: string) => void;
  onClearFilters: () => void;
}

export const TeacherActionBar = ({
  onSearch,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: TeacherActionBarProps) => {
  const { openModal } = useModals();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Helper to check if any filter is active (to show a badge or clear button)
  const hasActiveFilters =
    activeFilters.account !== "All" || activeFilters.employment !== "All";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
      {/* 1. Search Input */}
      <div className="relative w-full md:w-96 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#923CF9] transition-colors"
          size={18}
        />
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Filter teachers by name or ID..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto relative">
        {/* 2. Filter Button & Dropdown */}
        <div className="relative flex-1 md:flex-none">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all border 
              ${
                hasActiveFilters
                  ? "bg-[#923CF9]/5 border-[#923CF9] text-[#923CF9]"
                  : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
              }`}
          >
            <Filter size={18} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#923CF9] text-[10px] text-white">
                !
              </span>
            )}
          </button>

          {/* 🚀 The Filter Dropdown */}
          {isFilterOpen && (
            <>
              {/* Overlay - now uses a darker backdrop for mobile focus */}
              <div
                className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
                onClick={() => setIsFilterOpen(false)}
              />

              <div
                className="
      /* Mobile Styles: Centered or Bottom-fixed */
      fixed inset-x-4 top-[20%] z-50 
      /* Desktop Styles: Absolute and aligned to button */
      md:absolute md:inset-auto md:right-0 md:top-14 
      
      w-auto md:w-72 
      bg-white rounded-3xl md:rounded-2xl 
      border border-slate-100 shadow-2xl p-6 
      animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200
    "
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-[12px] uppercase tracking-widest text-slate-400">
                    Advanced Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={onClearFilters}
                      className="text-xs font-bold text-[#923CF9] hover:underline px-2 py-1 bg-[#923CF9]/5 rounded-lg"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                {/* Account Status Filter Group */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-black text-slate-700 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#923CF9]" />
                    Account Status
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["All", "Joined", "Pending", "Expired"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => onFilterChange("account", opt)}
                        className={`px-3 py-2.5 rounded-xl text-[11px] font-bold border transition-all
                ${
                  activeFilters.account === opt
                    ? "bg-[#923CF9] border-[#923CF9] text-white shadow-md shadow-[#923CF9]/20"
                    : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Employment Status Filter Group */}
                <div className="space-y-3">
                  <p className="text-xs font-black text-slate-700 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#923CF9]" />
                    Employment Status
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["All", "Active", "On Leave", "Inactive"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => onFilterChange("employment", opt)}
                        className={`px-3 py-2.5 rounded-xl text-[11px] font-bold border transition-all
                ${
                  activeFilters.employment === opt
                    ? "bg-[#923CF9] border-[#923CF9] text-white shadow-md shadow-[#923CF9]/20"
                    : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 3. Add Teacher Button */}
        <button
          onClick={() => openModal("teacher")}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#923CF9] text-white rounded-2xl text-sm font-bold hover:bg-[#7b2cd6] transition-all shadow-lg shadow-[#923CF9]/20"
        >
          <UserPlus size={18} />
          <span>Add Teacher</span>
        </button>
      </div>
    </div>
  );
};
