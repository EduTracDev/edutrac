"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import { UserPlus, Users } from "lucide-react";
import { SingleStudentUploadForm } from "./SingleStudentUploadForm";
import { BulkStudentUploadForm } from "./BulkStudentUploadForm";
import { CSVError } from "@/modules/types/dashboard";
type EntryMethod = "single" | "bulk";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onBulkSubmit: (file: File) => Promise<void>;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  studentBulkErrors: CSVError[];
  clearErrors: () => void;
}

export const AddStudentModal = ({
  isOpen,
  onClose,
  errors,
  onSubmit,
  onBulkSubmit,
  isSubmitting,
  studentBulkErrors,
  clearErrors,
}: AddStudentModalProps) => {
  const [method, setMethod] = useState<EntryMethod>("single");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Students">
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="space-y-6">
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
        </div>

        {/* Conditional Form Rendering */}
        {method === "single" ? (
          <SingleStudentUploadForm
            isSubmitting={isSubmitting}
            formErrors={errors}
            onStudentSubmit={onSubmit}
          />
        ) : (
          <BulkStudentUploadForm
            isSubmitting={isSubmitting}
            onBulkSubmit={onBulkSubmit}
            bulkErrors={studentBulkErrors}
            onClearErrors={clearErrors}
          />
        )}
      </div>
    </Modal>
  );
};
