"use client";

import React, { useState } from "react";
import { BackupRecord } from "../types/systemSettings.types";

interface BackupManagerProps {
  initialBackups: BackupRecord[];
}

export function BackupManager({ initialBackups }: BackupManagerProps) {
  const [backups, setBackups] = useState<BackupRecord[]>(initialBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleTriggerBackup = async () => {
    setIsBackingUp(true);
    await new Promise((res) => setTimeout(res, 1500));

    const newBackup: BackupRecord = {
      id: `bk_${Date.now()}`,
      fileName: `edutrac_manual_${new Date().toISOString().slice(0, 10)}.sql.gz`,
      sizeMB: 1245,
      status: "Completed",
      createdAt: "Just now",
      triggeredBy: "Super Admin (Current Session)",
    };

    setBackups([newBackup, ...backups]);
    setIsBackingUp(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Database Backup & Recovery</h3>
          <p className="text-xs text-slate-500">
            Trigger manual snapshots, configure automated backups, and verify platform restore points.
          </p>
        </div>
        <button
          onClick={handleTriggerBackup}
          disabled={isBackingUp}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isBackingUp && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {isBackingUp ? "Creating Snapshot..." : "Trigger On-Demand Backup"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Backup File</th>
              <th className="p-3">Size</th>
              <th className="p-3">Triggered By</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {backups.map((bk) => (
              <tr key={bk.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-slate-900">{bk.fileName}</td>
                <td className="p-3">{bk.sizeMB} MB</td>
                <td className="p-3">{bk.triggeredBy}</td>
                <td className="p-3 text-slate-500">{bk.createdAt}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {bk.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button className="text-indigo-600 font-bold hover:underline">Download</button>
                  <button className="text-red-600 font-bold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}