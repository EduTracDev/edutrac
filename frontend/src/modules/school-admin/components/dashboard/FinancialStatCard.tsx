import React from "react";
import { AlertCircle, ArrowUpRight, TrendingUp } from "lucide-react";

interface FinancialStatCardProps {
  title: string;
  amount: string;
  count: number;
  trend: string;
  onViewDetails: () => void;
}

export const FinancialStatCard = ({
  title,
  amount,
  count,
  trend,
  onViewDetails,
}: FinancialStatCardProps) => {
  return (
    <div className="bg-white p-5 rounded-3xl border border-red-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-red-50 rounded-2xl group-hover:scale-110 transition-transform">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <button
          onClick={onViewDetails}
          className="flex items-center gap-1 text-[10px] font-bold text-[#923CF9] bg-purple-50 px-2 py-1 rounded-lg hover:bg-[#923CF9] hover:text-white transition-colors"
        >
          VIEW DEBTORS <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-slate-900">{amount}</h3>
          <span className="text-[10px] font-bold text-red-500 flex items-center bg-red-50 px-1.5 py-0.5 rounded-md">
            <TrendingUp className="w-3 h-3 mr-0.5" /> {trend}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-50">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-400 font-medium">
            Affected Students
          </span>
          <span className="text-sm font-bold text-slate-700">
            {count}{" "}
            <span className="text-[10px] font-normal text-slate-400">
              Total
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
