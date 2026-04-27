import { Award, TrendingUp, BookOpen } from "lucide-react";

export const PerformanceHeader = ({
  avg,
  position,
}: {
  avg: string;
  position: string;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-8 bg-[#923CF9] rounded-[40px] text-white shadow-xl shadow-purple-100 flex flex-col justify-between relative overflow-hidden">
        <Award
          className="absolute -right-4 -bottom-4 text-white/10"
          size={120}
        />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200">
          Terminal Average
        </p>
        <h2 className="text-4xl font-black mt-2">{avg}</h2>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10">
          <TrendingUp size={12} /> +2.4% from last term
        </div>
      </div>

      <div className="p-8 bg-white border border-slate-100 rounded-[40px] flex flex-col justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Class Position
        </p>
        <h2 className="text-4xl font-black text-slate-800 mt-2">{position}</h2>
        <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase">
          Out of 32 Students
        </p>
      </div>

      <div className="p-8 bg-slate-900 rounded-[40px] text-white flex flex-col justify-between relative overflow-hidden">
        <BookOpen
          className="absolute -right-4 -bottom-4 text-white/5"
          size={120}
        />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Principal&apos;s Remark
        </p>
        <p className="text-sm font-bold text-slate-200 mt-4 leading-relaxed italic">
          `An excellent performance. Consistency in Mathematics is highly
          commendable.``
        </p>
      </div>
    </div>
  );
};
