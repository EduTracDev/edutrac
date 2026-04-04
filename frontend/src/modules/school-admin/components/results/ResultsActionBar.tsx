// @/modules/school-admin/components/dashboard/ResultsActionBar.tsx
import { ResultStatus } from "@/modules/types/dashboard";
import { Search, Filter, CheckCircle2, X } from "lucide-react";

export interface ResultFilterState {
  search?: string;
  class?: string;
  status?: ResultStatus | "All";
}
interface ResultsActionBarProps {
  selectedCount: number;
  onBulkApprove: () => void;
  onClearSelection: () => void;
  availableClasses: string[];
  onFilterChange: (filters: Partial<ResultFilterState>) => void;
}

export const ResultsActionBar = ({
  selectedCount,
  onBulkApprove,
  onClearSelection,
  availableClasses,
  onFilterChange,
}: ResultsActionBarProps) => {
  return (
    <div className="space-y-4">
      {/* 🚀 Top Row: Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search student name or ID..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#923CF9]/5 transition-all"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        {/* Class Filter */}
        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="flex-1 md:w-40 p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 outline-none"
            // ✅ Type-safe: compiler knows 'class' is a valid key
            onChange={(e) => onFilterChange({ class: e.target.value })}
          >
            <option value="">All Classes</option>
            {availableClasses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="flex gap-2 w-full md:w-auto">
          <select
            className="flex-1 md:w-40 p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 outline-none"
            onChange={(e) => onFilterChange({ class: e.target.value })}
          >
            <option value="">All Classes</option>
            {availableClasses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-colors">
            <Filter size={20} />
          </button>
        </div> */}
      </div>

      {/* 🚀 Bottom Row: Floating Selection Bar (Only shows when items are selected) */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between bg-[#923CF9] p-4 rounded-[24px] shadow-lg shadow-[#923CF9]/20 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={onClearSelection}
              className="p-1 hover:bg-white/10 rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
            <p className="text-white text-sm font-bold">
              {selectedCount} {selectedCount === 1 ? "result" : "results"}{" "}
              selected
            </p>
          </div>

          <button
            onClick={onBulkApprove}
            className="flex items-center gap-2 px-6 py-2 bg-white text-[#923CF9] rounded-xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            <CheckCircle2 size={18} />
            Approve All Selected
          </button>
        </div>
      )}
    </div>
  );
};
