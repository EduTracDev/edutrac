import { AnnouncementLog } from "@/modules/types/dashboard";
import AnnouncementTableRow from "./AnnouncementTableRow";
import { AnnouncementMobileCard } from "./AnnouncementMobileCard";

export const AnnouncementTable = ({
  logs,
  onView,
}: {
  logs: AnnouncementLog[];
  onView: (log: AnnouncementLog) => void;
}) => {
  return (
    <div className="w-full">
      {/* Desktop Header & Table */}
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Announcement
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Target
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Method
              </th>
              <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Sent Date
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <AnnouncementTableRow key={log.id} log={log} onView={onView} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stack */}
      <div className="md:hidden p-4 bg-slate-50/30">
        {logs.map((log) => (
          <AnnouncementMobileCard key={log.id} log={log} onView={onView} />
        ))}
      </div>
    </div>
  );
};
