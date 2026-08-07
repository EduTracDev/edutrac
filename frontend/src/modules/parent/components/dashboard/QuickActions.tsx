// @/modules/parent/components/dashboard/QuickActions.tsx
import { FileText, Download, Bell, ArrowRight } from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-6 bg-slate-900 rounded-[32px] text-white flex flex-col justify-between group cursor-pointer overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-[#923CF9]/20 transition-all" />
        <div className="flex justify-between items-start">
          <div className="p-3 bg-white/10 rounded-2xl">
            <FileText size={20} className="text-purple-300" />
          </div>
          <button className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-slate-900 transition-all">
            <Download size={16} />
          </button>
        </div>
        <div className="mt-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-purple-300">
            Term 2 Results
          </p>
          <h4 className="text-lg font-bold">Download Report Card</h4>
        </div>
      </div>

      {/* Smart Notification */}
      <div className="p-6 bg-[#923CF9]/10 border border-[#923CF9]/20 rounded-[32px] flex flex-col justify-between group">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={20} className="text-[#923CF9]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#923CF9]">
            Smart Alert
          </span>
        </div>
        <div className="mt-4">
          <p className="text-sm font-bold text-slate-800 leading-snug">
            PTA Meeting scheduled for this Friday, 2:00 PM at the School Hall.
          </p>
          <button className="mt-3 flex items-center gap-2 text-[10px] font-black text-[#923CF9] uppercase hover:gap-3 transition-all">
            View Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
