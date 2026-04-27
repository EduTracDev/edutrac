import { formatCurrency } from "@/utils/currency";
import {
  ArrowDownRight,
  ArrowUpRight,
  Fuel,
  Users,
  PencilRuler,
  Toolbox,
} from "lucide-react";
import { mockExpenses } from "@/modules/constants/dashboard";

const categoryIcons = {
  Salaries: <Users size={16} />,
  Fuel: <Fuel size={16} />,
  Academic: <PencilRuler size={16} />,
  Maintenance: <Toolbox size={16} />,
};

export const ExpenseLedger = () => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Detailed Monthly Outflow
        </h3>
      </div>

      <div className="grid gap-3">
        {mockExpenses.map((exp) => {
          const isOver = exp.amount > exp.budget;
          return (
            <div
              key={exp.id}
              className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-[24px] hover:border-[#923CF9]/30 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl ${isOver ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-400"}`}
                >
                  {/* Fallback to Tool icon if category not matched */}
                  {categoryIcons[exp.title as keyof typeof categoryIcons] || (
                    <Toolbox size={16} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">
                    {exp.title}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">
                    Budget: {formatCurrency(exp.budget)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`flex items-center justify-end gap-1 font-black text-sm ${isOver ? "text-red-500" : "text-slate-800"}`}
                >
                  {isOver ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {formatCurrency(exp.amount)}
                </div>
                <p
                  className={`text-[9px] font-bold uppercase ${isOver ? "text-red-400" : "text-emerald-500"}`}
                >
                  {isOver
                    ? `${((exp.amount / exp.budget) * 100 - 100).toFixed(0)}% Over`
                    : "On Track"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
