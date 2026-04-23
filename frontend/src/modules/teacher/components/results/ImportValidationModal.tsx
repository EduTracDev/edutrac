"use client";
import { UserPlus, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import Modal from "@/modules/shared/component/Modal";

interface ValidationSummary {
  totalRows: number;
  matchedStudents: number;
  missingScores: number;
  invalidIds: string[];
}

interface ImportValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  summary: ValidationSummary | null;
}

export const ImportValidationModal = ({
  isOpen,
  onClose,
  onConfirm,
  summary,
}: ImportValidationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Validation">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4">
          <ValidationStatCard
            label="Detected"
            value={summary?.totalRows || 0}
            icon={<UserPlus size={16} />}
            color="blue"
          />
          <ValidationStatCard
            label="Matched"
            value={summary?.matchedStudents || 0}
            icon={<CheckCircle2 size={16} />}
            color="emerald"
          />
        </div>

        {/* Warning: Incomplete Data */}
        {summary && summary.missingScores > 0 && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <AlertTriangle className="text-amber-600 shrink-0" size={18} />
            <div>
              <p className="text-xs font-black text-amber-900 uppercase">
                Incomplete Data
              </p>
              <p className="text-xs text-amber-700 font-medium">
                {summary.missingScores} students are missing one or more scores.
                These will be imported as 0.
              </p>
            </div>
          </div>
        )}

        {/* Warning: Invalid IDs */}
        {summary && summary.invalidIds.length > 0 && (
          <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100">
            <Info className="text-rose-600 shrink-0" size={18} />
            <div>
              <p className="text-xs font-black text-rose-900 uppercase">
                Unknown IDs
              </p>
              <p className="text-[10px] text-rose-700 font-medium font-mono truncate max-w-[200px]">
                {summary.invalidIds.join(", ")}
              </p>
              <p className="text-[10px] text-rose-500 mt-1 italic">
                These IDs do not exist in this class and will be ignored.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase hover:bg-black transition-all shadow-lg"
          >
            Import Now
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Internal Helper Component for Stats
interface ValidationStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "emerald";
}

const ValidationStatCard = ({
  label,
  value,
  icon,
  color,
}: ValidationStatCardProps) => {
  const themes = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div className={`p-4 rounded-2xl border ${themes[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">
          {label}
        </span>
      </div>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
};
