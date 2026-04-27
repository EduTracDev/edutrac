"use client";

import { useWard } from "@/modules/context/WardContext";
import { Bell, Megaphone, Info, AlertTriangle } from "lucide-react";

const notices = [
  {
    id: 1,
    type: "Urgent",
    title: "Inter-House Sports Postponed",
    content:
      "Due to the predicted heavy rainfall this weekend, the Inter-House sports competition has been moved to next Friday.",
    date: "2 hours ago",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    id: 2,
    type: "Event",
    title: "PTA General Meeting",
    content:
      "All parents are invited to the Term 3 PTA meeting in the school auditorium to discuss the upcoming graduation ceremony.",
    date: "1 day ago",
    icon: Megaphone,
    color: "text-[#923CF9]",
    bg: "bg-purple-50",
  },
  {
    id: 3,
    type: "General",
    title: "Mid-Term Break Reminder",
    content:
      "Please note that the school will be closed from Monday to Friday next week for the mid-term break.",
    date: "3 days ago",
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

export default function NoticePage() {
  const { activeWard } = useWard();

  return (
    <div className="space-y-8 pb-20 max-w-4xl">
      <header className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Notice Board</h1>
          <p className="text-slate-400 font-medium text-sm">
            {activeWard
              ? `Keeping you updated on everything regarding ${activeWard.name}.`
              : "Latest updates and announcements from the school management."}
          </p>
        </div>
        <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 relative">
          <Bell size={20} />
          <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </div>
      </header>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="p-8 bg-white border border-slate-100 rounded-[40px] hover:shadow-xl hover:shadow-slate-100 transition-all group"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className={`w-14 h-14 ${notice.bg} ${notice.color} rounded-2xl flex items-center justify-center shrink-0`}
              >
                <notice.icon size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${notice.bg} ${notice.color} border-current opacity-70`}
                  >
                    {notice.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300">
                    {notice.date}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-[#923CF9] transition-colors">
                  {notice.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                  {notice.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
