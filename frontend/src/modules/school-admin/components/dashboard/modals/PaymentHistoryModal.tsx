// @/modules/school-admin/components/finance/modals/PaymentHistoryModal.tsx
import Modal from "../../dashboard/Modal";
import { PaymentEntry } from "@/modules/types/dashboard";
import { formatCurrency } from "@/utils/currency";
import { CheckCircle2, CreditCard, Landmark, User } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  history: PaymentEntry[];
  totalPaid: number;
}

export const PaymentHistoryModal = ({
  isOpen,
  onClose,
  studentName,
  history,
  totalPaid,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Ledger">
      <div className="space-y-6">
        {/* Summary Header */}
        <div className="p-4 bg-[#923CF9]/5 border border-[#923CF9]/10 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black text-[#923CF9] uppercase tracking-widest">
              Total Collected
            </p>
            <p className="text-xl font-black text-slate-800">
              {formatCurrency(totalPaid)}
            </p>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <Landmark className="text-[#923CF9]" size={20} />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
          {history.length > 0 ? (
            history.map((entry) => (
              <div key={entry.id} className="relative pl-10 group">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1 w-9 h-9 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center z-10 group-hover:border-[#923CF9] transition-colors">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>

                <div className="p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-black text-slate-800">
                      {formatCurrency(entry.amount)}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase">
                    <div className="flex items-center gap-1">
                      <CreditCard size={12} />
                      {entry.method}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      {entry.receivedBy}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-slate-400 text-sm font-medium italic">
                No payment history found.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all"
        >
          Close Ledger
        </button>
      </div>
    </Modal>
  );
};
