"use client";

import React, { useState, useEffect } from "react";
import Modal from "../../../../shared/component/Modal";
import { UserPlus, Users } from "lucide-react";
import { SingleParentUploadForm } from "./SingleParentUploadForm";
import { BulkParentUploadForm } from "./BulkParentUploadForm";
import { CSVError, Parent } from "@/modules/types/dashboard";
import { ParentFormData } from "@/utils/validation";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";

type EntryMethod = "single" | "bulk";

interface AddParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ParentFormData) => Promise<void>;
  onBulkSubmit: (file: File) => Promise<void>;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  parentBulkErrors: CSVError[];
  clearErrors: () => void;
}

export const AddParentModal = ({
  isOpen,
  onClose,
  errors,
  onSubmit,
  onBulkSubmit,
  isSubmitting,
  parentBulkErrors,
  clearErrors,
}: AddParentModalProps) => {
  const [method, setMethod] = useState<EntryMethod>("single");
  const { modalData } = useModals();

  //  Define the Type Guard using 'unknown'
  const isParent = (data: unknown): data is Parent => {
    // Check if data is an object and not null
    const isObject = typeof data === "object" && data !== null;

    // Use 'in' operator to check for a unique Teacher property
    return isObject && "subject" in (data as Record<string, unknown>);
  };
  //  Define currentTeacher safely
  const currentParent = isParent(modalData) ? modalData : null;

  //  Auto-switch to "single" if we are in Edit Mode
  useEffect(() => {
    if (currentParent) {
      setMethod("single");
    }
  }, [currentParent]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Parents">
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
          <button
            onClick={() => setMethod("single")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
              method === "single"
                ? "bg-white shadow-sm text-[#923CF9]"
                : "text-slate-400"
            }`}
          >
            <UserPlus size={16} /> SINGLE ENTRY
          </button>
          <button
            onClick={() => setMethod("bulk")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
              method === "bulk"
                ? "bg-white shadow-sm text-[#923CF9]"
                : "text-slate-400"
            }`}
          >
            <Users size={16} /> BULK UPLOAD
          </button>
        </div>

        {method === "single" ? (
          <SingleParentUploadForm
            onSuccess={onClose}
            isSubmitting={isSubmitting}
            formErrors={errors}
            onSubmit={onSubmit}
            initialData={currentParent}
          />
        ) : (
          <BulkParentUploadForm
            isSubmitting={isSubmitting}
            onBulkSubmit={onBulkSubmit}
            bulkErrors={parentBulkErrors}
            clearErrors={clearErrors}
          />
        )}
      </div>
    </Modal>
  );
};
