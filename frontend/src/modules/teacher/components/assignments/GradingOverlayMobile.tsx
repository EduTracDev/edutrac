import { FileText, X } from "lucide-react";
import { GradingFields } from "./GradingFields";
import { GradingOverlayProps } from "./GradingOverlay";
import { Header } from "./Header";

export const GradingOverlayMobile = ({
  studentName,
  fileName,
  totalPoints,
  submissionDate,
  onClose,
  onSave,
}: GradingOverlayProps) => (
  <div className="fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto animate-in slide-in-from-bottom duration-300">
    {/* Sticky Mobile Header */}
    <div className="sticky top-0 bg-white p-6 border-b border-slate-100 flex justify-between items-center z-10">
      <h2 className="font-black text-slate-800">{studentName}</h2>
      <button onClick={onClose} className="p-2 bg-slate-100 rounded-full">
        <X size={20} />
      </button>
    </div>

    <div className="p-6 space-y-8">
      {/* Small Document Preview Card */}
      <div className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#923CF9] shadow-sm">
          <FileText size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
            Attachment
          </p>
          <p className="text-sm font-bold text-slate-700 truncate max-w-[180px] mt-1">
            {fileName}
          </p>
        </div>
      </div>

      {/* Inputs - Large for thumbs */}
      <div></div>
      <Header
        studentName={studentName}
        onClose={onClose}
        submissionDate={submissionDate}
      />
      <GradingFields totalPoints={totalPoints} onSave={onSave} isMobile />
    </div>
  </div>
);
