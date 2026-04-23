"use client";

import React, { useState, useEffect } from "react";
import Modal from "../../../../shared/component/Modal";
import { UserPlus, Users } from "lucide-react";
import { SingleTeacherInviteForm } from "./SingleTeacherInviteForm";
import { BulkTeacherUploadForm } from "./BulkTeacherUploadForm";
import { CSVError, Teacher } from "@/modules/types/dashboard"; // Ensure Teacher is imported
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { TeacherFormData } from "@/utils/validation";

type InviteMethod = "single" | "bulk";

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TeacherFormData) => Promise<void>;
  onBulkSubmit: (file: File) => Promise<void>;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  teacherBulkErrors: CSVError[];
  clearErrors: () => void;
}

export const AddTeacherModal = ({
  isOpen,
  onClose,
  errors,
  onSubmit,
  onBulkSubmit,
  isSubmitting,
  teacherBulkErrors,
  clearErrors,
}: AddTeacherModalProps) => {
  const [method, setMethod] = useState<InviteMethod>("single");
  const { modalData } = useModals();

  //  Define the Type Guard using 'unknown'
  const isTeacher = (data: unknown): data is Teacher => {
    // Check if data is an object and not null
    const isObject = typeof data === "object" && data !== null;

    // Use 'in' operator to check for a unique Teacher property
    return isObject && "subject" in (data as Record<string, unknown>);
  };
  //  Define currentTeacher safely
  const currentTeacher = isTeacher(modalData) ? modalData : null;

  //  Auto-switch to "single" if we are in Edit Mode
  useEffect(() => {
    if (currentTeacher) {
      setMethod("single");
    }
  }, [currentTeacher]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentTeacher ? `Edit ${currentTeacher.name}` : "Add New Teacher"}
    >
      <div className="space-y-6">
        {/* Only show Tab Switcher if we are NOT in edit mode */}
        {!currentTeacher && (
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
        )}

        {method === "single" ? (
          <div className="space-y-4">
            {/* Subtitle for Edit Mode */}
            {currentTeacher && (
              <p className="text-xs font-bold text-slate-400 uppercase">
                Updating Teacher ID: {currentTeacher.id}
              </p>
            )}
            <SingleTeacherInviteForm
              onSuccess={onClose}
              isSubmitting={isSubmitting}
              formErrors={errors}
              onSubmit={onSubmit}
              initialData={currentTeacher} // You'll need to update the form to accept this!
            />
          </div>
        ) : (
          <BulkTeacherUploadForm
            isSubmitting={isSubmitting}
            onBulkSubmit={onBulkSubmit}
            bulkErrors={teacherBulkErrors}
            onClearErrors={clearErrors}
          />
        )}
      </div>
    </Modal>
  );
};
