"use client";

import React from "react";
import { Loader2, Save } from "lucide-react";

interface SingleParentUploadFormProps {
  isSubmitting: boolean;
  formErrors: { [key: string]: string };
  onParentSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const SingleParentUploadForm = ({
  isSubmitting,
  formErrors,
  onParentSubmit,
}: SingleParentUploadFormProps) => {
  return (
    <form onSubmit={onParentSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">FULL NAME</label>
          <input
            name="fullName"
            type="text"
            placeholder="e.g. Babatunde Uchenna"
            className={`w-full p-3.5 bg-slate-50 border ${
              formErrors.fullName ? "border-red-500" : "border-slate-100"
            } rounded-2xl text-sm focus:outline-none focus:border-[#923CF9] transition-all`}
          />
          {formErrors.fullName && (
            <p className="text-[10px] text-red-500 font-medium">
              {formErrors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            EMAIL ADDRESS
          </label>
          <input
            name="email"
            type="email"
            placeholder="parent@email.com"
            className={`w-full p-3.5 bg-slate-50 border ${
              formErrors.email ? "border-red-500" : "border-slate-100"
            } rounded-2xl text-sm focus:outline-none focus:border-[#923CF9] transition-all`}
          />
          {formErrors.email && (
            <p className="text-[10px] text-red-500 font-medium">
              {formErrors.email}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            PHONE NUMBER
          </label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="080..."
            className={`w-full p-3.5 bg-slate-50 border ${
              formErrors.phoneNumber ? "border-red-500" : "border-slate-100"
            } rounded-2xl text-sm focus:outline-none focus:border-[#923CF9] transition-all`}
          />
          {formErrors.phoneNumber && (
            <p className="text-[10px] text-red-500 font-medium">
              {formErrors.phoneNumber}
            </p>
          )}
        </div>

        {/* Relationship */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            RELATIONSHIP
          </label>
          <select
            name="relationship"
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-[#923CF9] appearance-none"
          >
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Occupation */}

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">OCCUPATION</label>
        <input
          name="occupation"
          type="text"
          placeholder="Engineer"
          className={`w-full p-3.5 bg-slate-50 border ${
            formErrors.occupation ? "border-red-500" : "border-slate-100"
          } rounded-2xl text-sm focus:outline-none focus:border-[#923CF9] transition-all`}
        />
        {formErrors.occupation && (
          <p className="text-[10px] text-red-500 font-medium">
            {formErrors.occupation}
          </p>
        )}
      </div>
      {/* Address */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">
          RESIDENTIAL ADDRESS
        </label>
        <textarea
          name="address"
          rows={2}
          placeholder="Enter full home address..."
          className={`w-full p-3.5 bg-slate-50 border ${
            formErrors.address ? "border-red-500" : "border-slate-100"
          } rounded-2xl text-sm focus:outline-none focus:border-[#923CF9] transition-all resize-none`}
        />
        {formErrors.address && (
          <p className="text-[10px] text-red-500 font-medium">
            {formErrors.address}
          </p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        className="w-full bg-[#923CF9] hover:bg-[#7b2cd6] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#923CF9]/20"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            <Save size={18} /> Complete Registration
          </>
        )}
      </button>
    </form>
  );
};
