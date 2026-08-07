// @/modules/parent/components/billing/PaymentHistory.tsx
import { Download, FileCheck, AlertCircle } from "lucide-react";

export const PaymentHistory = () => {
  const transactions = [
    {
      id: "TX-9012",
      type: "Tuition Fee",
      amount: "₦250,000",
      date: "Apr 12, 2026",
      status: "Verified",
    },
    {
      id: "TX-8845",
      type: "Bus Service",
      amount: "₦45,000",
      date: "Mar 15, 2026",
      status: "Verified",
    },
    {
      id: "TX-8830",
      type: "Uniform & Books",
      amount: "₦55,000",
      date: "Mar 02, 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[40px] overflow-hidden">
      <div className="p-8 border-b border-slate-50">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Payment History
        </h3>
      </div>

      <div className="divide-y divide-slate-50">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="p-6 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tx.status === "Verified"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-amber-50 text-amber-500"
                }`}
              >
                {tx.status === "Verified" ? (
                  <FileCheck size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">{tx.type}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  {tx.id} • {tx.date}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-8">
              <p className="text-sm font-black text-slate-800">{tx.amount}</p>
              <button className="p-2 text-slate-400 hover:text-[#923CF9] transition-all">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
