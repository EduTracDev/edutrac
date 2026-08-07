// @/modules/school-admin/components/results/ResultBulkActions.tsx
import { CheckCircle, Flag, Download } from "lucide-react";

export const ResultBulkActions = ({
  selectedCount,
  onBulkApprove,
}: {
  selectedCount: number;
  onBulkApprove: () => void;
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-[#923CF9] rounded-[24px] mb-4 animate-in slide-in-from-top-2">
      <span className="text-white text-xs font-bold ml-2">
        {selectedCount} Students Selected
      </span>
      <div className="flex gap-2">
        <button
          onClick={onBulkApprove}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          <CheckCircle size={14} /> Bulk Approve
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#923CF9] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          <Download size={14} /> Generate PDF
        </button>
      </div>
    </div>
  );
};
