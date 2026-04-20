"use client";

import { useState } from "react";
import { useWard } from "@/modules/context/WardContext";
import { StudentIdentityCard } from "@/modules/parent/components/dashboard/StudentIdentityCard";
import { TuitionWidget } from "@/modules/parent/components/dashboard/TuitionWidget";
import { StaffWidget } from "@/modules/parent/components/dashboard/StaffWidget";
import { QuickActions } from "@/modules/parent/components/dashboard/QuickActions";
import { AcademicPulse } from "@/modules/parent/components/dashboard/AcademicPulse";
import Modal from "@/modules/school-admin/components/dashboard/Modal";
import { FileUploader } from "@/modules/teacher/components/assignments/FileUploader";
import { Send, Loader2 } from "lucide-react";

export default function Page() {
  const { activeWard } = useWard();
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receipts, setReceipts] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeWard) return null;

  const handleReceiptSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptModalOpen(false);
      setReceipts([]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Identity & Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <StudentIdentityCard
            name={activeWard.name}
            className={activeWard.class}
            studentCount={20}
          />
        </div>
        <div className="lg:col-span-4">
          <TuitionWidget onUploadReceipt={() => setReceiptModalOpen(true)} />
        </div>
      </div>
      {/* Quick Actions & Notifications */}
      <QuickActions />
      {/* Contacts & Academic Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <AcademicPulse activeWard={activeWard} />

        <div className="lg:col-span-4">
          <StaffWidget />
        </div>
      </div>
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        title="Upload Payment Receipt"
      >
        <div className="space-y-6">
          <FileUploader
            attachments={receipts}
            setAttachments={setReceipts}
            label="Snap a photo of the teller or bank transfer receipt"
          />

          <button
            onClick={handleReceiptSubmit}
            disabled={receipts.length === 0 || isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#923CF9] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-[20px] shadow-lg shadow-purple-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {isSubmitting ? "Verifying..." : "Submit for Verification"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
