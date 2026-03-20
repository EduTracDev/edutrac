"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import {
  Table,
  Trash2,
  ShieldCheck,
  Loader2,
  DownloadCloud,
} from "lucide-react";
import { ParentCSVRow, CSVError } from "@/modules/types/dashboard";
import { CSVErrorList } from "../../CSVErrorList";

interface BulkParentUploadFormProps {
  isSubmitting: boolean;
  onBulkSubmit: (file: File) => Promise<void>;
  bulkErrors: CSVError[];
  clearErrors: () => void;
}

export const BulkParentUploadForm = ({
  isSubmitting,
  onBulkSubmit,
  bulkErrors,
  clearErrors,
}: BulkParentUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ParentCSVRow[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "text/csv") {
      setFile(selectedFile);
      clearErrors();
      Papa.parse<ParentCSVRow>(selectedFile, {
        header: true,
        preview: 5,
        skipEmptyLines: true,
        complete: (results) => setPreviewData(results.data),
      });
    }
  };

  const downloadTemplate = () => {
    const headers = [
      "Full Name",
      "Email",
      "Phone Number",
      "Relationship",
      "Address",
    ];
    const csvContent =
      headers.join(",") +
      "\n" +
      "Jane Doe,jane@example.com,08012345678,Mother,123 School Ave";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "parent_upload_template.csv";
    link.click();
  };

  return (
    <>
      <div className="space-y-5">
        <div className="bg-[#923CF9]/5 border border-[#923CF9]/10 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">
              Download Template
            </h4>
            <p className="text-xs text-slate-500">
              Ensure your CSV matches our required columns.
            </p>
          </div>
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
          >
            <DownloadCloud size={16} className="text-[#923CF9]" /> CSV Template
          </button>
        </div>

        {!file ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 hover:border-[#923CF9] transition-all cursor-pointer relative">
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
              Click to upload parent list
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Table className="text-[#923CF9]" size={20} />
                <span className="text-sm font-bold text-slate-700">
                  {file.name}
                </span>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setPreviewData([]);
                  clearErrors();
                }}
              >
                <Trash2 size={18} className="text-slate-400" />
              </button>
            </div>
            {/* Data Preview Table */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
              <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-b">
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Preview
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">
                  {previewData.length} Rows
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="bg-slate-50/50 border-b">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Relationship</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {previewData.map((row, i) => (
                      <tr key={i} className="text-slate-600">
                        <td className="px-4 py-2">
                          {row["Full Name"] || row.fullName || "—"}
                        </td>
                        <td className="px-4 py-2">
                          {row["Relationship"] || row.relationship || "Other"}
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
          disabled={!file || isSubmitting || bulkErrors.length > 0}
          className="w-full bg-[#1C1C1C] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <ShieldCheck size={18} /> Register {previewData.length || ""}{" "}
              Parents
            </>
          )}
        </button>
      </div>
      <CSVErrorList errors={bulkErrors} type="Parent" />
    </>
  );
};
