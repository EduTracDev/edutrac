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
  const [totalRows, setTotalRows] = useState(0); // For accurate counting

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClearErrors();
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);

      // Parse the whole file to get the total count + first 5 for preview
      Papa.parse<TeacherCSVRow>(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setTotalRows(results.data.length);
          setPreviewData(results.data.slice(0, 5));
        },
      });
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewData([]);
    setTotalRows(0);
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
        {/* Template Download Card */}
        <div className="bg-[#923CF9]/5 border border-[#923CF9]/10 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">
              Download Template
            </h4>
            <p className="text-xs text-slate-500">
              Ensure your staff data matches our system.
            </p>
          </div>
          <button
            onClick={downloadCSVTemplate}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-[#923CF9] text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <DownloadCloud size={16} className="text-[#923CF9]" />
            Teacher CSV
          </button>
        </div>

        {!file ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 hover:border-[#923CF9] transition-colors cursor-pointer relative group">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-slate-50 p-4 rounded-2xl mb-4 group-hover:bg-[#923CF9]/10 transition-colors">
              <Table
                className="text-slate-400 group-hover:text-[#923CF9]"
                size={32}
              />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Click to upload staff list
            </p>
            <p className="text-xs text-slate-400 mt-1">CSV files only</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            {/* File Status Header */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Table className="text-[#923CF9]" size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 truncate max-w-[180px] leading-tight">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-black uppercase">
                    {totalRows} Teachers Detected
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Preview Table */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-100 flex items-center gap-2">
                <Eye size={14} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Preview (Top 5)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="bg-slate-50/30 text-slate-400 font-black uppercase text-[9px] border-b border-slate-100">
                      <th className="px-4 py-2">Full Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {previewData.map((row, i) => (
                      <tr key={i} className="text-slate-600">
                        <td className="px-4 py-3 font-bold">
                          {row["Full Name"] || row.fullName || "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {row["Email"] || row.email || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[9px] font-bold">
                            {row["Role"] || row.role || "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verification Badge */}
            {bulkErrors.length === 0 && !isSubmitting && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in zoom-in-95">
                <div className="bg-emerald-500 p-2 rounded-full">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-900 leading-tight">
                    Structure Verified
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Invitations will be sent to {totalRows} verified emails.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => file && onBulkSubmit(file)}
          disabled={!file || isSubmitting || bulkErrors.length > 0}
          className="w-full bg-[#1C1C1C] hover:bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-200"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <ShieldCheck size={18} /> Confirm & Dispatch{" "}
              {totalRows > 0 ? totalRows : ""} Invites
            </>
          )}
        </button>
      </div>
      <CSVErrorList errors={bulkErrors} type="Teacher" />
    </>
  );
};
