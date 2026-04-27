import Modal from "../../../../shared/component/Modal";
import { useState } from "react";

interface FlagResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  studentName: string;
}

export const FlagResultModal = ({
  isOpen,
  onClose,
  onConfirm,
  studentName,
}: FlagResultModalProps) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason(""); // Clear for next use
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Flag Result for Revision">
      <div className="space-y-4">
        <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-xs font-medium text-red-600 uppercase tracking-wider mb-1">
            Flagging Result For:
          </p>
          <p className="font-bold text-slate-800">{studentName}</p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 uppercase">
            Reason for Flagging
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Exam score exceeds 60, or CA1 seems too high..."
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm min-h-[120px] outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 hover:bg-red-600 disabled:opacity-50 transition-all"
          >
            Confirm Flag
          </button>
        </div>
      </div>
    </Modal>
  );
};
