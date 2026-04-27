"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Student } from "@/modules/types/dashboard";
import { StudentFormData, studentBaseSchema } from "@/utils/validation";
import { parentData } from "@/modules/constants/dashboard";

interface SingleStudentUploadFormProps {
  initialData?: Student | null;
  onSuccess: () => void;
  isSubmitting: boolean;
  formErrors: { [key: string]: string };
  onSubmit: (data: StudentFormData) => Promise<void>;
}

export const SingleStudentUploadForm = ({
  initialData,
  onSuccess,
  isSubmitting,
  formErrors,
  onSubmit,
}: SingleStudentUploadFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: localErrors },
  } = useForm<StudentFormData>({
    resolver: yupResolver(studentBaseSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "Male",
      classId: "",
      studentId: "",
      dateOfBirth: new Date(),
    },
  });

  useEffect(() => {
    if (initialData) {
      // 🛠️ Transform: Split full name into first/last for the form
      const [first, ...last] =
        "{initialData.firstName} $ {initialData.lastName}".split(" ");

      reset({
        firstName: first || "",
        lastName: last.join(" ") || "",
        gender: initialData.gender,
        classId: initialData.class,
        studentId: initialData.id,
        dateOfBirth: new Date(),
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: StudentFormData) => {
    await onSubmit(data);
    onSuccess();
  };

  const getErrorMessage = (field: keyof StudentFormData) =>
    (localErrors[field]?.message as string) || formErrors[field];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* 🚀 First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">First Name</label>
          <input
            {...register("firstName")}
            className={`w-full p-3 bg-slate-50 border ${getErrorMessage("firstName") ? "border-red-500" : "border-slate-100"} rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#923CF9]/5 transition-all`}
          />
          {getErrorMessage("firstName") && (
            <p className="text-[10px] text-red-500 font-bold">
              {getErrorMessage("firstName")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 🚀 Date of Birth & Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Gender</label>
          <select
            {...register("gender")}
            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none cursor-pointer"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#923CF9] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#7b2cd6] transition-all shadow-lg shadow-[#923CF9]/20 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting
          ? "Processing..."
          : initialData
            ? "Update Profile"
            : "Enroll Student"}
      </button>
    </form>
  );
};
