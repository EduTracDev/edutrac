import { FileText } from "lucide-react";
import { GradingFields } from "./GradingFields";
import { GradingOverlayProps } from "./GradingOverlay";
import { Header } from "./Header";
export const GradingOverlayDesktop = ({
  studentName,
  fileName,
  totalPoints,
  submissionDate,
  onClose,
  onSave,
}: GradingOverlayProps) => (
  <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex justify-end">
    <div className="w-[85%] max-w-5xl bg-white h-full flex animate-in slide-in-from-right duration-500">
      {/* 1. Document View (Left) */}
      <div className="flex-1 bg-slate-50 border-r border-slate-100 p-12 flex flex-col">
        <div className="flex-1 rounded-[40px] border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center">
          <FileText size={48} className="text-[#923CF9] mb-4" />
          <p className="font-black text-slate-800">{fileName}</p>
        </div>
      </div>

      {/* 2. Grading Form (Right) */}
      <div className="w-[400px] p-10 flex flex-col gap-8">
        <Header
          studentName={studentName}
          onClose={onClose}
          submissionDate={submissionDate}
        />
        <GradingFields totalPoints={totalPoints} onSave={onSave} />
      </div>
    </div>
  </div>
);
