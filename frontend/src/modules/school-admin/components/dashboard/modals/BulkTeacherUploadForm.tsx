"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import {
  Eye,
  Table,
  Trash2,
  ShieldCheck,
  Loader2,
  DownloadCloud,
} from "lucide-react";
import { TeacherCSVRow, CSVError } from "@/modules/types/dashboard";
import { CSVErrorList } from "../../CSVErrorList";

interface BulkTeacherUploadFormProps {
  isSubmitting: boolean;
  onBulkSubmit: (file: File) => Promise<void>;
  bulkErrors: CSVError[];
  onClearErrors: () => void;
}

export const BulkTeacherUploadForm = ({
  isSubmitting,
  onBulkSubmit,
  bulkErrors,
  onClearErrors,
}: BulkTeacherUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<TeacherCSVRow[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClearErrors();
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);

      // Parse for preview
      Papa.parse<TeacherCSVRow>(selectedFile, {
        header: true,
        preview: 5,
        skipEmptyLines: true,
        complete: (results) => {
          setPreviewData(results.data);
        },
      });
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewData([]);
    onClearErrors();
  };

  const downloadCSVTemplate = () => {
    const headers = ["Full Name", "Email", "Role", "Assigned Class"];
    const sampleData = [
      "Fatimah Adebimpe,fatimah@school.com,Subject Teacher,JS 3",
      "John Doe,john@school.com,Class Teacher,SS 1",
    ];

    const csvContent = [headers.join(","), ...sampleData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "teacher_upload_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="space-y-5">
        {/* ... Template Download ... */}
        <div className="bg-[#923CF9]/5 border border-[#923CF9]/10 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">
              Download Template
            </h4>
            <p className="text-xs text-slate-500">
              Use our format to ensure a smooth upload.
            </p>
          </div>
          <button
            onClick={downloadCSVTemplate}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-[#923CF9] text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <DownloadCloud size={16} className="text-[#923CF9]" />
            CSV Template
          </button>
        </div>
        {!file ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 hover:border-[#923CF9] transition-colors cursor-pointer relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-slate-50 p-4 rounded-2xl mb-4">
              <Table className="text-slate-400" size={32} />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Click to upload staff list
            </p>
            <p className="text-xs text-slate-400 mt-1">CSV files only</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            {/* File Info Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Table className="text-[#923CF9]" size={20} />
                <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">
                  {file.name}
                </span>
              </div>
              <button
                onClick={clearFile}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Data Preview Table */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center gap-2">
                <Eye size={14} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Preview (First 5 Rows)
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">
                {previewData.length} Total Records
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 font-bold border-b border-slate-100">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Class</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {previewData.map((row, i) => (
                      <tr key={i} className="text-slate-600">
                        <td className="px-4 py-2 truncate">
                          {row["Full Name"] || row.fullName || "—"}
                        </td>
                        <td className="px-4 py-2">
                          {row["Role"] || row.role || "—"}
                        </td>
                        <td className="px-4 py-2">
                          {row["Assigned Class"] || row.assignedClass || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/*  Add Validation Status Badge */}
            {file && bulkErrors.length === 0 && !isSubmitting && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in zoom-in-95">
                <div className="bg-emerald-500 p-2 rounded-full">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-emerald-900">
                    Structure Verified
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    All columns mapped correctly. Ready for dispatch.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => file && onBulkSubmit(file)}
          disabled={!file || isSubmitting || bulkErrors.length > 0} // Lock if errors exist
          className="w-full bg-[#1C1C1C] hover:bg-black text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <ShieldCheck size={18} /> Confirm & Dispatch Invites
            </>
          )}
        </button>
      </div>
      <CSVErrorList errors={bulkErrors} type="Teacher" />
    </>
  );
};
