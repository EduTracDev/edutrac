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

import { StudentCSVRow, CSVError } from "@/modules/types/dashboard";
import { CSVErrorList } from "../../CSVErrorList";
import { parentData } from "@/modules/constants/dashboard";

interface BulkStudentUploadFormProps {
  isSubmitting: boolean;
  onBulkSubmit: (file: File) => Promise<void>;
  bulkErrors: CSVError[];
  onClearErrors: () => void;
}

export const BulkStudentUploadForm = ({
  isSubmitting,
  onBulkSubmit,
  bulkErrors,
  onClearErrors,
}: BulkStudentUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<StudentCSVRow[]>([]);
  const [totalRows, setTotalRows] = useState(0); // Added for accurate counting

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      onClearErrors();
      setFile(selectedFile);

      // Parse for preview and total count
      Papa.parse<StudentCSVRow>(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setTotalRows(results.data.length);
          setPreviewData(results.data.slice(0, 5)); // Just take the first 5 for the UI
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
    const headers = [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "class",
      "email",
    ];
    const sampleData = [
      "Musa,Adamu,Male,2015-05-20,Primary 4,musa.a@school.com",
    ];

    const csvContent = [headers.join(","), ...sampleData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "student_upload_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getParents = (parentIds?: string) => {
    if (!parentIds) return [];

    return parentIds
      .split(",")
      .map((id) => parentData.find((p) => p.id.trim() === id.trim()))
      .filter(Boolean);
  };

  return (
    <>
      <div className="space-y-5">
        {/* Template Download Section */}
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
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 hover:border-[#923CF9] transition-colors cursor-pointer relative group">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-slate-50 p-4 rounded-2xl mb-4 group-hover:bg-[#923CF9]/5 transition-colors">
              <Table
                className="text-slate-400 group-hover:text-[#923CF9]"
                size={32}
              />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Click to upload student list
            </p>
            <p className="text-xs text-slate-400 mt-1">CSV files only</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            {/* File Info Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Table className="text-[#923CF9]" size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {totalRows} Records found
                  </span>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Data Preview Table */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-slate-400" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                    Preview (First 5 Rows)
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 font-black uppercase text-[9px] border-b border-slate-100">
                      <th className="px-4 py-3">First Name</th>
                      <th className="px-4 py-3">Last Name</th>
                      <th className="px-4 py-3">Gender</th>
                      <th className="px-4 py-3">Class</th>
                      <th className="px-4 py-3">Date of Birth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {previewData.map((row, i) => (
                      <tr
                        key={i}
                        className="text-slate-600 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">
                          {row["firstName"] || row.firstName || "—"}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {row["lastName"] || row.lastName || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {row["gender"] || row.gender || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {row["class"] || row.class || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {row["dateOfBirth"] || row.dateOfBirth || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Validation Status */}
            {bulkErrors.length === 0 && !isSubmitting && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in zoom-in-95">
                <div className="bg-emerald-500 p-2 rounded-full">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-emerald-900">
                    Structure Verified
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    All columns mapped correctly. {totalRows} students ready for
                    enrollment.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => file && onBulkSubmit(file)}
          disabled={!file || isSubmitting || bulkErrors.length > 0}
          className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-200"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <ShieldCheck size={18} /> Enroll {totalRows > 0 ? totalRows : ""}{" "}
              Students
            </>
          )}
        </button>
      </div>
      <CSVErrorList errors={bulkErrors} type="Student" />
    </>
  );
};
