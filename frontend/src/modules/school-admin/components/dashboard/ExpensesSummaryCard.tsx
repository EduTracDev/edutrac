import React from "react";
import Link from "next/link";
import { Wallet, ChevronRight, ChevronDown } from "lucide-react";

interface ExpenseSummaryProps {
  total: number;
  budget: number;
  month: string;
  isExpanded?: boolean; // Controls the arrow rotation
  onClick?: () => void; // Triggered on Fee Management page
  href?: string; // Triggered on Dashboard
}

export const ExpenseSummaryCard = ({
  total,
  budget,
  month,
  isExpanded,
  onClick,
  href,
}: ExpenseSummaryProps) => {
  const percentageUsed = Math.min((total / budget) * 100, 100);
  const isOverBudget = total > budget;

  /**
   * 1. THE "LETTER" (UI Design)
   * We define the UI once so it looks identical everywhere.
   */
  const CardContent = (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group h-full">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 ${isOverBudget ? "bg-red-50" : "bg-[#923CF9]/5"} rounded-2xl`}
        >
          <Wallet
            className={`w-6 h-6 ${isOverBudget ? "text-red-500" : "text-[#923CF9]"}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
            {month}
          </span>
          {/* Icon switches based on behavior */}
          <div className="text-slate-300 group-hover:text-[#923CF9] transition-colors">
            {href ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">
          Monthly Expenses
        </p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          ₦{total.toLocaleString()}
        </h3>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-[11px] mb-1.5">
          <span className="text-slate-400 font-bold italic text-[9px] uppercase">
            Budget Utilization
          </span>
          <span
            className={`font-black ${isOverBudget ? "text-red-600" : "text-[#923CF9]"}`}
          >
            {((total / budget) * 100).toFixed(0)}%
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

  /**
   * 2. THE "ENVELOPE" (Behavior Logic)
   * If href exists, wrap in a Next.js Link.
   * If onClick exists, wrap in a clickable div.
   */
  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {CardContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left outline-none focus:ring-2 focus:ring-[#923CF9]/20 rounded-[32px]"
    >
      {CardContent}
    </button>
  );
};
