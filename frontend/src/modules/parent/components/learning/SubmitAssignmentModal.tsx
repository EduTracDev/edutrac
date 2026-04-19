// @/modules/parent/components/learning/SubmitAssignmentModal.tsx
"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import Modal from "@/modules/school-admin/components/dashboard/Modal";
import { FileUploader } from "@/modules/teacher/components/assignments/FileUploader";

interface SubmitAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    id: string;
    title: string;
    subject: string;
  } | null;
}

export const SubmitAssignmentModal = ({
  isOpen,
  onClose,
  assignment,
}: SubmitAssignmentModalProps) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!assignment) return null;

  const handleSubmit = async () => {
    if (attachments.length === 0) return;

    setIsSubmitting(true);
    // Logic for Commit 116: Simulate Firebase/API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setAttachments([]); // Reset for next time
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Assignment">
      <div className="space-y-6">
        {/* Context Header */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-black text-[#923CF9] uppercase tracking-[0.15em] mb-1">
            {assignment.subject}
          </p>
          <h4 className="text-sm font-bold text-slate-800">
            {assignment.title}
          </h4>
        </div>

        {/* Reusing your FileUploader */}
        <FileUploader
          attachments={attachments}
          setAttachments={setAttachments}
          label="Snap a photo of your notebook or upload PDF"
        />

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={attachments.length === 0 || isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#923CF9] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-[20px] shadow-lg shadow-purple-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {isSubmitting ? "Submitting..." : "Send to Teacher"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
