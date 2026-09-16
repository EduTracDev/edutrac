"use client";

import React from "react";
import { AuditLogEntry } from "../types/audit.types";

interface AuditLogDetailsModalProps {
  log: AuditLogEntry;
  onClose: () => void;
}

export function AuditLogDetailsModal({
  log,
  onClose,
}: AuditLogDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Audit Log Event Payload
            </h3>
            <p className="text-[11px] font-mono text-slate-400">{log.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">
                Actor Email
              </span>
              <span className="font-bold text-slate-800">{log.actorEmail}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">
                Target Tenant
              </span>
              <span className="font-bold text-slate-800">{log.tenantName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">
                Origin IP
              </span>
              <span className="font-bold text-slate-800">{log.ipAddress}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">
                Timestamp
              </span>
              <span className="font-bold text-slate-800">{log.timestamp}</span>
            </div>
          </div>

          <div>
            <span className="block font-bold text-slate-700 mb-1">
              User Agent
            </span>
            <p className="p-2 bg-slate-100 rounded text-slate-600 font-mono text-[11px] break-all">
              {log.userAgent}
            </p>
          </div>

          {/* JSON Payload Diff */}
          <div>
            <span className="block font-bold text-slate-700 mb-1">
              Action Payload Diff / Metadata
            </span>
            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg overflow-x-auto font-mono text-[11px] leading-relaxed">
              {JSON.stringify(log.payloadDiff || {}, null, 2)}
            </pre>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
