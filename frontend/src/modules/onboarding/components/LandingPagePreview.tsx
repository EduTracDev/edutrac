// @/modules/onboarding/components/LandingPagePreview.tsx
"use client";

import { School } from "@/modules/types/dashboard";
import {
  UserCircle,
  ShieldCheck,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

export const LandingPagePreview = ({
  data,
  onFinalize,
}: {
  data: School;
  onFinalize: () => void;
}) => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Browser Simulation Container */}
      <div className="bg-white rounded-[48px] border-8 border-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
        {/* Browser Top Bar */}
        <div className="bg-slate-900 px-8 py-4 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="bg-slate-800 px-6 py-1.5 rounded-full text-[10px] font-bold text-slate-400">
            edutrac.app/{data.slug}
          </div>
          <div className="w-10" />
        </div>

        {/* The Actual Landing Page Content */}
        <div className="p-12 md:p-20 bg-slate-50 min-h-[500px] flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl mb-6 flex items-center justify-center overflow-hidden border-4 border-white">
            {/* If logo is a File (preview) or a string (URL) */}
            <img
              src={
                data.logo instanceof File
                  ? URL.createObjectURL(data.logo)
                  : data.logo || "/placeholder-logo.png"
              }
              alt="School Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-4xl font-black text-slate-800 mb-2 uppercase tracking-tighter italic">
            {data.name}
          </h1>
          <p className="text-slate-400 font-medium text-sm mb-12 max-w-md">
            Welcome to our digital campus. Please select your portal to
            continue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { label: "Admin", icon: ShieldCheck, color: "bg-slate-900" },
              { label: "Teacher", icon: GraduationCap, color: "bg-[#923CF9]" },
              { label: "Parent", icon: UserCircle, color: "bg-emerald-500" },
            ].map((p) => (
              <div
                key={p.label}
                className="p-8 bg-white border border-slate-100 rounded-[40px] text-left opacity-80 grayscale-[0.5]"
              >
                <div
                  className={`w-12 h-12 ${p.color} rounded-2xl flex items-center justify-center text-white mb-4`}
                >
                  <p.icon size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-800">
                  {p.label} Portal
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-emerald-600">
          <CheckCircle size={18} />
          <span className="text-xs font-black uppercase tracking-widest">
            Everything looks perfect
          </span>
        </div>

        <button
          onClick={onFinalize}
          className="px-12 py-5 bg-[#923CF9] text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:scale-[1.05] active:scale-95 transition-all"
        >
          Launch School Portal
        </button>
      </div>
    </div>
  );
};
