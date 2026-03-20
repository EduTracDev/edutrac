interface FeeReminderModalProps {
  debtorsCount: number;
  totalAmount: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export const FeeReminderModal = ({
  debtorsCount,
  totalAmount,
  onClose,
  onConfirm,
}: FeeReminderModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-black text-slate-900">
              Send Reminders?
            </h3>
            <p className="text-sm text-slate-500">
              You are about to send personalized SMS/Email alerts to{" "}
              <b>{debtorsCount} parents</b> owing a total of{" "}
              <b>{totalAmount}</b>.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">
              Message Preview
            </p>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              &quot;Dear Parent, this is a friendly reminder from{" "}
              <b>Lincoln High</b> regarding the outstanding fees of{" "}
              <b>₦120,000</b> for <b>{"{Student Name}"}</b>. Kindly ignore if
              already paid.&quot;
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-4 text-sm font-bold bg-[#923CF9] text-white rounded-2xl shadow-lg hover:bg-[#8126e8]"
            >
              Send Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
