// @/modules/school-admin/components/finance/DebtorMobileCard.tsx
import { FinancialRecord } from "@/modules/types/dashboard";
import { formatCurrency } from "@/utils/currency";
import { MessageSquare, FileText, MoreVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const DebtorMobileCard = ({
  record,
  onRemind,
  onView,
  onViewStatement,
}: {
  record: FinancialRecord;
  onRemind: (id: string) => void;
  onView: () => void;
  onViewStatement: (id: string) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const paymentPercentage = (record.amountPaid / record.totalBilled) * 100;

  const handleSingleReminder = (studentName: string) => {
    const t = toast.loading(`Sending reminder to ${studentName}'s parent...`);
    setTimeout(() => {
      toast.success(`Reminder sent to ${studentName}`, { id: t });
    }, 1500);
  };

  return (
    <div
      onClick={onView}
      className="p-5 bg-white border border-slate-100 rounded-[28px] mb-4 shadow-sm relative overflow-hidden"
    >
      {/* Status Ribbon */}
      <div
        className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-tighter ${
          record.status === "Overdue"
            ? "bg-red-500 text-white"
            : "bg-amber-400 text-white"
        }`}
      >
        {record.status}
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
            Student
          </p>
          <h3 className="font-bold text-slate-800 text-base">
            {record.studentName}
          </h3>
          <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-md font-bold text-slate-500 uppercase">
            {record.class}
          </span>
        </div>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-slate-300 hover:text-slate-600"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Financial Progress Section */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
              Balance Owed
            </p>
            <p className="text-xl font-black text-red-500 leading-none">
              {formatCurrency(record.balance)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase leading-none">
              {Math.round(paymentPercentage)}% Collected
            </p>
          </div>
        </div>

        {/* Thick Mobile-Friendly Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
          <div
            className={`h-full transition-all duration-700 ease-out ${
              paymentPercentage > 50 ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${paymentPercentage}%` }}
          />
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
        <button
          //   onClick={() => onRemind(record.id)}
          onClick={(e) => {
            e.stopPropagation();
            handleSingleReminder(record.studentName);
          }}
          className="flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-xs hover:bg-emerald-100 active:scale-95 transition-all"
        >
          <MessageSquare size={16} />
          Remind
        </button>
        <button
          onClick={() => onViewStatement(record.id)}
          className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 rounded-2xl font-bold text-xs hover:bg-slate-100 active:scale-95 transition-all"
        >
          <FileText size={16} />
          Statement
        </button>
      </div>

      {/* Hidden Simple Menu for extra actions */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-4 top-12 w-40 bg-white border border-slate-100 shadow-xl rounded-2xl z-20 py-2">
            <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
              Edit Billing
            </button>
            <button className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50">
              Apply Penalty
            </button>
          </div>
        </>
      )}
    </div>
  );
};
