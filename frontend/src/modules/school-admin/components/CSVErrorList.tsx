import { AlertCircle, FileWarning } from "lucide-react";
import { CSVError } from "@/modules/types/dashboard";

interface CSVErrorListProps {
  errors: CSVError[];
  type: "Teacher" | "Student" | "Parent";
}

export const CSVErrorList = ({ errors, type }: CSVErrorListProps) => {
  if (errors.length === 0) return null;

  return (
    <div className="mt-4 space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center gap-2 text-red-500 mb-2 sticky top-0 bg-white py-1">
        <AlertCircle size={14} />
        <span className="text-[10px] font-black uppercase tracking-wider">
          {type} Upload Issues ({errors.length})
        </span>
      </div>
      {errors.map((err, i) => (
        <div
          key={`${err.row}-${i}`}
          className="bg-red-50/50 border border-red-100 rounded-2xl p-3 flex items-start gap-3"
        >
          <div className="bg-red-100 text-red-600 p-2 rounded-xl">
            <FileWarning size={14} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-red-900 uppercase">
              Row {err.row} • {err.identifier}
            </p>
            <p className="text-xs text-red-600 font-medium leading-relaxed">
              {err.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
