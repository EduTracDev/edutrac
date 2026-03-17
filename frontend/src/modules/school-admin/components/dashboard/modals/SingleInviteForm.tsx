"use client";

import React from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

interface SingleInviteFormProps {
  onSuccess: () => void;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const SingleInviteForm = ({
  isSubmitting,
  formErrors,
  onSubmit,
}: SingleInviteFormProps) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="e.g. Chinedu Azikiwe"
            className={`w-full p-3.5 bg-slate-50 rounded-xl border-none text-sm outline-none transition-all ${
              formErrors.name
                ? "ring-2 ring-red-500 bg-red-50/50"
                : "focus:ring-2 focus:ring-purple-200"
            }`}
          />
          {formErrors.name && (
            <p className="text-[10px] font-bold text-red-500 ml-1">
              {formErrors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="chinedu@school.com"
            className={`w-full p-3.5 bg-slate-50 rounded-xl border-none text-sm outline-none transition-all ${
              formErrors.email
                ? "ring-2 ring-red-500 bg-red-50/50"
                : "focus:ring-2 focus:ring-purple-200"
            }`}
          />
          {formErrors.email && (
            <p className="text-[10px] font-bold text-red-500 ml-1">
              {formErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Role Selection */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Staff Role
          </label>
          <select
            name="role"
            className={`w-full p-3.5 bg-slate-50 rounded-xl border-none text-sm outline-none transition-all appearance-none ${
              formErrors.role
                ? "ring-2 ring-red-500 bg-red-50/50"
                : "focus:ring-2 focus:ring-purple-200"
            }`}
          >
            <option value="">Select a role...</option>
            <option value="Subject Teacher">Subject Teacher</option>
            <option value="Class Teacher">Class Teacher</option>
            <option value="HOD (Dept Head)">HOD (Dept Head)</option>
            <option value="VP Academic">VP Academic</option>
          </select>
          {formErrors.role && (
            <p className="text-[10px] font-bold text-red-500 ml-1">
              {formErrors.role}
            </p>
          )}
        </div>

        {/* Assigned Class */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Assigned Class
          </label>
          <input
            name="assignedClass"
            type="text"
            placeholder="e.g. JSS 3A"
            className={`w-full p-3.5 bg-slate-50 rounded-xl border-none text-sm outline-none transition-all ${
              formErrors.assignedClass
                ? "ring-2 ring-red-500 bg-red-50/50"
                : "focus:ring-2 focus:ring-purple-200"
            }`}
          />
          {formErrors.assignedClass && (
            <p className="text-[10px] font-bold text-red-500 ml-1">
              {formErrors.assignedClass}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#923CF9] text-white rounded-2xl font-black text-sm shadow-lg shadow-purple-50 hover:bg-[#8126e8] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            INVITING TEACHER...
          </>
        ) : (
          <>
            <ShieldCheck size={18} /> Send Professional Invite
          </>
        )}
      </button>
    </form>
  );
};
