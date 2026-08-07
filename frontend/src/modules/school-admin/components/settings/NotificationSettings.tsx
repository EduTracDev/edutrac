// @/modules/shared/components/settings/NotificationSettings.tsx
"use client";

import { useState } from "react";
import { SettingsSection } from "@/modules/shared/settings/SettingsSection";
import { NotificationToggle } from "./NotificationToggle";
import { Mail, Bell, Smartphone, ShieldCheck } from "lucide-react";

interface NotificationSettingsProps {
  role: "admin" | "teacher" | "parent";
}

export const NotificationSettings = ({ role }: NotificationSettingsProps) => {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: false,
    securityAlerts: true,
    academicUpdates: true,
  });

  const updateSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SettingsSection
        title="Communication Preferences"
        description="Manage how Edutrac reaches out to you for important updates."
      >
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <NotificationToggle
            title="Email Notifications"
            description="Receive weekly summaries and direct messages in your inbox."
            enabled={settings.emailAlerts}
            onChange={() => updateSetting("emailAlerts")}
            icon={<Mail size={16} />}
          />

          <NotificationToggle
            title="Browser Push"
            description="Get real-time alerts on your desktop even when {schoolName} is closed."
            enabled={settings.pushNotifications}
            onChange={() => updateSetting("pushNotifications")}
            icon={<Bell size={16} />}
          />

          <NotificationToggle
            title="Security Alerts"
            description="Crucial alerts regarding password changes and new logins."
            enabled={settings.securityAlerts}
            onChange={() => updateSetting("securityAlerts")}
            icon={<ShieldCheck size={16} />}
          />

          {/* Role-Specific Toggle */}
          {role === "teacher" && (
            <NotificationToggle
              title="Academic Submissions"
              description="Notify me when a student submits an assignment or test."
              enabled={settings.academicUpdates}
              onChange={() => updateSetting("academicUpdates")}
              icon={<Smartphone size={16} />}
            />
          )}

          {role === "parent" && (
            <NotificationToggle
              title="Student Performance"
              description="Alerts for grade drops or attendance issues for your children."
              enabled={settings.academicUpdates}
              onChange={() => updateSetting("academicUpdates")}
              icon={<Smartphone size={16} />}
            />
          )}
        </div>
      </SettingsSection>
    </div>
  );
};
