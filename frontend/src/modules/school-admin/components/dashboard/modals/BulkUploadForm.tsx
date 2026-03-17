"use client";

import React, { useState } from "react";
import {
  Download,
  Upload,
  FileText,
  X,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

export const BulkUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Generate and Download CSV Template
  const downloadTemplate = () => {
    const headers = ["Full Name", "Email", "Role", "Assigned Class"];
    const rows = [
      ["Chinedu Azikiwe", "chinedu@school.com", "Subject Teacher", "JSS 3A"],
      ["Fatima Abubakar", "fatima@school.com", "Class Teacher", "SSS 1B"],
    ];

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Teacher_Bulk_Invite_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Template downloaded!");
  };

  // 2. Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  // 3. Handle Bulk Submission
  const handleBulkSubmit = async () => {
    if (!file) return;
    setIsUploading(true);

    const loading = toast.loading("Processing staff list...");

    try {
      // Logic for parsing file (PapaParse is great here) or sending to Firebase/API
      await new Promise((resolve) => setTimeout(resolve, 2500));

      toast.success("Bulk invites dispatched successfully!", { id: loading });
      setFile(null);
    } catch (error) {
      toast.error("Error uploading file", { id: loading });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Step 1: Download Template */}
      <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-black text-blue-900 uppercase">
              Step 1: Get Template
            </h4>
            <p className="text-[10px] text-blue-600/70 leading-tight">
              Use our format for faster processing
            </p>
          </div>
        </div>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
          <Download size={14} /> DOWNLOAD
        </button>
      </div>

      {/* Step 2: Upload File */}
      {!file ? (
        <label className="border-2 border-dashed border-slate-200 rounded-[28px] p-10 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#923CF9] hover:bg-purple-50/30 transition-all cursor-pointer group">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="h-14 w-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-[#923CF9] group-hover:text-white transition-all shadow-sm">
            <Upload size={28} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Upload Staff List</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[180px] mx-auto">
              Click to browse or drag and drop your completed CSV
            </p>
          </div>
        </label>
      ) : (
        <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-5 flex items-center justify-between animate-in zoom-in duration-200">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-slate-900 text-sm truncate max-w-[150px]">
                {file.name}
              </h4>
              <p className="text-[10px] text-slate-500 uppercase font-black">
                {(file.size / 1024).toFixed(1)} KB • READY
              </p>
            </div>
          </div>
          <button
            onClick={() => setFile(null)}
            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleBulkSubmit}
        disabled={!file || isUploading}
        className="w-full py-4 bg-[#923CF9] text-white rounded-2xl font-black text-sm shadow-lg shadow-purple-100 hover:bg-[#8126e8] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none"
      >
        {isUploading ? (
          <>
            <Loader2 className="animate-spin" size={18} /> PROCESSING LIST...
          </>
        ) : (
          <>
            <ShieldCheck size={18} /> Dispatch Bulk Invites
          </>
        )}
      </button>
    </div>
  );
};
