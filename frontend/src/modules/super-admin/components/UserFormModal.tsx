"use client";

import React, { useState, useEffect } from "react";
import {
  UserFormData,
  UserFormErrors,
  validateUserForm,
} from "../types/userForm.types";
import { FormField } from "./FormField";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>;
  initialData?: UserFormData | null;
  schools: { id: string; name: string }[];
}

const DEFAULT_USER_DATA: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "Teacher",
  status: "Active",
  schoolId: "",
  employeeId: "",
  studentIdNumber: "",
  gradeLevel: "",
  parentGuardianEmail: "",
};

export function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  schools,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<UserFormData>(DEFAULT_USER_DATA);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(DEFAULT_USER_DATA);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error("Failed to submit user form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditMode
                ? `Edit User: ${initialData?.firstName} ${initialData?.lastName}`
                : "Create New User Account"}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode
                ? "Modify account profile, assigned school, or status."
                : "Provision a new user account across any EduTrac school."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto space-y-5 flex-1"
        >
          {/* Core Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <FormField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <FormField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <hr className="border-slate-100" />

          {/* Role & School Association */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="System Role"
              name="role"
              isSelect
              value={formData.role}
              onChange={handleChange}
              options={[
                { label: "Teacher", value: "Teacher" },
                { label: "Student", value: "Student" },
                { label: "School Admin", value: "School Admin" },
                { label: "Parent", value: "Parent" },
                { label: "Super Admin", value: "Super Admin" },
              ]}
              required
            />

            {formData.role !== "Super Admin" ? (
              <FormField
                label="Assigned School"
                name="schoolId"
                isSelect
                value={formData.schoolId}
                onChange={handleChange}
                error={errors.schoolId}
                options={[
                  { label: "-- Select School --", value: "" },
                  ...schools.map((s) => ({ label: s.name, value: s.id })),
                ]}
                required
              />
            ) : (
              <FormField
                label="Assigned Scope"
                name="schoolId"
                value="Global System-Wide"
                disabled
              />
            )}
          </div>

          {/* Role-Specific Conditional Fields */}
          {(formData.role === "Teacher" ||
            formData.role === "School Admin") && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Staff Details
              </p>
              <FormField
                label="Employee ID Number"
                name="employeeId"
                value={formData.employeeId || ""}
                onChange={handleChange}
                error={errors.employeeId}
                placeholder="EMP-8821"
                required
              />
            </div>
          )}

          {formData.role === "Student" && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Student Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  label="Student ID Number"
                  name="studentIdNumber"
                  value={formData.studentIdNumber || ""}
                  onChange={handleChange}
                  error={errors.studentIdNumber}
                  placeholder="STU-2026-90"
                  required
                />
                <FormField
                  label="Grade / Class Level"
                  name="gradeLevel"
                  value={formData.gradeLevel || ""}
                  onChange={handleChange}
                  placeholder="e.g., Grade 10-A"
                />
              </div>
              <FormField
                label="Parent / Guardian Email"
                type="email"
                name="parentGuardianEmail"
                value={formData.parentGuardianEmail || ""}
                onChange={handleChange}
                error={errors.parentGuardianEmail}
                placeholder="parent@example.com"
              />
            </div>
          )}

          {/* Status Select */}
          <FormField
            label="Account Status"
            name="status"
            isSelect
            value={formData.status}
            onChange={handleChange}
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
              { label: "Pending Setup", value: "Pending" },
              { label: "Suspended", value: "Suspended" },
            ]}
          />

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {isEditMode ? "Update User Account" : "Create User Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
