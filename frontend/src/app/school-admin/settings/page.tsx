"use client";

import { useState } from "react";
import {
  SettingsLayout,
  SettingsTab,
} from "@/modules/shared/settings/SettingsLayout";
import { SettingsSection } from "@/modules/shared/settings/SettingsSection";
import { ProfileForm } from "@/modules/school-admin/components/profile/ProfileForm";
import { SecuritySettings } from "@/modules/school-admin/components/profile/SecuritySettings";
import { ProfileHeader } from "@/modules/school-admin/components/profile/ProfileHeader";
import { NotificationSettings } from "@/modules/school-admin/components/settings/NotificationSettings";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "profile" && (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <ProfileHeader
            name="Adewale Johnson" // Replace with actual dynamic data
            email="a.johnson@greentreeschool.edu"
            role="Chief Administrator"
            schoolName="Green Tree School"
          />
          <ProfileForm role="admin" />
        </div>
      )}
      {activeTab === "security" && (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <SecuritySettings isTeacher={false} />
        </div>
      )}
      {activeTab === "notifications" && <NotificationSettings role="admin" />}
    </SettingsLayout>
  );
}
