import { AnnouncementLog } from "@/modules/types/dashboard";
import { ChannelIcon } from "./AnnouncementTableRow";

interface RowProps {
  log: AnnouncementLog;
  onView: (log: AnnouncementLog) => void;
}

export const AnnouncementMobileCard = ({ log, onView }: RowProps) => (
  <div
    onClick={() => onView(log)}
    className="p-4 bg-white border border-slate-100 rounded-[24px] mb-3 active:scale-[0.98] transition-transform"
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg">
        <ChannelIcon channel={log.channel} />
        <span className="text-[9px] font-black text-slate-500 uppercase">
          {log.channel}
        </span>
      </div>
      <span className="text-[10px] font-bold text-slate-400">
        {new Date(log.sentAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
    </div>

    <h3 className="font-bold text-slate-800 text-sm mb-1">{log.title}</h3>
    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
      {log.preview}
    </p>

    <div className="flex justify-between items-center pt-3 border-t border-slate-50">
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 uppercase font-black">
          Audience
        </span>
        <span className="text-xs font-bold text-slate-700">{log.audience}</span>
      </div>
      <div className="text-right">
        <span className="text-[10px] text-slate-400 uppercase font-black">
          Recipients
        </span>
        <p className="text-xs font-bold text-[#923CF9]">
          {log.recipientsCount}
        </p>
      </div>
    </div>
  </div>
);
