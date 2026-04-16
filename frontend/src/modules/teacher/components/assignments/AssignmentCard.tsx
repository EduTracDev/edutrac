import { Calendar, MoreVertical } from "lucide-react";
import { Assignment } from "@/modules/types/dashboard";
import { useRouter } from "next/navigation";

export const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
  const router = useRouter();
  const progress =
    (assignment.submissions.turnedIn / assignment.submissions.total) * 100;

  return (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase rounded-lg">
          {assignment.class}
        </span>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical size={18} />
        </button>
      </div>

      <h3 className="font-bold text-slate-800 mb-1 group-hover:text-[#923CF9] transition-colors">
        {assignment.title}
      </h3>
      <p className="text-[11px] text-slate-400 font-medium mb-4">
        {assignment.subject}
      </p>

      {/* Progress Section */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
          <span className="text-slate-400">Submissions</span>
          <span className="text-slate-700">
            {assignment.submissions.turnedIn}/{assignment.submissions.total}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#923CF9] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={14} />
          <span className="text-[10px] font-bold">{assignment.dueDate}</span>
        </div>
        <button
          onClick={() => router.push(`/teacher/assignments/${assignment.id}`)}
          className="text-[10px] font-black text-[#923CF9] uppercase hover:underline"
        >
          View Submissions
        </button>
      </div>
    </div>
  );
};
