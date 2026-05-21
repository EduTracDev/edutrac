"use client";

import { useState, useEffect } from "react";
import { FileUploader } from "@/modules/shared/component/FileUploader";
import { Globe, MapPin, Phone, School, ArrowRight } from "lucide-react";
import { School as SchoolType } from "@/modules/types/dashboard";

export const SchoolInfoForm = ({
  onNext,
}: {
  onNext: (data: SchoolType) => void;
}) => {
  const [attachments, setAttachments] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const generatedSlug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }, [formData.name]);

  const isComplete =
    formData.name &&
    formData.address &&
    formData.phone &&
    attachments.length > 0;

  const handleSubmit = () => {
    onNext({ ...formData, logo: attachments[0] });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {/* Logo Upload Section */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          School Logo
        </label>
        <FileUploader
          attachments={attachments}
          setAttachments={setAttachments}
          label="Drop your school logo here"
        />
      </div>

      {/* Basic Info Fields */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Official School Name
          </label>
          <div className="relative">
            <School
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="text"
              placeholder="e.g. GreenTree Academy"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#923CF9] transition-all"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        {/* Dynamic Slug Preview */}
        <div className="p-6 bg-slate-900 rounded-3xl text-white overflow-hidden relative">
          <Globe
            className="absolute -right-2 -bottom-2 text-white/5"
            size={80}
          />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Your Unique Link
          </p>
          <div className="flex items-center gap-1 text-sm font-bold">
            <span className="text-slate-500">edutrac.app/</span>
            <span className="text-purple-400">
              {formData.slug || "your-school"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            School Address
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-4 top-4 text-slate-300"
              size={18}
            />
            <textarea
              rows={2}
              placeholder="Full address of the main campus"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#923CF9] transition-all resize-none"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Contact Phone
          </label>
          <div className="relative">
            <Phone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="tel"
              placeholder="+234..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#923CF9] transition-all"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <button
        disabled={!isComplete}
        onClick={handleSubmit}
        className="w-full py-5 bg-[#923CF9] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-100 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2"
      >
        Continue to Preview <ArrowRight size={14} />
      </button>
    </div>
  );
};
