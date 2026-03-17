"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import { UserPlus, Users } from "lucide-react";
import { SingleInviteForm } from "./SingleInviteForm";
import { BulkUploadForm } from "./BulkUploadForm";

type InviteMethod = "single" | "bulk";

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: { [key: string]: string }; // Match the name
  isSubmitting: boolean;
}

export const AddTeacherModal = ({
  isOpen,
  onClose,
  errors,
  onSubmit,
  isSubmitting,
}: AddTeacherModalProps) => {
  const [method, setMethod] = useState<InviteMethod>("single");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Teacher">
      <div className="space-y-6">
        {/* Only show tabs if we haven't succeeded yet */}
        <div className="space-y-6">
          {/* Tab Switcher - Now inside the modal body for a cleaner look */}
          <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
            <button
              onClick={() => setMethod("single")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                method === "single"
                  ? "bg-white shadow-sm text-[#923CF9]"
                  : "text-slate-400"
              }`}
            >
              <UserPlus size={16} /> SINGLE INVITE
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

        {method === "single" ? (
          <SingleInviteForm
            onSuccess={onClose}
            isSubmitting={isSubmitting}
            formErrors={errors}
            onSubmit={onSubmit}
          />
        ) : (
          <BulkUploadForm />
        )}
      </div>
    </Modal>
  );
};
