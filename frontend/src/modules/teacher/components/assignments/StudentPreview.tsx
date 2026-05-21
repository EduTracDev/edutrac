// @/modules/teacher/components/assignments/StudentPreview.tsx
"use client";

import { Smartphone, Calendar, Trophy, Paperclip } from "lucide-react";
import { AssignmentFormData } from "@/utils/validation";

interface PreviewProps {
  formData: Partial<AssignmentFormData>;
}

export const StudentPreview = ({ formData }: PreviewProps) => {
  return (
    <div className="animate-in slide-in-from-right-4 duration-500 flex justify-center py-8 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-100">
      {/* Mobile Mockup Container */}
      <div className="w-[300px] h-[600px] bg-white rounded-[50px] border-[10px] border-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative flex flex-col scale-90 lg:scale-100 transition-transform">
        {/* Physical Details: Notch & Speaker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl z-30 flex items-center justify-center">
          <div className="w-8 h-1 bg-slate-700 rounded-full" />
        </div>

        {/* Status Bar Mockup */}
        <div className="h-10 px-8 flex justify-between items-end pb-1">
          <span className="text-[10px] font-bold text-slate-800">9:41</span>
          <div className="flex gap-1 items-center">
            <div className="w-3 h-3 rounded-full border border-slate-800" />
            <div className="w-4 h-2 bg-slate-800 rounded-sm" />
          </div>
        </div>

        {/* Student App Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-5 custom-scrollbar">
          <div className="flex items-center gap-2 text-[#923CF9] bg-[#923CF9]/5 w-fit px-3 py-1 rounded-full">
            <Smartphone size={10} />
            <span className="text-[8px] font-black uppercase tracking-tighter">
              Student View
            </span>
          </div>

          <h1 className="text-xl font-black text-slate-800 leading-tight break-words">
            {formData.title || "Untitled Assignment"}
          </h1>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-100 text-amber-600 rounded-lg">
              <Trophy size={10} />
              <span className="text-[9px] font-black uppercase">
                {formData.points || 0} Pts
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-lg">
              <Calendar size={10} />
              <span className="text-[9px] font-black uppercase">
                {formData.dueDate || "No Date"}
              </span>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Instructions
            </p>
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap italic">
                {formData.description ||
                  "Instructions will appear here as you type..."}
              </p>
            </div>
          </div>

          {/* Attachment Placeholder */}
          <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-2xl bg-white shadow-sm opacity-50">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
              <Paperclip size={14} />
            </div>
            <div className="flex-1">
              <div className="h-2 w-20 bg-slate-100 rounded" />
              <div className="h-1.5 w-12 bg-slate-50 rounded mt-1" />
            </div>
          </div>
        </div>

        {/* Action Button Mockup (Fixed at bottom) */}
        <div className="p-6 pt-2 bg-gradient-to-t from-white via-white to-transparent">
          <button
            disabled
            className="w-full py-4 bg-[#923CF9] text-white rounded-[20px] font-black text-[10px] uppercase shadow-xl shadow-purple-100 opacity-90 cursor-not-allowed"
          >
            Submit Work
          </button>
        </div>
      </div>
    </div>
  );
};
