"use client";

import { useState } from "react";
import Modal from "@/modules/shared/component/Modal";
import { FileUploader } from "@/modules/shared/component/FileUploader";
import { Send, Loader2 } from "lucide-react";

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  wardName: string;
}

export const LeaveRequestModal = ({
  isOpen,
  onClose,
  wardName,
}: LeaveRequestModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mimic API delay
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Reset form
      setLeaveData({ startDate: "", endDate: "", reason: "" });
      setAttachments([]);
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Leave">
      <div className="space-y-6">
        <div className="p-4 bg-[#923CF9]/5 border border-[#923CF9]/10 rounded-2xl">
          <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
            You are requesting leave for{" "}
            <span className="text-[#923CF9] font-black">{wardName}</span>. Once
            submitted, the class teacher will be notified to update the
            attendance record.
          </p>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Start Date
            </label>
            <input
              type="date"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#923CF9] transition-all"
              onChange={(e) =>
                setLeaveData({ ...leaveData, startDate: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              End Date
            </label>
            <input
              type="date"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#923CF9] transition-all"
              onChange={(e) =>
                setLeaveData({ ...leaveData, endDate: e.target.value })
              }
            />
          </div>
        </div>

        {/* Reason for Absence */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Reason
          </label>
          <textarea
            rows={3}
            placeholder="Provide a brief reason (e.g. Family travel, Medical...)"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#923CF9] transition-all resize-none"
            onChange={(e) =>
              setLeaveData({ ...leaveData, reason: e.target.value })
            }
          />
        </div>

        {/* Supporting Documents  */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Evidence (Optional)
          </label>
          <FileUploader
            attachments={attachments}
            setAttachments={setAttachments}
            label="Upload medical reports or letters"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={!leaveData.startDate || !leaveData.reason || isSubmitting}
          className="w-full flex items-center justify-center gap-3 py-4 bg-[#923CF9] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-[20px] shadow-lg shadow-purple-100 transition-all hover:bg-[#7b2cd6] active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {isSubmitting ? "Sending Request..." : "Submit Leave Request"}
        </button>
      </div>
    </Modal>
  );
};
