// @/modules/school-admin/components/announcements/AnnouncementTableRow.tsx
import {
  AnnouncementLog,
  AnnouncementChannel,
} from "@/modules/types/dashboard";

import { MessageSquare, Phone, Mail, Bell, Eye } from "lucide-react";

interface RowProps {
  log: AnnouncementLog;
  onView: (log: AnnouncementLog) => void;
}

const AnnouncementTableRow = ({ log, onView }: RowProps) => (
  <tr className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
    <td className="p-4">
      <div className="flex flex-col">
        <span className="font-bold text-slate-800 text-sm">{log.title}</span>
        <span className="text-[11px] text-slate-400 truncate max-w-[250px]">
          {log.preview}
        </span>
      </div>
    </td>
    <td className="p-4">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-700">{log.audience}</span>
        <span className="text-[10px] text-slate-400 font-medium">
          {log.recipientsCount} recipients
        </span>
      </div>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full w-fit">
        <ChannelIcon channel={log.channel} />
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">
          {log.channel}
        </span>
      </div>
    </td>
    <td className="p-4">
      <div className="flex flex-col">
        <span className="text-xs text-slate-600 font-bold">
          {new Date(log.sentAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <span className="text-[10px] text-slate-400 uppercase font-black">
          By {log.sentBy}
        </span>
      </div>
    </td>
    <td className="p-4 text-right">
      <button
        onClick={() => onView(log)}
        className="p-2 text-slate-400 hover:text-[#923CF9] hover:bg-[#923CF9]/5 rounded-xl transition-all"
      >
        <Eye size={18} />
      </button>
    </td>
  </tr>
);

export default AnnouncementTableRow;

export const ChannelIcon = ({ channel }: { channel: AnnouncementChannel }) => {
  const config = {
    WhatsApp: {
      icon: <MessageSquare size={14} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    SMS: {
      icon: <Phone size={14} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    Email: {
      icon: <Mail size={14} />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    "In-App": {
      icon: <Bell size={14} />,
      color: "text-[#923CF9]",
      bg: "bg-[#923CF9]/5",
      border: "border-[#923CF9]/10",
    },
  };

  const { icon, color, bg, border } = config[channel];

  return (
    <div
      className={`flex items-center justify-center p-1.5 rounded-lg border ${bg} ${color} ${border}`}
    >
      {icon}
    </div>
  );
};
