// @/modules/teacher/components/assignments/FileUploader.tsx
"use client";

import { useRef } from "react";
import { Paperclip, X } from "lucide-react";

interface FileUploaderProps {
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  label?: string; // Optional custom label
  allowMultiple?: boolean;
}

export const FileUploader = ({
  attachments,
  setAttachments,
  label = "Click to attach resources",
  allowMultiple = true,
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setAttachments((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple={allowMultiple}
        onChange={handleFileChange}
      />

      {/* The Clickable Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-100 rounded-[24px] flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-slate-50 hover:border-[#923CF9]/20 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#923CF9] transition-all">
          <Paperclip size={20} />
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600">
            {label}
          </p>
          <p className="text-[9px] text-slate-400 font-medium mt-1">
            PDF, DOCX, or Images (Max 10MB)
          </p>
        </div>
      </div>

      {/* Display List of Uploaded Files */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {attachments.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center gap-2 px-3 py-2 bg-[#923CF9]/5 rounded-xl border border-[#923CF9]/10 animate-in fade-in zoom-in duration-200"
            >
              <span className="text-[10px] font-bold text-[#923CF9] truncate max-w-[150px]">
                {file.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the click on the parent div
                  removeFile(idx);
                }}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
