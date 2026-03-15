import { LucideIcon, Plus } from "lucide-react";

interface QuickActionProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function QuickActionCard({
  title,
  icon: Icon,
  onClick,
}: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 text-left hover:border-[#923CF9] hover:bg-[#923CF9]/5 transition-all duration-200"
    >
      <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#923CF9] group-hover:text-white transition-colors">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      </div>
      <Plus size={16} className="text-slate-300 group-hover:text-[#923CF9]" />
    </button>
  );
}
