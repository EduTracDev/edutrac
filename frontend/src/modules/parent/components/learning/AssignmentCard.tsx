import { Clock, FileText, CheckCircle2 } from "lucide-react";

interface AssignmentProps {
  subject: string;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  onAction?: () => void;
}

export const AssignmentCard = ({
  subject,
  title,
  dueDate,
  status,
  onAction,
}: AssignmentProps) => {
  const statusStyles = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    submitted: "bg-blue-50 text-blue-600 border-blue-100",
    graded: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div
      onClick={status === "pending" ? onAction : undefined}
      className={`p-5 rounded-[32px] border border-slate-100 bg-white transition-all group ${
        status === "pending"
          ? "hover:shadow-xl hover:shadow-purple-100/20 hover:border-[#923CF9]/20 cursor-pointer active:scale-[0.98]"
          : "opacity-80"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusStyles[status]}`}
        >
          {status}
        </span>
        <FileText
          size={18}
          className="text-slate-300 group-hover:text-[#923CF9] transition-colors"
        />
      </div>

      <h4 className="text-[10px] font-bold text-[#923CF9] uppercase tracking-tighter mb-1">
        {subject}
      </h4>
      <p className="text-sm font-black text-slate-800 mb-4 leading-snug">
        {title}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={14} />
          <span className="text-[11px] font-medium text-slate-500">
            Due: {dueDate}
          </span>
        </div>

        {/* Subtle visual hint for pending tasks */}
        {status === "pending" && (
          <span className="text-[10px] font-black text-[#923CF9] opacity-0 group-hover:opacity-100 transition-opacity">
            SUBMIT →
          </span>
        )}
      </div>
    </div>
  );
};
