import React from "react";
import { Clock, MapPin, ArrowRight } from "lucide-react";

interface Period {
  id: string;
  subject: string;
  class: string;
  startTime: string;
  endTime: string;
  room: string;
  status: "past" | "current" | "upcoming";
}

const mockSchedule: Period[] = [
  {
    id: "1",
    subject: "Mathematics",
    class: "JSS 3 Gold",
    startTime: "08:30 AM",
    endTime: "09:10 AM",
    room: "Room 4B",
    status: "past",
  },
  {
    id: "2",
    subject: "Further Math",
    class: "SS 2 Diamond",
    startTime: "09:15 AM",
    endTime: "10:00 AM",
    room: "Lab 2",
    status: "current",
  },
  {
    id: "3",
    subject: "Mathematics",
    class: "JSS 3 Silver",
    startTime: "10:30 AM",
    endTime: "11:10 AM",
    room: "Room 4C",
    status: "upcoming",
  },
];

export default function TimetableList() {
  return (
    <div className="space-y-4">
      {mockSchedule.map((period) => (
        <div
          key={period.id}
          className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all ${
            period.status === "current"
              ? "bg-[#923CF9]/5 border-[#923CF9] ring-1 ring-[#923CF9]"
              : "bg-white border-slate-100 hover:border-slate-200"
          }`}
        >
          {/* Time indicator */}
          <div className="flex flex-col items-center min-w-17.5">
            <span
              className={`text-xs font-bold ${period.status === "current" ? "text-[#923CF9]" : "text-slate-400"}`}
            >
              {period.startTime}
            </span>
            <div
              className={`w-0.5 h-4 my-1 ${period.status === "current" ? "bg-[#923CF9]" : "bg-slate-100"}`}
            />
            <span className="text-[10px] font-medium text-slate-400 uppercase">
              {period.endTime}
            </span>
          </div>

          {/* Class Info */}
          <div className="flex-1">
            <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
              {period.subject}
              {period.status === "current" && (
                <span className="px-2 py-0.5 rounded-full bg-[#923CF9] text-[8px] text-white uppercase tracking-tighter">
                  Happening Now
                </span>
              )}
            </h4>
            <div className="flex items-center gap-3 mt-1 text-slate-500">
              <div className="flex items-center gap-1 text-[11px] font-medium">
                <MapPin size={12} />
                {period.room}
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="text-[11px] font-bold text-[#923CF9]/80 uppercase">
                {period.class}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#923CF9] hover:text-white transition-colors">
            <ArrowRight size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
