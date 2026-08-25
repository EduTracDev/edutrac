"use client";

import React, { useState } from "react";
import {
  AnnouncementFormData,
  AnnouncementFormErrors,
  AnnouncementAudienceRole,
  validateAnnouncementForm,
} from "../types/announcement.types";
import { FormField } from "./FormField";

interface AnnouncementFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AnnouncementFormData) => Promise<void>;
  schools: { id: string; name: string }[];
}

const DEFAULT_FORM: AnnouncementFormData = {
  title: "",
  content: "",
  priority: "Normal",
  targetType: "All",
  selectedSchoolIds: [],
  targetRoles: ["School Admins", "Teachers"],
  scheduleType: "Immediate",
  scheduledAt: "",
};

export function AnnouncementFormModal({
  isOpen,
  onClose,
  onSubmit,
  schools,
}: AnnouncementFormModalProps) {
  const [formData, setFormData] = useState<AnnouncementFormData>(DEFAULT_FORM);
  const [errors, setErrors] = useState<AnnouncementFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AnnouncementFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleToggle = (role: AnnouncementAudienceRole) => {
    setFormData((prev) => {
      const exists = prev.targetRoles.includes(role);
      const updated = exists
        ? prev.targetRoles.filter((r) => r !== role)
        : [...prev.targetRoles, role];
      return { ...prev, targetRoles: updated };
    });
    if (errors.targetRoles) setErrors((prev) => ({ ...prev, targetRoles: undefined }));
  };

  const handleSchoolToggle = (schoolId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedSchoolIds.includes(schoolId);
      const updated = exists
        ? prev.selectedSchoolIds.filter((id) => id !== schoolId)
        : [...prev.selectedSchoolIds, schoolId];
      return { ...prev, selectedSchoolIds: updated };
    });
    if (errors.selectedSchoolIds) setErrors((prev) => ({ ...prev, selectedSchoolIds: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAnnouncementForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData(DEFAULT_FORM);
      onClose();
    } catch (err) {
      console.error("Failed to publish announcement:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ALL_ROLES: AnnouncementAudienceRole[] = ["School Admins", "Teachers", "Parents", "Students"];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Create Platform Announcement</h2>
            <p className="text-xs text-slate-500">
              Dispatch system updates or critical alerts across EduTrac.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Message Content */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              1. Announcement Content
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  placeholder="e.g., Scheduled Maintenance Window"
                  required
                />
              </div>
              <FormField
                label="Priority Level"
                name="priority"
                isSelect
                value={formData.priority}
                onChange={handleChange}
                options={[
                  { label: "Normal", value: "Normal" },
                  { label: "Important", value: "Important" },
                  { label: "Urgent Alert", value: "Urgent" },
                ]}
              />
            </div>

            <FormField
              label="Content Message"
              name="content"
              isTextArea
              value={formData.content}
              onChange={handleChange}
              error={errors.content}
              placeholder="Write the announcement body here..."
              required
            />
          </div>

          <hr className="border-slate-100" />

          {/* Section 2: Audience Targeting */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              2. Target Audience
            </h3>

            {/* School Scope */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Target Institutions
              </label>
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="targetType"
                    value="All"
                    checked={formData.targetType === "All"}
                    onChange={handleChange}
                    className="text-indigo-600"
                  />
                  <span>All Registered Schools</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="targetType"
                    value="Specific"
                    checked={formData.targetType === "Specific"}
                    onChange={handleChange}
                    className="text-indigo-600"
                  />
                  <span>Specific Schools Only</span>
                </label>
              </div>

              {formData.targetType === "Specific" && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg max-h-36 overflow-y-auto space-y-1 mt-2">
                  {schools.map((school) => (
                    <label key={school.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.selectedSchoolIds.includes(school.id)}
                        onChange={() => handleSchoolToggle(school.id)}
                        className="rounded border-slate-300 text-indigo-600"
                      />
                      <span>{school.name}</span>
                    </label>
                  ))}
                  {errors.selectedSchoolIds && (
                    <p className="text-xs text-red-600 mt-1">{errors.selectedSchoolIds}</p>
                  )}
                </div>
              )}
            </div>

            {/* Audience Roles */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Target Roles *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {ALL_ROLES.map((role) => {
                  const isSelected = formData.targetRoles.includes(role);
                  return (
                    <button
                      type="button"
                      key={role}
                      onClick={() => handleRoleToggle(role)}
                      className={`p-2 rounded-lg border text-xs font-semibold transition-colors text-center ${
                        isSelected
                          ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
              {errors.targetRoles && <p className="text-xs text-red-600">{errors.targetRoles}</p>}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3: Publishing Schedule */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              3. Dispatch Schedule
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Dispatch Mode"
                name="scheduleType"
                isSelect
                value={formData.scheduleType}
                onChange={handleChange}
                options={[
                  { label: "Publish Immediately", value: "Immediate" },
                  { label: "Schedule for Later", value: "Scheduled" },
                ]}
              />

              {formData.scheduleType === "Scheduled" && (
                <FormField
                  label="Publish Date & Time"
                  type="datetime-local"
                  name="scheduledAt"
                  value={formData.scheduledAt || ""}
                  onChange={handleChange}
                  error={errors.scheduledAt}
                  required
                />
              )}
            </div>
          </div>

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
              {isSubmitting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {formData.scheduleType === "Scheduled" ? "Schedule Announcement" : "Dispatch Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}