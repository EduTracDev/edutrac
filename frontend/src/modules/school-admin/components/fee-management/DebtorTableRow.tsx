// @/modules/school-admin/components/finance/DebtorTableRow.tsx
import { FinancialRecord } from "@/modules/types/dashboard";
import { formatCurrency } from "@/utils/currency";
import { Send, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

export const DebtorTableRow = ({
  record,
  onView,
}: {
  record: FinancialRecord;
  onView: () => void;
}) => {
  const paymentPercentage = (record.amountPaid / record.totalBilled) * 100;

  const handleSingleReminder = (studentName: string) => {
    const t = toast.loading(`Sending reminder to ${studentName}'s parent...`);
    setTimeout(() => {
      toast.success(`Reminder sent to ${studentName}`, { id: t });
    }, 1500);
  };

  return (
    <tr
      onClick={onView}
      className="group hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors"
    >
      <td className="p-4">
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-sm">
            {record.studentName}
          </span>
          <span className="text-[10px] text-slate-400 font-black uppercase">
            {record.class}
          </span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] font-bold text-slate-500">
            <span>{Math.round(paymentPercentage)}% Paid</span>
            <span>{formatCurrency(record.totalBilled)}</span>
          </div>
          <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${paymentPercentage}%` }}
            />
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm font-black text-red-500">
          {formatCurrency(record.balance)}
        </span>
      </td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${
            record.status === "Overdue"
              ? "bg-red-50 text-red-600 border-red-100"
              : "bg-amber-50 text-amber-600 border-amber-100"
          }`}
        >
          {record.status}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSingleReminder(record.studentName);
            }}
            className="p-2 text-slate-400 hover:text-[#923CF9] hover:bg-[#923CF9]/5 rounded-lg"
            title="Send Reminder"
          >
            <Send size={16} />
          </button>
          <button
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
            title="View Statement"
          >
            <FileText size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};
