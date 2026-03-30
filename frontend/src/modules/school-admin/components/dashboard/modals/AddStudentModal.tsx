"use client";

import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import { UserPlus, Users } from "lucide-react";
import { SingleStudentUploadForm } from "./SingleStudentUploadForm";
import { BulkStudentUploadForm } from "./BulkStudentUploadForm";
import { CSVError, Student } from "@/modules/types/dashboard";
import { StudentFormData } from "@/utils/validation";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";

type EntryMethod = "single" | "bulk";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => Promise<void>;
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
  const { modalData } = useModals();

  const isStudent = (data: unknown): data is Student => {
    // Check if data is an object and not null
    const isObject = typeof data === "object" && data !== null;

    return isObject && "subject" in (data as Record<string, unknown>);
  };

  const currentStudent = isStudent(modalData) ? modalData : null;

  //  Auto-switch to "single" if we are in Edit Mode
  useEffect(() => {
    if (currentStudent) {
      setMethod("single");
    }
  }, [currentStudent]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        currentStudent
          ? `Edit ${currentStudent.firstName ?? ""} ${currentStudent.lastName ?? ""}`.trim()
          : "Add New Student"
      }
    >
      <div className="space-y-6">
        {/* Only show Tab Switcher if we are NOT in edit mode */}
        {!currentStudent && (
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

        {/* Conditional Form Rendering */}
        {method === "single" ? (
          <div className="space-y-4">
            {/* Subtitle for Edit Mode */}
            {currentStudent && (
              <p className="text-xs font-bold text-slate-400 uppercase">
                Updating Teacher ID: {currentStudent.id}
              </p>
            )}
            <SingleStudentUploadForm
              onSuccess={onClose}
              isSubmitting={isSubmitting}
              formErrors={errors}
              onSubmit={onSubmit}
              initialData={currentStudent}
            />
          </div>
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
