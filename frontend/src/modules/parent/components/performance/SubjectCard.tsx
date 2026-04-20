import { Target, TrendingUp, TrendingDown } from "lucide-react";

interface SubjectPerformanceProps {
  subject: string;
  score: number; // 0 to 100
  previousScore: number;
  grade: string;
}

export const SubjectCard = ({
  subject,
  score,
  previousScore,
  grade,
}: SubjectPerformanceProps) => {
  const isImproving = score >= previousScore;

  return (
    <div className="p-6 bg-white border border-slate-100 rounded-[32px] hover:shadow-lg transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 bg-[#923CF9]/5 rounded-xl flex items-center justify-center text-[#923CF9]">
          <Target size={20} />
        </div>
        <div
          className={`flex items-center gap-1 text-[10px] font-black ${isImproving ? "text-emerald-500" : "text-rose-500"}`}
        >
          {isImproving ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(score - previousScore)}%
        </div>
      </div>

      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        {subject}
      </h4>
      <div className="flex items-end justify-between mb-4">
        <span className="text-2xl font-black text-slate-800">{score}%</span>
        <span className="text-sm font-black text-[#923CF9] bg-[#923CF9]/10 px-3 py-1 rounded-lg">
          Grade: {grade}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#923CF9] transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};
