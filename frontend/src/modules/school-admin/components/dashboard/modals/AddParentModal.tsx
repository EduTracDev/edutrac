"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import { UserPlus, Users } from "lucide-react";
import { SingleParentUploadForm } from "./SingleParentUploadForm";
import { BulkParentUploadForm } from "./BulkParentUploadForm";
import { CSVError } from "@/modules/types/dashboard";

type EntryMethod = "single" | "bulk";

interface AddParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
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
            isSubmitting={isSubmitting}
            formErrors={errors}
            onParentSubmit={onSubmit}
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
