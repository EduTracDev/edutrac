"use client";
import ResultTableRow from "./ResultTableRow";
import ResultMobileCard from "./ResultMobileCard";
import { StudentResult } from "@/modules/types/dashboard";

interface ResultsTableProps {
  results: StudentResult[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onApprove: (id: string) => void;
  onFlag: (id: string) => void;
  onViewReport: (id: string) => void;
}
export const ResultsTable = ({
  results,
  selectedIds,
  onSelect,
  onSelectAll,
  onApprove,
  onFlag,
  onViewReport,
}: ResultsTableProps) => {
  const isAllSelected =
    results.length > 0 && selectedIds.length === results.length;
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  onChange={onSelectAll}
                  checked={isAllSelected}
                />
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase">
                Student
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase">
                CA1
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase">
                CA2
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase">
                Exam
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase">
                Total
              </th>
              <th className="p-4 text-center text-[10px] font-black text-slate-400 uppercase">
                Grade
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase">
                Status
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((res) => (
              <ResultTableRow
                key={res.id}
                result={res}
                isSelected={selectedIds.includes(res.id)}
                onSelect={onSelect}
                onFlag={onFlag}
                onApprove={onApprove}
                onViewReport={onViewReport}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden p-4">
        {results.map((res) => (
          <ResultMobileCard
            key={res.id}
            result={res}
            isSelected={selectedIds.includes(res.id)}
            onSelect={onSelect}
            onFlag={onFlag}
            onApprove={onApprove}
            onViewReport={onViewReport}
          />
        ))}
      </div>
    </div>
  );
};
