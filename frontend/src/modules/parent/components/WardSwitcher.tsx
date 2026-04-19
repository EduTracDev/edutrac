"use client";

import { Ward } from "@/modules/types/dashboard";
import { ChevronRight, UserCircle2 } from "lucide-react";

interface WardSwitcherProps {
  wards: Ward[];
  activeWardId: string;
  onWardChange: (id: string) => void;
}

export const WardSwitcher = ({
  wards,
  activeWardId,
  onWardChange,
}: WardSwitcherProps) => {
  return (
    <div className="p-4 space-y-3">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">
        My Wards
      </h3>

      <div className="space-y-2">
        {wards.map((ward) => {
          const isActive = ward.id === activeWardId;

          return (
            <button
              key={ward.id}
              onClick={() => onWardChange(ward.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? "bg-[#923CF9] border-[#923CF9] text-white shadow-lg shadow-purple-100 scale-[1.02]"
                  : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl ${isActive ? "bg-white/20" : "bg-slate-50"}`}
              >
                <UserCircle2
                  size={20}
                  className={isActive ? "text-white" : "text-[#923CF9]"}
                />
              </div>

              <div className="flex-1 text-left">
                <p
                  className={`text-xs font-black truncate ${isActive ? "text-white" : "text-slate-800"}`}
                >
                  {ward.name}
                </p>
                <p
                  className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? "text-purple-100" : "text-slate-400"}`}
                >
                  {ward.class}
                </p>
              </div>

              {isActive && <ChevronRight size={14} className="text-white/60" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
