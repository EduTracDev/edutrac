"use client";

interface NotificationToggleProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
  icon?: React.ReactNode;
}

export const NotificationToggle = ({
  title,
  description,
  enabled,
  onChange,
  icon,
}: NotificationToggleProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-100 transition-all group">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="p-2 bg-white rounded-xl text-slate-400 group-hover:text-[#923CF9] transition-colors shadow-sm">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800">
            {title}
          </h4>
          <p className="text-[10px] font-medium text-slate-400 leading-relaxed max-w-[280px]">
            {description}
          </p>
        </div>
      </div>

      {/* Custom Toggle Switch */}
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#923CF9]/20 ${
          enabled ? "bg-[#923CF9]" : "bg-slate-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
