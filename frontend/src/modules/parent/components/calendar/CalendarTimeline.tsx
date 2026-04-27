import { CalendarDays, Flag, BookOpen, Coffee, Star } from "lucide-react";

const schedule = [
  {
    date: "May 04",
    title: "Resumption Day",
    type: "academic",
    note: "Term 3 Begins",
  },
  {
    date: "May 27",
    title: "Children's Day",
    type: "holiday",
    note: "No school - Public Holiday",
  },
  {
    date: "June 15 - 19",
    title: "Mid-Term Tests",
    type: "exam",
    note: "Continuous Assessment (CA)",
  },
  {
    date: "June 22 - 26",
    title: "Mid-Term Break",
    type: "break",
    note: "1-week rest period",
  },
  {
    date: "July 20 - 24",
    title: "Final Examinations",
    type: "exam",
    note: "Full term assessment",
  },
  {
    date: "July 31",
    title: "Graduation & Prize Giving",
    type: "event",
    note: "End of Session Ceremony",
  },
];

export const CalendarTimeline = () => {
  const getStyle = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "holiday":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "exam":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "break":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-purple-50 text-[#923CF9] border-purple-100";
    }
  };

  return (
    <div className="space-y-4">
      {schedule.map((item, i) => (
        <div key={i} className="flex gap-4 group">
          {/* Left Date Column */}
          <div className="w-20 pt-1 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {item.date}
            </span>
          </div>

          {/* Timeline Connector & Content */}
          <div className="relative pb-8 flex-1">
            {i !== schedule.length - 1 && (
              <div className="absolute left-[-17px] top-6 bottom-0 w-px bg-slate-100" />
            )}
            <div className="absolute left-[-20px] top-2 w-1.5 h-1.5 rounded-full bg-slate-200 border border-white group-hover:bg-[#923CF9] transition-colors" />

            <div
              className={`p-5 rounded-[24px] border ${getStyle(item.type)} transition-all group-hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-black tracking-tight">
                  {item.title}
                </h4>
                <span className="text-[8px] font-black uppercase tracking-[0.1em] opacity-60">
                  {item.type}
                </span>
              </div>
              <p className="text-[11px] font-medium mt-1 opacity-80">
                {item.note}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
