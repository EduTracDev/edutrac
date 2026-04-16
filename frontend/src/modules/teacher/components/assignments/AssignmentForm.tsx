"use client";
import { useRef } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Paperclip, X } from "lucide-react";
import { AssignmentFormData } from "@/utils/validation";
import { FileUploader } from "./FileUploader";

interface FormProps {
  register: UseFormRegister<AssignmentFormData>;
  errors: FieldErrors<AssignmentFormData>;
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
}

export const AssignmentForm = ({
  register,
  errors,
  attachments,
  setAttachments,
}: FormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setAttachments((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Title / Headline
        </label>
        <input
          {...register("title")}
          placeholder="e.g. Introduction to Quadratic Equations"
          className={`w-full p-4 bg-slate-50 border ${
            errors.title ? "border-red-500" : "border-slate-100"
          } rounded-2xl outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-bold text-slate-700`}
        />
        {errors.title && (
          <p className="text-[10px] text-red-500 font-bold ml-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Instructions Field */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Instructions
        </label>
        <textarea
          {...register("description")}
          rows={6}
          placeholder="Describe the task..."
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700 resize-none"
        />
      </div>

      {/* File Upload Section */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Attachments
        </label>
        <FileUploader
          attachments={attachments}
          setAttachments={setAttachments}
        />
      </div>
    </div>
  );
};
