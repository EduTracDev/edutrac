"use client";

import { X, AlertCircle } from "lucide-react";
import { Modal } from "@/modules/shared/component/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studentName: string;
  isSubmitting?: boolean;
}

export const ConfirmUnlinkModal = ({
  isOpen,
  onClose,
  onConfirm,
  studentName,
  isSubmitting,
}: Props) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>

          <h3 className="text-xl font-black text-slate-800 mb-2">
            Unlink Ward?
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Are you sure you want to remove{" "}
            <span className="font-bold text-slate-900">{studentName}</span>?
            This connection will be broken, but the student record remains safe.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full mt-8">
            <button
              onClick={onClose}
              className="py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs hover:bg-slate-100 transition-all"
            >
              No, Keep
            </button>
            <button
              disabled={isSubmitting}
              onClick={onConfirm}
              className="py-4 bg-red-500 text-white rounded-2xl font-bold text-xs hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Yes, Unlink"
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
