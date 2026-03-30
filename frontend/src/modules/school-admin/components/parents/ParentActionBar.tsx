"use client";

import React, { useState } from "react";
import {
  Filter,
  UserPlus,
  Search,
  ChevronDown,
  Briefcase,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { ParentFilters } from "@/modules/types/dashboard";

interface ParentActionBarProps {
  onSearch: (query: string) => void;
  activeFilters: ParentFilters;
  onFilterChange: (type: keyof ParentFilters, value: string) => void;
  onClearFilters: () => void;
  totalResults?: number; // Added: Shows how many parents are in the current view
}

export const ParentActionBar = ({
  onSearch,
  activeFilters,
  onFilterChange,
  onClearFilters,
  totalResults = 0,
}: ParentActionBarProps) => {
  const { openModal } = useModals();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters =
    activeFilters.accountStatus !== "All" ||
    activeFilters.occupation !== "All" ||
    activeFilters.linkedStudentCount !== "All";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
      {/* 1. Search Bar */}
      <div className="relative w-full md:w-96 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#923CF9] transition-colors"
          size={18}
        />
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search name, email or phone..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Results Badge - Subtle but useful for admins */}
        {hasActiveFilters && (
          <span className="hidden lg:block text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            {totalResults} matches
          </span>
        )}

        {/* 2. Filters Dropdown */}
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
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isFilterOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
                onClick={() => setIsFilterOpen(false)}
              />

              <div className="fixed inset-x-4 top-[15%] z-50 md:absolute md:inset-auto md:right-0 md:top-14 w-auto md:w-80 bg-white rounded-[32px] md:rounded-2xl border border-slate-100 shadow-2xl p-6 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
                    Filter Parents
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={onClearFilters}
                      className="text-[10px] font-bold text-[#923CF9] hover:underline"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Account Status */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                      <ShieldCheck size={14} /> Portal Status
                    </label>
                    <select
                      value={activeFilters.accountStatus}
                      onChange={(e) =>
                        onFilterChange("accountStatus", e.target.value)
                      }
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#923CF9]/20 transition-all cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Joined">Joined</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  {/* Ward Count - Updated labels to match relational logic */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                      <Users size={14} /> Number of Wards
                    </label>
                    <select
                      value={activeFilters.linkedStudentCount}
                      onChange={(e) =>
                        onFilterChange("linkedStudentCount", e.target.value)
                      }
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#923CF9]/20 transition-all cursor-pointer"
                    >
                      <option value="All">Any number</option>
                      <option value="0">None (Needs Linking)</option>
                      <option value="1">1 Child</option>
                      <option value="Multiple">2 or more Children</option>
                    </select>
                  </div>

                  {/* Occupation */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                      <Briefcase size={14} /> Occupation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Doctor"
                      value={
                        activeFilters.occupation === "All"
                          ? ""
                          : activeFilters.occupation
                      }
                      onChange={(e) =>
                        onFilterChange("occupation", e.target.value || "All")
                      }
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#923CF9]/20 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </>
          )}
        </div>

        {/* 3. Add Parent Button */}
        <button
          onClick={() => openModal("parent")}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#923CF9] text-white rounded-2xl text-sm font-bold hover:bg-[#7b2cd6] transition-all shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 shrink-0"
        >
          <UserPlus size={18} />
          <span>Add Parent</span>
        </button>
      </div>
    </div>
  );
};
