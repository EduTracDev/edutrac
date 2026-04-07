import { Lock, LogOut, Trash2 } from "lucide-react";

export const SecuritySettings = () => {
  const actions = [
    {
      label: "Change Password",
      icon: Lock,
      color: "text-[#923CF9]",
      bg: "bg-[#923CF9]/5",
    },
    {
      label: "Logout",
      icon: LogOut,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Deactivate Account",
      icon: Trash2,
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm mt-6">
      <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-1">
        Security & Account
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center p-6 rounded-[24px] border border-slate-50 hover:border-slate-200 hover:bg-slate-50 transition-all gap-3"
          >
            <div className={`p-3 ${action.bg} ${action.color} rounded-2xl`}>
              <action.icon size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
