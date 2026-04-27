"use client";
import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import Papa from "papaparse";
import { DownloadTemplateBtn } from "./DownloadTemplateBtn";
import { Student } from "@/modules/types/dashboard";

interface CSVRow {
  student_id: string;
  full_name: string;
  ca1_score: string | number;
  ca2_score: string | number;
  exam_score: string | number;
}

interface CSVImportSectionProps {
  students: Student[];
  subject: string;
  className: string;
  onImportParsed: (data: CSVRow[]) => void; // Passes data back to parent for validation
}

export const CSVImportSection = ({
  students,
  subject,
  className,
  onImportParsed,
}: CSVImportSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<
    "idle" | "error" | "success"
  >("idle");

  const handleCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus("idle");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as CSVRow[];
        onImportParsed(data); // Send to parent to trigger the Validation Modal
        setImportStatus("success");
      },
      error: (error) => {
        console.error("CSV Parse Error:", error);
        setImportStatus("error");
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-[#923CF9]/5 rounded-[32px] border border-[#923CF9]/10 gap-4">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-slate-800">
          Bulk Import Scores
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Working in Excel? Upload your CSV for {subject} here.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleCsvImport}
          accept=".csv"
          className="hidden"
        />

        <DownloadTemplateBtn
          students={students}
          subject={subject}
          className={className}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
        >
          <FileUp size={16} />
          {importStatus === "success" ? "File Loaded" : "Upload CSV"}
        </button>
      </div>
    </div>
  );
};
