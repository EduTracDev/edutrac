"use client";

import React, { useState } from "react";
import { MaintenanceSettings } from "../types/systemSettings.types";

interface MaintenanceCardProps {
  settings: MaintenanceSettings;
  onSave: (updated: MaintenanceSettings) => void;
}

export function MaintenanceCard({ settings, onSave }: MaintenanceCardProps) {
  const [formData, setFormData] = useState<MaintenanceSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
      formData.isMaintenanceModeActive ? "border-amber-400 ring-2 ring-amber-400/20" : "border-slate-200"
    }`}>
      <div className={`p-5 border-b flex justify-between items-center ${
        formData.isMaintenanceModeActive ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"
      }`}>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Platform Maintenance Mode</h3>
          <p className="text-xs text-slate-500">
            Restrict school tenant access during emergency maintenance or system upgrades.
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase ${
          formData.isMaintenanceModeActive ? "bg-amber-200 text-amber-900" : "bg-emerald-100 text-emerald-800"
        }`}>
          {formData.isMaintenanceModeActive ? "Maintenance Active" : "Operational"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-800">Toggle Maintenance State</p>
            <p className="text-[11px] text-slate-500">
              When enabled, non-superadmin users will be redirected to the maintenance status page.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isMaintenanceModeActive}
              onChange={(e) => setFormData({ ...formData, isMaintenanceModeActive: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Global Announcement Message
          </label>
          <textarea
            rows={2}
            value={formData.maintenanceMessage}
            onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
            className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
            placeholder="System maintenance in progress. Expected restoration at 04:00 UTC."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Bypass IP Whitelist (Comma-Separated)
            </label>
            <input
              type="text"
              value={formData.allowedIPs}
              onChange={(e) => setFormData({ ...formData, allowedIPs: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled Start</label>
              <input
                type="text"
                value={formData.scheduledStartTime}
                onChange={(e) => setFormData({ ...formData, scheduledStartTime: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled End</label>
              <input
                type="text"
                value={formData.scheduledEndTime}
                onChange={(e) => setFormData({ ...formData, scheduledEndTime: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {isSaved && <span className="text-xs font-bold text-emerald-600 self-center">Settings saved!</span>}
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Update Maintenance Mode
          </button>
        </div>
      </form>
    </div>
  );
}