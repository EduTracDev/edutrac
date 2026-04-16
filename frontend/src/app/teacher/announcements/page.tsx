"use client";
import { useState } from "react";
import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import { mockAnnouncementHistory } from "@/modules/constants/dashboard";
import { AnnouncementTable } from "@/modules/school-admin/components/announcements/AnnouncementTable";
import {
  AnnouncementCategory,
  AnnouncementLog,
} from "@/modules/types/dashboard";
import { AnnouncementStats } from "@/modules/school-admin/components/announcements/AnnouncementStats";
import { AnnouncementComposer } from "@/modules/teacher/components/announcements/AnnouncementComposer";
import { Plus } from "lucide-react";
import { AnnouncementDetailsModal } from "@/modules/school-admin/components/dashboard/modals/AnnouncementDetailsModal";

export default function AnnouncementPage() {
  const [selectedLog, setSelectedLog] = useState<AnnouncementLog | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const [logs, setLogs] = useState<AnnouncementLog[]>(mockAnnouncementHistory);

  interface AnnouncementFormData {
    title: string;
    content: string;
    category: AnnouncementCategory;
    targetAudience: string[];
  }

  const handleBroadcast = (formData: AnnouncementFormData) => {
    const newLog: AnnouncementLog = {
      id: crypto.randomUUID(),
      title: formData.title,
      preview: formData.content.substring(0, 60) + "...",
      content: formData.content,
      channel: "In-App", // Teachers might default to In-App
      audience: "Specific Class",
      targetDetail: formData.targetAudience.join(", "), // e.g. "JSS 2 Gold"
      sentAt: new Date().toISOString(),
      sentBy: "Teacher Name", // This would come from your Auth context
      status: "Delivered",
      recipientsCount: 45, // This would be calculated from the class size
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <TeacherLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-800">
              Announcements
            </h1>
            <p className="text-slate-500 font-medium">
              Broadcast updates to your classes.
            </p>
          </div>
          <button
            onClick={() => setIsComposing(true)}
            className="bg-[#923CF9] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:bg-[#8126e8] transition-all flex items-center gap-2"
          >
            <Plus size={18} /> New Announcement
          </button>
        </header>

        {/* Announcement Stats - Reusing the card logic from Results */}
        <AnnouncementStats
          variant="teacher"
          totalSent={logs.length}
          totalRecipients={120}
          classCount={3}
        />
        {/* The Feed */}
        <div className="grid gap-6">
          {isComposing && (
            <AnnouncementComposer
              onSave={handleBroadcast}
              onCancel={() => setIsComposing(false)}
              availableClasses={["JSS 2 Gold", "SS 2 Science", "SS 3 Art"]}
            />
          )}

          {/* You can now map through 'logs' to show a history table or feed below */}
          {/* <AnnouncementTable logs={logs} /> */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">
              Broadcast History
            </h2>

            <AnnouncementTable logs={logs} onView={setSelectedLog} />
          </div>
          <AnnouncementDetailsModal
            isOpen={!!selectedLog}
            onClose={() => setSelectedLog(null)}
            log={selectedLog}
          />
        </div>
      </div>
    </TeacherLayout>
  );
}
