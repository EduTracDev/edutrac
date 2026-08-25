"use client";

import React, { useState } from "react";
import { MaintenanceCard } from "@/modules/super-admin/components/MaintenanceCard";
import { BackupManager } from "@/modules/super-admin/components/BackupManager";
import {
  GeneralSettings,
  SecuritySettings,
  MaintenanceSettings,
  MOCK_BACKUPS,
} from "@/modules/super-admin/types/systemSettings.types";

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "security" | "maintenance" | "backups">("maintenance");

  const [general, setGeneral] = useState<GeneralSettings>({
    platformName: "EduTrac SaaS",
    supportEmail: "support@edutrac.io",
    maxFileUploadSizeMB: 50,
    sessionTimeoutMinutes: 60,
    enableMultiTenantIsolation: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    enforce2FAForAdmins: true,
    passwordExpiryDays: 90,
    failedLoginThreshold: 5,
    apiRateLimitPerMinute: 1200,
  });

  const [maintenance, setMaintenance] = useState<MaintenanceSettings>({
    isMaintenanceModeActive: false,
    maintenanceMessage: "EduTrac is currently undergoing scheduled platform upgrades.",
    allowedIPs: "192.168.1.1, 10.0.0.45",
    scheduledStartTime: "2026-08-25T02:00",
    scheduledEndTime: "2026-08-25T04:00",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings & Controls</h1>
        <p className="text-sm text-slate-500">
          Configure platform-wide security policies, maintenance windows, database snapshots, and tenant isolation parameters.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-6">
        {[
          { id: "maintenance", label: "Maintenance & Downtime" },
          { id: "backups", label: "Database Backups" },
          { id: "general", label: "General & Storage" },
          { id: "security", label: "Security & API Limits" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "maintenance" && (
        <MaintenanceCard settings={maintenance} onSave={setMaintenance} />
      )}

      {activeTab === "backups" && (
        <BackupManager initialBackups={MOCK_BACKUPS} />
      )}

      {activeTab === "general" && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-3">Global Application Config</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Platform Name</label>
              <input
                type="text"
                value={general.platformName}
                onChange={(e) => setGeneral({ ...general, platformName: e.target.value })}
                className="w-full p-2.5 border rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Support Email Address</label>
              <input
                type="email"
                value={general.supportEmail}
                onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                className="w-full p-2.5 border rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Max Upload Size (MB)</label>
              <input
                type="number"
                value={general.maxFileUploadSizeMB}
                onChange={(e) => setGeneral({ ...general, maxFileUploadSizeMB: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Session Inactivity Timeout (Mins)</label>
              <input
                type="number"
                value={general.sessionTimeoutMinutes}
                onChange={(e) => setGeneral({ ...general, sessionTimeoutMinutes: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-lg outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg">Save Settings</button>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-3">Platform Security Thresholds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Failed Login Lockout Threshold</label>
              <input
                type="number"
                value={security.failedLoginThreshold}
                onChange={(e) => setSecurity({ ...security, failedLoginThreshold: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Global Rate Limit (Req/Min)</label>
              <input
                type="number"
                value={security.apiRateLimitPerMinute}
                onChange={(e) => setSecurity({ ...security, apiRateLimitPerMinute: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-lg outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="enforce2fa"
              checked={security.enforce2FAForAdmins}
              onChange={(e) => setSecurity({ ...security, enforce2FAForAdmins: e.target.checked })}
              className="rounded text-indigo-600"
            />
            <label htmlFor="enforce2fa" className="text-xs font-bold text-slate-700">
              Enforce Multi-Factor Authentication (MFA) for all Super Admin & School Admin users
            </label>
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg">Save Security Rules</button>
          </div>
        </div>
      )}
    </div>
  );
}