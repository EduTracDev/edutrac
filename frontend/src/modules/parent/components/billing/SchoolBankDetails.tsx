import { useState } from "react";
import { Copy, Landmark, Check } from "lucide-react";

export const SchoolBankDetails = () => {
  const [copied, setCopied] = useState(false);
  const bankName = "Globus";
  const accountNumber = "1234567890";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-[32px] p-6 relative overflow-hidden group">
      <Landmark
        className="absolute -right-4 -bottom-4 text-emerald-100"
        size={100}
      />

      <div className="relative z-10">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4 flex items-center gap-2">
          Official Payment Account
        </h4>

        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
            GreenTree Academy Ltd
          </p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              {accountNumber}
            </span>
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white rounded-xl shadow-sm border border-emerald-100 text-emerald-600 hover:scale-110 transition-all active:scale-95"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <p className="text-sm font-black text-emerald-700">{bankName}</p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-[10px] font-bold text-emerald-600 uppercase">
            Always include student name in Narration
          </p>
        </div>
      </div>
    </div>
  );
};
