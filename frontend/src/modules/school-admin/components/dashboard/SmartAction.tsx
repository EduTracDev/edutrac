import React from "react";
import { Bell, Calendar, Send } from "lucide-react";

interface SmartActionProps {
  onAction: (type: string) => void;
}

export const SmartActions = ({ onAction }: SmartActionProps) => {
  const actions = [
    {
      id: "fee-reminder",
      label: "Send Fee Reminders",
      icon: Bell,
      desc: "Notify 42 debtors",
      color: "hover:bg-purple-50 text-purple-600 border-purple-100",
      iconBg: "bg-purple-100",
    },
    {
      id: "pta-meeting",
      label: "Schedule PTA",
      icon: Calendar,
      desc: "Termly review",
      color: "hover:bg-blue-50 text-blue-600 border-blue-100",
      iconBg: "bg-blue-100",
    },
    {
      id: "bulk-sms",
      label: "Broadcast SMS",
      icon: Send,
      desc: "Emergency/Updates",
      color: "hover:bg-emerald-50 text-emerald-600 border-emerald-100",
      iconBg: "bg-emerald-100",
    },
  ];

  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">
        Recommended Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className={`flex items-center gap-4 p-4 bg-white border rounded-2xl transition-all hover:shadow-md text-left group ${action.color}`}
          >
            <div
              className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${action.iconBg}`}
            >
              <action.icon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{action.label}</p>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                {action.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
