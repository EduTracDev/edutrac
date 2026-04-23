import { useState } from "react";
import { Wallet, CreditCard, Clock, CheckCircle2 } from "lucide-react";
import Modal from "@/modules/shared/component/Modal";
import { FileUploader } from "@/modules/shared/component/FileUploader";

export const BillingOverview = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadReceipt = async () => {
    setIsSubmitting(true);
    // Logic: Send to Firebase Storage / Backend
    setTimeout(() => {
      setIsSubmitting(false);
      setUploadModalOpen(false);
      setAttachments([]);
      // You could trigger a success toast here
    }, 2000);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-8 bg-slate-900 rounded-[40px] text-white shadow-2xl shadow-slate-200 flex flex-col justify-between relative overflow-hidden">
        <Wallet
          className="absolute -right-4 -bottom-4 text-white/10"
          size={120}
        />

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Total Outstanding
          </p>
          <h2 className="text-4xl font-black mt-2">₦145,000.00</h2>
        </div>

        <div className="mt-6 flex items-center gap-2">
          {/* Visual indicator of unpaid status */}
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
            Awaiting Settlement
          </p>
        </div>
      </div>

      <div className="p-8 bg-white border border-slate-100 rounded-[40px] flex flex-col justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Total Paid (3rd Term)
        </p>
        <h2 className="text-3xl font-black text-emerald-500 mt-2">
          ₦350,000.00
        </h2>
        <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase flex items-center gap-2">
          <Clock size={12} /> Last payment: April 12
        </p>
      </div>

      {/* The Trigger: Quick Upload Card */}
      <div
        onClick={() => setUploadModalOpen(true)}
        className="p-8 bg-[#923CF9]/5 border border-[#923CF9]/10 rounded-[40px] flex flex-col justify-between group cursor-pointer hover:bg-[#923CF9]/10 transition-all"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#923CF9]">
          Quick Upload
        </p>
        <div className="mt-4">
          <p className="text-sm font-bold text-slate-700 leading-snug">
            Paid via Bank Transfer?
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Upload your teller/receipt for verification.
          </p>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-[#923CF9] uppercase">
          Submit Evidence{" "}
          <CreditCard
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
      {/* Reusable Modal for Receipt Upload */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Payment Evidence"
      >
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed">
              Please upload a clear photo or PDF of your bank transfer receipt
              or bank teller. Our bursary department will verify this within 24
              hours.
            </p>
          </div>

          <FileUploader
            attachments={attachments}
            setAttachments={setAttachments}
            label="Drop your receipt here or click to browse"
          />

          <button
            onClick={handleUploadReceipt}
            disabled={attachments.length === 0 || isSubmitting}
            className="w-full py-4 bg-[#923CF9] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-[20px] transition-all hover:bg-[#7b2cd6] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                Confirm Upload <CheckCircle2 size={14} />
              </>
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
};
