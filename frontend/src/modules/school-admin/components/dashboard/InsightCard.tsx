// src/modules/school-admin/components/dashboard/AIInsightCard.tsx
import React from "react";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Bell,
} from "lucide-react";

export const InsightCard = () => {
  const insights = [
    {
      id: 1,
      type: "growth",
      text: "Revenue is up 12% vs last month. Great job!",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      action: "View Report",
    },
    {
      id: 2,
      type: "alert",
      text: "Attendance dropped in JSS 2 by 15% this week.",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: "Contact Teachers",
    },
  ];

  return (
    <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden border border-slate-700">
      {/* AI Glow Effect */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Sparkles className="w-4 h-4 text-purple-300" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-purple-200">
            AI Smart Insights
          </h3>
        </div>

        {/* Insight Items */}
        <div className="space-y-4">
          {insights.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="flex gap-4">
                <div className={`p-2 rounded-xl h-fit ${item.bgColor}`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-200 leading-snug">
                    {item.text}
                  </p>
                  <button className="text-[10px] font-bold text-purple-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                    {item.action.toUpperCase()} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
