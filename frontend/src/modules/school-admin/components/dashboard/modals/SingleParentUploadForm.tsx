"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Parent } from "@/modules/types/dashboard";
import { ParentFormData, parentBaseSchema } from "@/utils/validation";

interface SingleParentUploadFormProps {
  initialData?: Parent | null;
  onSuccess: () => void;
  isSubmitting: boolean;
  formErrors: { [key: string]: string };
  onSubmit: (data: ParentFormData) => Promise<void>;
}

export const SingleParentUploadForm = ({
  initialData,
  onSuccess,
  isSubmitting,
  formErrors,
  onSubmit,
}: SingleParentUploadFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: localErrors },
  } = useForm<ParentFormData>({
    resolver: yupResolver(parentBaseSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      occupation: initialData?.occupation || "",
      address: initialData?.address || "",
      phoneNumber: initialData?.phoneNumber || "",
      emergencyContact: initialData?.emergencyContact || "",
    },
  });

  useEffect(() => {
    // If we have initialData, we are in EDIT mode
    if (initialData) {
      reset({
        fullName: initialData.fullName ?? "",
        email: initialData.email ?? "",
        address: initialData.address ?? "",
        occupation: initialData.occupation ?? "",
        phoneNumber: initialData.phoneNumber ?? "",
        emergencyContact: initialData.emergencyContact ?? "",
      });
    } else {
      reset({
        fullName: "",
        email: "",
        occupation: "",
        address: "",
        phoneNumber: "",
        emergencyContact: "",
      });
    }
  }, [initialData, reset]);
  const handleFormSubmit = async (data: ParentFormData) => {
    try {
      await onSubmit(data);
      onSuccess();
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  // Helper to merge server-side errors with client-side validation
  const getErrorMessage = (field: keyof ParentFormData) =>
    localErrors[field]?.message || formErrors[field];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Full Name
        </label>
        <input
          {...register("fullName")}
          placeholder="e.g. Chinedu Okonkwo"
          className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 focus:ring-4 focus:ring-[#923CF9]/5 transition-all outline-none"
        />
        {getErrorMessage("fullName") && (
          <p className="text-[10px] font-bold text-red-500 px-1">
            {getErrorMessage("fullName")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="parent@example.com"
          className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#923CF9]/20 transition-all outline-none"
        />
        {getErrorMessage("email") && (
          <p className="text-[10px] font-bold text-red-500 px-1">
            {getErrorMessage("email")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            placeholder="080..."
            className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white transition-all outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
            Occupation
          </label>
          <input
            {...register("occupation")}
            placeholder="Software Engineer"
            className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white transition-all outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
            EmergenCy Contact
          </label>
          <input
            {...register("emergencyContact")}
            placeholder="080..."
            className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white transition-all outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
            Occupation
          </label>
          <input
            {...register("occupation")}
            placeholder="Software Engineer"
            className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white transition-all outline-none"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Home Address
        </label>
        <input
          {...register("address")}
          placeholder="123 Lekki Phase 1, Lagos"
          className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white transition-all outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 mt-2 bg-[#923CF9] text-white rounded-2xl text-sm font-black shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 transition-all disabled:opacity-50"
      >
        {isSubmitting
          ? "Processing..."
          : initialData
            ? "Update Record"
            : "Register Parent"}
      </button>
    </form>
  );
};
