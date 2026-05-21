import { Calendar, MessageSquare } from "lucide-react";

export const AttendanceLog = () => {
  const logs = [
    {
      date: "Monday, April 20",
      status: "Present",
      remark: "Participated in Assembly",
    },
    {
      date: "Friday, April 17",
      status: "Late",
      remark: "Heavy traffic at Toll Gate",
    },
    {
      date: "Thursday, April 16",
      status: "Absent",
      remark: "Excused - Family Event",
    },
    { date: "Wednesday, April 15", status: "Present", remark: "Punctual" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-sm">
      <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Daily Records
        </h3>
        <span className="text-[10px] font-bold text-[#923CF9] bg-purple-50 px-3 py-1 rounded-full">
          3rd Term 2025/2026
        </span>
      </div>

      <div className="divide-y divide-slate-50">
        {logs.map((log, i) => (
          <div
            key={i}
            className="p-6 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Date Section */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex w-10 h-10 bg-slate-50 rounded-xl items-center justify-center text-slate-400">
                <Calendar size={18} />
              </div>
              <div>
                <span className="text-sm font-black text-slate-800 block">
                  {log.date}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                  Standard Session
                </span>
              </div>
            </div>

            {/* Status & Remark Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 lg:gap-16">
              {/* Status Pill */}
              <div className="w-24">
                <span
                  className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border text-center block ${
                    log.status === "Present"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : log.status === "Late"
                        ? "bg-amber-50 border-amber-100 text-amber-600"
                        : "bg-rose-50 border-rose-100 text-rose-600"
                  }`}
                >
                  {log.status}
                </span>
              </div>

              {/* Remark/Comment */}
              <div className="flex items-start gap-2 max-w-xs">
                <MessageSquare
                  size={14}
                  className="text-slate-300 mt-0.5 shrink-0"
                />
                <p className="text-[11px] font-medium text-slate-500 leading-tight">
                  {log.remark}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
