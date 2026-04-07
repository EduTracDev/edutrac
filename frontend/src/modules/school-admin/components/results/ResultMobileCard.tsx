import { StatusBadge } from "./ResultTableRow";
import { StudentResult } from "@/modules/types/dashboard";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface RowProps {
  result: StudentResult;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onFlag: (id: string) => void;
  onApprove: (id: string) => void;
  onViewReport: (id: string) => void;
}

const ResultMobileCard = ({
  result,
  isSelected,
  onSelect,
  onFlag,
  onApprove,
  onViewReport,
}: RowProps) => {
  // ✅ 1. Use curly braces and declare hooks at the top
  const [showMenu, setShowMenu] = useState(false);

  // ✅ 2. Use an explicit return statement
  return (
    <div
      className={`p-4 border rounded-2xl mb-3 ${
        isSelected
          ? "border-[#923CF9] bg-[#923CF9]/5"
          : "border-slate-100 bg-white"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(result.id)}
          />
          <div>
            <p className="font-bold text-slate-800">{result.studentName}</p>
            <StatusBadge status={result.status} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Three-dot Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
            >
              <MoreVertical size={20} />
            </button>

            {showMenu && (
              <>
                {/* Backdrop to close menu when clicking outside */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 shadow-xl rounded-xl z-20 py-1">
                  {result.status === "Approved" && (
                    <button
                      onClick={() => onViewReport(result.id)}
                      className="py-2 px-4 text-[#923CF9] hover:bg-[#923CF9]/5 font-bold text-xs w-full text-left"
                    >
                      Print
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onApprove(result.id);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      onFlag(result.id);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                  >
                    Flag
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase leading-none">
              Total
            </p>
            <p className="text-lg font-black text-[#923CF9]">{result.total}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center">
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase">CA1</p>
          <p className="text-sm font-bold text-slate-700">{result.ca1}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase">CA2</p>
          <p className="text-sm font-bold text-slate-700">{result.ca2}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase">Exam</p>
          <p className="text-sm font-bold text-slate-700">{result.exam}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultMobileCard;
