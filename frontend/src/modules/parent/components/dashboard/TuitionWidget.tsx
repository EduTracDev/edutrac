import { Receipt, FileUp } from "lucide-react";

export const TuitionWidget = ({
  onUploadReceipt,
}: {
  onUploadReceipt: () => void;
}) => {
  const fees = [
    { label: "Tuition", amount: "₦250,000" },
    { label: "Development Levy", amount: "₦50,000" },
    { label: "Lab/ICT Fees", amount: "₦25,000" },
  ];
  const totalAmount = fees.reduce((acc, fee) => {
    // Remove currency symbol and commas to convert "₦250,000" to 250000
    const numericValue = Number(fee.amount.replace(/[^0-9.-]+/g, ""));
    return acc + numericValue;
  }, 0);

  const formattedTotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <div className="p-6 bg-white border border-slate-100 rounded-[32px] space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
          Tuition Breakdown
        </h3>
        <Receipt size={18} className="text-[#923CF9]" />
      </div>

      <div className="space-y-3">
        {fees.map((fee) => (
          <div
            key={fee.label}
            className="flex justify-between items-center border-b border-slate-50 pb-2"
          >
            <span className="text-xs font-bold text-slate-500">
              {fee.label}
            </span>
            <span className="text-xs font-black text-slate-800">
              {fee.amount}
            </span>
          </div>
        ))}
        {/* The Total Row */}
        <div className="flex justify-between items-center pt-2 mt-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#923CF9]">
            Total Outstanding
          </span>
          <span className="text-sm font-black text-slate-900">
            {formattedTotal}
          </span>
        </div>
      </div>

      <button
        onClick={onUploadReceipt}
        className="w-full mt-2 flex items-center justify-center gap-2 py-4 bg-slate-50 text-[#923CF9] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#923CF9] hover:text-white transition-all group"
      >
        <FileUp size={14} className="group-hover:animate-bounce" />
        Upload Payment Receipt
      </button>
    </div>
  );
};
