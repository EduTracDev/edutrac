"use client";

import React, { useState } from "react";
import {
  Filter,
  UserPlus,
  Search,
  ChevronDown,
  Users,
  ShieldCheck,
} from "lucide-react";

import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { InvitationFilters } from "@/modules/types/dashboard";

interface InvitationActionBarProps {
  onSearch: (query: string) => void;
  activeFilters: InvitationFilters;
  onFilterChange: (type: keyof InvitationFilters, value: string) => void;
  onClearFilters: () => void;
  totalResults?: number;
}

export const InvitationActionBar = ({
  onSearch,
  activeFilters,
  onFilterChange,
  onClearFilters,
  totalResults = 0,
}: InvitationActionBarProps) => {
  const { openModal } = useModals();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // const hasActiveFilters =
  //   activeFilters.role !== "All" || activeFilters.status !== "All";

  const activeFilterCount = [
    activeFilters.role !== "All",
    activeFilters.status !== "All",
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
      {/* Search */}
      <div className="relative w-full lg:max-w-md group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#923CF9] transition-colors"
          size={18}
        />

        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search name or email..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
        {/* Results */}
        {activeFilterCount > 0 && (
          <span className="hidden lg:block text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-3 py-2 rounded-full border border-slate-100 whitespace-nowrap">
            {totalResults} {totalResults === 1 ? "match" : "matches"}
          </span>
        )}

        {/* Filters */}
        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${
              activeFilterCount > 0
                ? "bg-[#923CF9]/5 border-[#923CF9] text-[#923CF9]"
                : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Filter size={18} />

            <span>Filters</span>

            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#923CF9] text-white text-[10px]">
                {activeFilterCount}
              </span>
            )}

            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isFilterOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Filter panel */}
              <div className="fixed inset-x-4 top-[15%] z-50 lg:absolute lg:inset-auto lg:right-0 lg:top-14 w-auto lg:w-80 bg-white rounded-[28px] lg:rounded-2xl border border-slate-100 shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
                      Filter Invitations
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Narrow down your invitation list
                    </p>
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={onClearFilters}
                      className="text-[10px] font-bold text-[#923CF9] hover:underline"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                      <Users size={14} />
                      Invitee Type
                    </label>

                    <select
                      value={activeFilters.role}
                      onChange={(e) => onFilterChange("role", e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#923CF9]/20 transition-all cursor-pointer"
                    >
                      <option value="All">All People</option>

                      <option value="Parent">Parents</option>

                      <option value="Teacher">Teachers</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                      <ShieldCheck size={14} />
                      Invitation Status
                    </label>

                    <select
                      value={activeFilters.status}
                      onChange={(e) => onFilterChange("status", e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#923CF9]/20 transition-all cursor-pointer"
                    >
                      <option value="All">All Statuses</option>

                      <option value="Pending">Pending</option>

                      <option value="Accepted">Accepted</option>

                      <option value="Expired">Expired</option>

                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </>
          )}
        </div>

        {/* Send Invite */}
        <button
          type="button"
          onClick={() => openModal("invite")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#923CF9] text-white rounded-2xl text-sm font-bold hover:bg-[#7b2cd6] transition-all shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 shrink-0"
        >
          <UserPlus size={18} />

          <span>Send Invite</span>
        </button>
      </div>
    </div>
  );
};
