"use client";
import { Download } from "lucide-react";
import Papa from "papaparse";
import { Student } from "@/modules/types/dashboard";

interface DownloadTemplateProps {
  students: Student[];
  subject: string;
  className: string;
}

export const DownloadTemplateBtn = ({
  students,
  subject,
  className,
}: DownloadTemplateProps) => {
  const handleDownload = () => {
    // 1. Map students to the CSV format
    const csvData = students.map((s) => ({
      student_id: s.id,
      full_name: `${s.firstName} ${s.lastName}`,
      ca1_score: "",
      ca2_score: "",
      exam_score: "",
    }));

    // 2. Generate CSV
    const csv = Papa.unparse(csvData);

    // 3. Trigger Download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      `${className.replace(/\s+/g, "_")}_${subject}_Template.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up memory
  };

  return (
    <button
      onClick={handleDownload}
      className="flex-1 md:flex-none px-5 py-3 bg-white text-slate-600 rounded-2xl text-xs font-black border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
      aria-label={`Download CSV template for ${className} ${subject}`}
    >
      <Download size={16} /> Download Template
    </button>
  );
};

export const ValidationCard = ({ label, value, icon, color }: any) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  
  return (
    <div className={`p-4 rounded-2xl border ${colors[color as keyof typeof colors]}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
};