import React from "react";
import { Wallet } from "lucide-react";

interface ExpenseSummaryProps {
  total: number;
  budget: number;
  month: string;
}

export const ExpenseSummaryCard = ({
  total,
  budget,
  month,
}: ExpenseSummaryProps) => {
  const percentageUsed = Math.min((total / budget) * 100, 100);
  const isOverBudget = total > budget;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 ${isOverBudget ? "bg-red-50" : "bg-orange-50"} rounded-2xl transition-colors`}
        >
          <Wallet
            className={`w-6 h-6 ${isOverBudget ? "text-red-500" : "text-orange-500"}`}
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
          {month}
        </span>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">Monthly Expenses</p>
        <h3 className="text-2xl font-bold text-slate-900">
          ₦{total.toLocaleString()}
        </h3>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-slate-400 font-medium italic">
            Budget Utilization
          </span>
          <span
            className={`font-bold ${isOverBudget ? "text-red-600" : "text-slate-600"}`}
          >
            {percentageUsed.toFixed(0)}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${isOverBudget ? "bg-red-500" : "bg-[#923CF9]"}`}
            style={{ width: `${percentageUsed}%` }}
          />
        </div>
      </div>
    </div>
  );
};
