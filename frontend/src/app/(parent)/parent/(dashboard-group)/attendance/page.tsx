"use client";
import { useState } from "react";
import { AttendanceStats } from "@/modules/parent/components/attendance/AttendanceStats";
import { AttendanceLog } from "@/modules/parent/components/attendance/AttendanceLog";
import { useWard } from "@/modules/context/WardContext";
import { LeaveRequestModal } from "@/modules/parent/components/attendance/LeaveRequestModal";

export default function AttendancePage() {
  const { activeWard } = useWard();
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);

  if (!activeWard) return null;

  return (
    <div className="space-y-8 pb-20">
      <header className="px-2">
        <h1 className="text-3xl font-black text-slate-800">Attendance</h1>
        <p className="text-slate-400 font-medium text-sm">
          Tracking{" "}
          <span className="text-[#923CF9] font-bold">{activeWard.name}'s</span>{" "}
          morning check-ins.
        </p>
      </header>

      <AttendanceStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AttendanceLog />
        </div>

        {/* Right Sidebar: Contextual Utility */}
        <div className="space-y-6">
          <div className="p-8 bg-slate-900 rounded-[40px] text-white">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300 mb-4">
              Quick Action
            </h4>
            <p className="text-sm font-medium text-slate-300 mb-6 leading-relaxed">
              Planning to keep {activeWard.name.split(" ")[0]} at home? Notify
              the school management directly.
            </p>
            <button
              onClick={() => setLeaveModalOpen(true)}
              className="w-full py-4 bg-[#923CF9] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95"
            >
              Request Leave
            </button>
          </div>
          <LeaveRequestModal
            isOpen={isLeaveModalOpen}
            onClose={() => setLeaveModalOpen(false)}
            wardName={activeWard.name}
          />
        </div>
      </div>
    </div>
  );
}
