"use client";

import React, { useState } from "react";
import { Filter, UserPlus, Search, ChevronDown } from "lucide-react";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { StudentFilters } from "@/modules/types/dashboard";

interface StudentActionBarProps {
  onSearch: (query: string) => void;
  activeFilters: StudentFilters;
  onFilterChange: (type: keyof StudentFilters, value: string) => void;
  onClearFilters: () => void;
  availableClasses: string[];
}

export const StudentActionBar = ({
  onSearch,
  activeFilters,
  onFilterChange,
  onClearFilters,
  availableClasses,
}: StudentActionBarProps) => {
  const { openModal } = useModals();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters =
    activeFilters.class !== "All" ||
    activeFilters.gender !== "All" ||
    activeFilters.accountStatus !== "All";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
      {/* 1. Search (Name or Admission ID) */}
      <div className="relative w-full md:w-96 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#923CF9] transition-colors"
          size={18}
        />
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by name or admission ID..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto relative">
        {/*  Filters Dropdown */}
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
          </button>

          {isFilterOpen && (
            <>
              {/* 1. Backdrop: Darker and blurred on mobile for focus, transparent on desktop */}
              <div
                className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* 2. Dropdown Container */}
              <div className="fixed inset-x-4 top-[15%] z-50 md:absolute md:inset-auto md:right-0 md:top-14 w-auto md:w-80bg-white rounded-[32px] md:rounded-2xl border border-slate-100 shadow-2xl p-6 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-[12px] uppercase tracking-widest text-slate-400">
                    Student Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={onClearFilters}
                      className="text-[10px] font-bold text-[#923CF9] hover:bg-[#923CF9]/5 px-2 py-1 rounded-lg transition-colors"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Class Filter - Using a grid for better touch targets on mobile */}
                  <div>
                    <p className="text-xs font-black text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#923CF9]" />
                      Class / Grade
                    </p>
                    <div className="relative group/select">
                      <select
                        value={activeFilters.class}
                        onChange={(e) =>
                          onFilterChange("class", e.target.value)
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none 
                 focus:ring-2 focus:ring-[#923CF9]/20 appearance-none cursor-pointer 
                 hover:bg-slate-100 transition-colors pr-10"
                      >
                        <option value="All">All Classes</option>
                        {availableClasses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      {/* 🚀 The Chevron Icon */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within/select:text-[#923CF9] transition-colors">
                        <ChevronDown size={16} strokeWidth={3} />
                      </div>
                    </div>
                  </div>

                  {/* Gender Filter */}
                  <div>
                    <p className="text-xs font-black text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#923CF9]" />
                      Gender
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {["All", "Male", "Female"].map((g) => (
                        <button
                          key={g}
                          onClick={() => onFilterChange("gender", g as any)}
                          className={`py-2.5 rounded-xl text-[10px] font-black border transition-all
                  ${
                    activeFilters.gender === g
                      ? "bg-[#923CF9] text-white border-[#923CF9] shadow-md shadow-[#923CF9]/20"
                      : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
                  }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Account Status Filter */}
                  <div>
                    <p className="text-xs font-black text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#923CF9]" />
                      Portal Status
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {["All", "Joined", "Pending"].map((s) => (
                        <button
                          key={s}
                          onClick={() =>
                            onFilterChange("accountStatus", s as any)
                          }
                          className={`py-2.5 rounded-xl text-[10px] font-black border transition-all
                  ${
                    activeFilters.accountStatus === s
                      ? "bg-[#923CF9] text-white border-[#923CF9] shadow-md shadow-[#923CF9]/20"
                      : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
                  }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile-only Close Button */}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs md:hidden"
                >
                  Show Results
                </button>
              </div>
            </>
          )}
        </div>

        {/* 3. Add Student Button */}
        <button
          onClick={() => openModal("student")}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#923CF9] text-white rounded-2xl text-sm font-bold hover:bg-[#7b2cd6] transition-all shadow-lg shadow-[#923CF9]/20"
        >
          <UserPlus size={18} />
          <span>Add Student</span>
        </button>
      </div>
    </div>
  );
};
