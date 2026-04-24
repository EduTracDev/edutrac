"use client";

import { useWard } from "@/modules/context/WardContext";
import { CalendarTimeline } from "@/modules/parent/components/calendar/CalendarTimeline";
import { DownloadCloud, Info } from "lucide-react";

export default function CalendarPage() {
  const { activeWard } = useWard();

  return (
    <div className="space-y-8 pb-20 max-w-4xl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            Academic Calendar
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            {activeWard ? (
              <>
                Important dates for{" "}
                <span className="text-[#923CF9] font-black">
                  {activeWard.name}'s
                </span>{" "}
                term.
              </>
            ) : (
              "Official school dates and upcoming events."
            )}
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
          <DownloadCloud size={14} /> Download PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <CalendarTimeline />
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-[#923CF9]/5 border border-[#923CF9]/10 rounded-[40px]">
            <Info className="text-[#923CF9] mb-4" size={24} />
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2">
              School Hours
            </h4>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              Mon - Thu: 8:00 AM - 3:30 PM
              <br />
              Fri: 8:00 AM - 1:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
