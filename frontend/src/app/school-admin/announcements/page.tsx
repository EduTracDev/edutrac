"use client";
import { useState } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";

import { mockAnnouncementHistory } from "@/modules/constants/dashboard";
import { AnnouncementTable } from "@/modules/school-admin/components/announcements/AnnouncementTable";
import { AnnouncementLog } from "@/modules/types/dashboard";
import { AnnouncementDetailsModal } from "@/modules/school-admin/components/dashboard/modals/AnnouncementDetailsModal";
import { AnnouncementStats } from "@/modules/school-admin/components/announcements/AnnouncementStats";

export default function AnnouncementsPage() {
  const [selectedLog, setSelectedLog] = useState<AnnouncementLog | null>(null);
  const totalRecipients = mockAnnouncementHistory.reduce(
    (sum, log) => sum + log.recipientsCount,
    0,
  );
  return (
    <AdminLayout>
      <AnnouncementStats
        totalSent={mockAnnouncementHistory.length}
        totalRecipients={totalRecipients}
        activeChannels={
          new Set(mockAnnouncementHistory.map((log) => log.channel)).size
        }
      />
      <AnnouncementTable
        logs={mockAnnouncementHistory}
        onView={setSelectedLog}
      />
      <AnnouncementDetailsModal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
      />
    </AdminLayout>
  );
}
