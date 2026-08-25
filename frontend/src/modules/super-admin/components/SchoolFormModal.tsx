"use client";

import React, { useState, useEffect } from "react";
import { SchoolFormData, FormErrors, validateSchoolForm } from "../types/schoolForm.types";
import { FormField } from "./FormField";

interface SchoolFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SchoolFormData) => Promise<void>;
  initialData?: SchoolFormData | null; // Pass data to switch to Edit mode
}

const DEFAULT_FORM_DATA: SchoolFormData = {
  name: "",
  code: "",
  email: "",
  phone: "",
  address: "",
  adminName: "",
  adminEmail: "",
  plan: "Trial",
  maxStudents: 500,
  status: "Pending",
};

export function SchoolFormModal({ isOpen, onClose, onSubmit, initialData }: SchoolFormModalProps) {
  const [formData, setFormData] = useState<SchoolFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(DEFAULT_FORM_DATA);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));

    // Clear field error on change
    if (errors[name as keyof SchoolFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSchoolForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error("Failed to submit school form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditMode ? `Edit School: ${initialData?.name}` : "Register New School"}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode ? "Update institution settings, admin details, or subscription status." : "Fill in the parameters to onboard a new institution into EduTrac."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Institution Details */}
          <div>
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
              1. Institution Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="School Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="e.g., St. Jude International Academy"
                required
              />
              <FormField
                label="School Code ID"
                name="code"
                value={formData.code}
                onChange={handleChange}
                error={errors.code}
                placeholder="e.g., SJIA-01"
                disabled={isEditMode} // Immutable code once registered
                required
              />
              <FormField
                label="Official Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="info@stjude.edu"
                required
              />
              <FormField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+1 (555) 019-2834"
                required
              />
            </div>
            <div className="mt-4">
              <FormField
                label="Physical Address"
                name="address"
                isTextArea
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                placeholder="123 Education Way, Campus District..."
                required
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2: Primary Administrator */}
          <div>
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
              2. Primary Administrator Account
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Admin Full Name"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                error={errors.adminName}
                placeholder="Dr. Eleanor Vance"
                required
              />
              <FormField
                label="Admin Work Email"
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                error={errors.adminEmail}
                placeholder="e.vance@stjude.edu"
                required
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3: Subscription & Capacity */}
          <div>
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
              3. Subscription & Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="SaaS Plan"
                name="plan"
                isSelect
                value={formData.plan}
                onChange={handleChange}
                options={[
                  { label: "Trial (14 Days)", value: "Trial" },
                  { label: "Standard", value: "Standard" },
                  { label: "Pro Tier", value: "Pro" },
                  { label: "Enterprise Custom", value: "Enterprise" },
                ]}
              />
              <FormField
                label="Student Capacity"
                type="number"
                name="maxStudents"
                value={formData.maxStudents}
                onChange={handleChange}
                error={errors.maxStudents}
                required
              />
              <FormField
                label="Account Status"
                name="status"
                isSelect
                value={formData.status}
                onChange={handleChange}
                options={[
                  { label: "Pending Setup", value: "Pending" },
                  { label: "Active", value: "Active" },
                  { label: "Suspended", value: "Suspended" },
                ]}
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSubmitting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isEditMode ? "Save Changes" : "Register Institution"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}