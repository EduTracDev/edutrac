// @/modules/school-admin/components/announcements/modals/AnnouncementDetailsModal.tsx
import Modal from "../../../../shared/component/Modal";
import { AnnouncementLog } from "@/modules/types/dashboard";
import { ChannelIcon } from "@/modules/school-admin/components/announcements/AnnouncementTableRow";
import { Calendar, User, Users } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  log: AnnouncementLog | null;
}

export const AnnouncementDetailsModal = ({ isOpen, onClose, log }: Props) => {
  if (!log) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Announcement Details">
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400">
              <Calendar size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none">
                Date Sent
              </p>
              <p className="text-xs font-bold text-slate-700">
                {new Date(log.sentAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <div className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400">
              <User size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none">
                Sender
              </p>
              <p className="text-xs font-bold text-slate-700">{log.sentBy}</p>
            </div>
          </div>
        </div>

        {/* Audience & Channel */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-slate-100 rounded-2xl">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
              Channel
            </p>
            <div className="flex items-center gap-2">
              <ChannelIcon channel={log.channel} />
              <span className="text-sm font-bold text-slate-800">
                {log.channel}
              </span>
            </div>
          </div>
          <div className="p-4 border border-slate-100 rounded-2xl">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
              Audience
            </p>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#923CF9]" />
              <span className="text-sm font-bold text-slate-800">
                {log.audience}
              </span>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase">
            Full Message Body
          </p>
          <div className="p-5 bg-white border border-slate-100 rounded-3xl text-slate-700 text-sm leading-relaxed whitespace-pre-wrap italic shadow-inner">
            "{log.content}"
          </div>
        </div>

        {/* Delivery Summary */}
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700">
              Message Delivered Successfully
            </span>
          </div>
          <span className="text-xs font-black text-emerald-700">
            {log.recipientsCount} Recipients
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition-colors"
        >
          Close Log
        </button>
      </div>
    </Modal>
  );
};
