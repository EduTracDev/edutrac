import { ResultStatus, StudentResult } from "@/modules/types/dashboard";
import { CheckCircle2, Flag, FileText } from "lucide-react";

interface RowProps {
  result: StudentResult;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onFlag: (id: string) => void;
  onApprove: (id: string) => void;
  onViewReport: (id: string) => void;
}

export const StatusBadge = ({ status }: { status: ResultStatus }) => {
  const styles = {
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Approved: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Flagged: "bg-red-50 text-red-600 border-red-100",
    Draft: "bg-slate-50 text-slate-600 border-slate-100",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const ResultTableRow = ({
  result,
  isSelected,
  onSelect,
  onFlag,
  onApprove,
  onViewReport,
}: RowProps) => (
  <tr
    className={`group hover:bg-slate-50 transition-colors ${isSelected ? "bg-[#923CF9]/5" : ""} ${result.status === "Flagged" ? "bg-red-50/30" : ""}`}
  >
    <td className="p-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(result.id)}
        className="w-4 h-4 rounded border-slate-300 text-[#923CF9] focus:ring-[#923CF9]"
      />
    </td>
    <td className="p-4">
      <div className="flex flex-col">
        <span className="font-bold text-slate-800 text-sm">
          {result.studentName}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">
          {result.studentId}
        </span>
      </div>
    </td>
    <td className="p-4 text-sm font-medium text-slate-600">{result.ca1}</td>
    <td className="p-4 text-sm font-medium text-slate-600">{result.ca2}</td>
    <td className="p-4 text-sm font-medium text-slate-600">{result.exam}</td>
    <td className="p-4">
      <span className="font-black text-slate-900">{result.total}</span>
    </td>
    <td className="p-4 text-center">
      <span
        className={`inline-block w-8 py-1 rounded-lg font-black text-xs ${
          result.grade === "A"
            ? "bg-emerald-100 text-emerald-700"
            : result.grade === "F"
              ? "bg-red-100 text-red-700"
              : "bg-slate-100 text-slate-700"
        }`}
      >
        {result.grade}
      </span>
    </td>
    <td className="p-4">
      <StatusBadge status={result.status} />
    </td>
    <td className="p-4 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* ONLY show the generate icon if it's already approved */}
        {result.status === "Approved" && (
          <button
            onClick={() => onViewReport(result.id)}
            className="p-2 text-[#923CF9] hover:bg-[#923CF9]/5 rounded-lg transition-colors"
            title="View Report Card"
          >
            <FileText size={16} />
          </button>
        )}
        <button
          onClick={() => onApprove(result.id)}
          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Quick Approve"
        >
          <CheckCircle2 size={16} />
        </button>
        <button
          onClick={() => onFlag(result.id)}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Flag for review"
        >
          <Flag size={16} />
        </button>
      </div>
    </td>
  </tr>
);

export default ResultTableRow;
