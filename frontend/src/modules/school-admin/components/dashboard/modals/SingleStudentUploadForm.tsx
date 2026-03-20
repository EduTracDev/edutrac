"use client";

import React, { useState } from "react";
import {
  Mail,
  Calendar,
  GraduationCap,
  User,
  Phone,
  Loader2,
  Hash,
  Sparkles,
} from "lucide-react";

interface SingleStudentUploadFormProps {
  isSubmitting: boolean;
  onStudentSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formErrors: Record<string, string>;
}

export const SingleStudentUploadForm = ({
  isSubmitting,
  onStudentSubmit,
  formErrors,
}: SingleStudentUploadFormProps) => {
  const [autoGenerateId, setAutoGenerateId] = useState(true);
  return (
    <form
      onSubmit={onStudentSubmit}
      className="space-y-4 animate-in fade-in duration-300"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            First Name
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              name="firstName"
              placeholder="Musa"
              className={`w-full bg-slate-50 border ${formErrors.firstName ? "border-red-500" : "border-slate-100"} rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#923CF9]/20 outline-none transition-all`}
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Last Name
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              name="lastName"
              placeholder="Adamu"
              className={`w-full bg-slate-50 border ${formErrors.lastName ? "border-red-500" : "border-slate-100"} rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#923CF9]/20 outline-none transition-all`}
            />
          </div>
        </div>
      </div>

      {/* Parent Contact Info Group */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Parent/Guardian Phone Number
          </label>
          <div className="relative">
            <Phone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              name="parentPhoneNumber"
              placeholder="0803..."
              className={`w-full bg-slate-50 border ${formErrors.parentPhoneNumber ? "border-red-500" : "border-slate-100"} rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#923CF9]/20 outline-none transition-all`}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Parent Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              name="email"
              type="email"
              placeholder="parent@mail.com"
              className={`w-full bg-slate-50 border ${formErrors.parentEmail ? "border-red-500" : "border-slate-100"} rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#923CF9]/20 outline-none transition-all`}
            />
          </div>
        </div>
      </div>

      {/* Admission Number with Auto-Generate Toggle */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between ml-1">
          <label className="text-[10px] font-black uppercase text-slate-400">
            Admission No.
          </label>
          <button
            type="button"
            onClick={() => setAutoGenerateId(!autoGenerateId)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all ${
              autoGenerateId
                ? "bg-[#923CF9]/10 border-[#923CF9]/20 text-[#923CF9]"
                : "bg-slate-50 border-slate-200 text-slate-400"
            }`}
          >
            <Sparkles size={10} />
            <span className="text-[9px] font-bold uppercase">
              Auto-generate
            </span>
          </button>
        </div>

        <div className="relative">
          <Hash
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            name="studentId"
            disabled={autoGenerateId}
            placeholder={
              autoGenerateId
                ? "System will generate ID..."
                : "e.g. ADM/2026/001"
            }
            className={`w-full bg-slate-50 border ${
              formErrors.studentId ? "border-red-500" : "border-slate-100"
            } rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#923CF9]/20 outline-none transition-all ${
              autoGenerateId
                ? "opacity-50 cursor-not-allowed italic"
                : "opacity-100"
            }`}
          />
        </div>
        {formErrors.studentId && (
          <p className="text-[9px] text-red-500 font-bold ml-1">
            {formErrors.studentId}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Gender Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase text-slate-400 ml-1">
            Gender
          </label>
          <select
            name="gender"
            className={`w-full bg-slate-50 border ${formErrors.gender ? "border-red-500" : "border-slate-100"} rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all appearance-none`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.gender && (
            <p className="text-[10px] text-red-500 font-bold ml-1">
              {formErrors.gender}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase text-slate-400 ml-1">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              name="dateOfBirth"
              type="date"
              className={`w-full bg-slate-50 border ${formErrors.dateOfBirth ? "border-red-500" : "border-slate-100"} rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all`}
            />
          </div>
          {formErrors.dateOfBirth && (
            <p className="text-[10px] text-red-500 font-bold ml-1">
              {formErrors.dateOfBirth}
            </p>
          )}
        </div>
      </div>

      {/* Class Assignment */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase text-slate-400 ml-1">
          Class Assignment
        </label>
        <div className="relative">
          <GraduationCap
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <select
            name="classId"
            className={`w-full bg-slate-50 border ${formErrors.classId ? "border-red-500" : "border-slate-100"} rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all appearance-none`}
          >
            <option value="">Assign to a Class</option>
            <option value="pri-1">Primary 1</option>
            <option value="pri-2">Primary 2</option>
          </select>
        </div>
        {formErrors.classId && (
          <p className="text-[10px] text-red-500 font-bold ml-1">
            {formErrors.classId}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1C1C1C] hover:bg-black text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Enroll Student"
        )}
      </button>
    </form>
  );
};
