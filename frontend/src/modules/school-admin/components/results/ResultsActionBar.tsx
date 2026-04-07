// @/modules/school-admin/components/results/ResultsActionBar.tsx
import { CheckCircle, Download, X, Filter, ChevronDown } from "lucide-react";
import { ResultStatus } from "@/modules/types/dashboard";

export interface ResultFilterState {
  search?: string;
  class?: string;
  status?: ResultStatus | "All";
}
interface ActionBarProps {
  selectedCount: number;
  onBulkApprove: () => void;
  onBulkGenerate: () => void;
  onClearSelection: () => void;
  availableClasses: string[];
  onFilterChange: (filters: Partial<ResultFilterState>) => void;
}

export const ResultsActionBar = ({
  selectedCount,
  onBulkApprove,
  onBulkGenerate,
  onClearSelection,
  availableClasses,
  onFilterChange,
}: ActionBarProps) => {
  const isBatchMode = selectedCount > 0;

  return (
    <div
      className={`relative transition-all duration-300 rounded-[28px] overflow-hidden border ${
        isBatchMode
          ? "bg-[#923CF9] border-[#923CF9] shadow-lg shadow-[#923CF9]/20"
          : "bg-white border-slate-100 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between p-3 min-h-[72px]">
        {/* LEFT SIDE: Context or Selection Count */}
        <div className="flex items-center gap-4 px-3">
          {isBatchMode ? (
            <div className="flex items-center gap-3 animate-in slide-in-from-left-4">
              <button
                onClick={onClearSelection}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
              >
                <X size={18} />
              </button>
              <span className="text-white font-black text-sm uppercase tracking-widest">
                {selectedCount} Selected
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400">
              <Filter size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Filter Results
              </span>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Filters (Normal Mode) OR Actions (Batch Mode) */}
        <div className="flex items-center gap-2 px-1">
          {isBatchMode ? (
            <div className="flex gap-2 animate-in zoom-in-95">
              <button
                onClick={onBulkApprove}
                className="flex items-center gap-2 px-5 py-3 bg-white text-[#923CF9] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all"
              >
                <CheckCircle size={16} /> Approve & Lock
              </button>
              <button
                onClick={onBulkGenerate}
                className="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <Download size={16} /> Generate PDF
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <select className="bg-slate-50 border-none rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#923CF9]/10">
                {availableClasses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select className="bg-slate-50 border-none rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#923CF9]/10">
                <option>First Term</option>
                <option>Second Term</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
