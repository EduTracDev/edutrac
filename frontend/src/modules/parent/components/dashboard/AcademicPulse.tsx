// @/modules/parent/components/dashboard/AcademicPulse.tsx
import { Clock, BookOpen, AlertCircle } from "lucide-react";
import { Ward } from "@/modules/types/dashboard";

interface AcademicPulseProps {
  activeWard: Ward;
}
export const AcademicPulse = ({ activeWard }: AcademicPulseProps) => {
  // Logic: In a real app, you'd filter your 'assignments' array for dueDate === "Today"
  const urgentTasks = [
    { id: "1", subject: "Math", title: "Quadratic Equations", time: "8:00 PM" },
  ];

  return (
    <div className="lg:col-span-8 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row gap-8">
      {/* Urgent Deadline Section */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Due Tonight
          </h3>
        </div>

        {urgentTasks.length > 0 ? (
          <div className="p-5 bg-rose-50/50 border border-rose-100 rounded-2xl group hover:bg-rose-50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-black text-[#923CF9] uppercase tracking-tighter">
                {urgentTasks[0].subject}
              </p>
              <AlertCircle size={14} className="text-rose-500" />
            </div>
            <p className="text-sm font-black text-slate-800 leading-tight mb-3">
              {urgentTasks[0].title}
            </p>
            <div className="flex items-center gap-2 text-rose-600">
              <Clock size={12} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase">
                Closing at {urgentTasks[0].time}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-xs font-medium text-slate-400 italic">
            No urgent deadlines today.
          </p>
        )}
      </div>

      <div className="w-px bg-slate-50 hidden md:block" />

      {/* Mini Timetable Section */}
      <div className="flex-1 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Current Period
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#923CF9] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-100">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-sm font-black text-slate-800">
              Literature in English
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              Room 12 • Ending in 15 mins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
