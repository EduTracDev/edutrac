"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Teacher } from "@/modules/types/dashboard";
import { TeacherFormData, teacherBaseSchema } from "@/utils/validation";

interface SingleTeacherInviteFormProps {
  initialData?: Teacher | null;
  onSuccess: () => void;
  isSubmitting: boolean;
  formErrors: { [key: string]: string };
  onSubmit: (data: TeacherFormData) => Promise<void>;
}

export const SingleTeacherInviteForm = ({
  initialData,
  onSuccess,
  isSubmitting,
  formErrors,
  onSubmit,
}: SingleTeacherInviteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: localErrors },
  } = useForm<TeacherFormData>({
    resolver: yupResolver(teacherBaseSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      subject: initialData?.subject || "",
      role: (initialData?.role as TeacherFormData["role"]) || "Subject Teacher",
      assignedClass: initialData?.assignedClass || "",
    },
  });

  useEffect(() => {
    // If we have initialData, we are in EDIT mode
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        email: initialData.email ?? "",
        subject: initialData.subject ?? "",
        // The 'as' assertion tells TS this string is definitely a valid Role
        role:
          (initialData.role as TeacherFormData["role"]) || "Subject Teacher",
        assignedClass: initialData.assignedClass ?? "",
      });
    }
    // If initialData is null, we are in ADD mode (Reset to empty)
    else {
      reset({
        name: "",
        email: "",
        subject: "",
        role: "Subject Teacher",
        assignedClass: "",
      });
    }
  }, [initialData, reset]);
  const handleFormSubmit = async (data: TeacherFormData) => {
    try {
      await onSubmit(data);
      onSuccess();
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  // Helper to merge server-side errors with client-side validation
  const getErrorMessage = (field: keyof TeacherFormData) =>
    localErrors[field]?.message || formErrors[field];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Full Name
        </label>
        <input
          {...register("name")}
          placeholder="Fatimah Adebimpe"
          className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
        {getErrorMessage("name") && (
          <p className="text-[10px] font-bold text-red-500 px-1">
            {getErrorMessage("name")}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="fatimah@edutrac.com"
          className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
        {getErrorMessage("email") && (
          <p className="text-[10px] font-bold text-red-500 px-1">
            {getErrorMessage("email")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Subject */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
            Subject
          </label>
          <input
            {...register("subject")}
            placeholder="Mathematics"
            className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
          />
        </div>

        {/* Assigned Class */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
            Class
          </label>
          <input
            {...register("assignedClass")}
            placeholder="JSS 1"
            className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
          />
        </div>
      </div>

      {/* Role Select */}
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Staff Role
        </label>
        <select
          {...register("role")}
          className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none appearance-none cursor-pointer"
        >
          <option value="Subject Teacher">Subject Teacher</option>
          <option value="Class Teacher">Class Teacher</option>
          <option value="HOD (Dept Head)">Dept Head</option>
          <option value="VP Academic">VP Academic</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 mt-2 bg-[#923CF9] text-white rounded-2xl text-sm font-black shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50"
      >
        {isSubmitting
          ? "Processing..."
          : initialData
            ? "Update Record"
            : "Send Invitation"}
      </button>
    </form>
  );
};
