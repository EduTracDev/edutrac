"use client";

import React, { useState, useMemo } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import {
  MOCK_AUDIT_LOGS,
  AuditLogEntry,
} from "@/modules/super-admin/types/audit.types";
import { AuditLogFilters } from "@/modules/super-admin/components/AuditLogFilters";
import { AuditLogDetailsModal } from "@/modules/super-admin/components/AuditLogDetailsModal";

export default function AuditLogsPage() {
  const [logs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState("ALL");
  const [inspectLog, setInspectLog] = useState<AuditLogEntry | null>(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress.includes(searchQuery);

      const matchesCat =
        selectedCategory === "ALL" || log.category === selectedCategory;
      const matchesSev =
        selectedSeverity === "ALL" || log.severity === selectedSeverity;

      return matchesSearch && matchesCat && matchesSev;
    });
  }, [logs, searchQuery, selectedCategory, selectedSeverity]);

  const handleExportCsv = () => {
    alert("Exporting current audit log trail view to CSV file.");
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "Warning":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Platform Audit Logs
          </h1>
          <p className="text-sm text-slate-500">
            Immutable audit trail for security events, administrative access,
            and system mutations.
          </p>
        </div>

        {/* Filter Toolbar */}
        <AuditLogFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSeverity={selectedSeverity}
          onSeverityChange={setSelectedSeverity}
          onExportCsv={handleExportCsv}
        />

        {/* Audit Logs Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor & Role</th>
                  <th className="p-3">Tenant Scope</th>
                  <th className="p-3">Category & Action</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 font-mono text-slate-500">
                      {log.timestamp}
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900">
                        {log.actorName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {log.actorRole}
                      </p>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {log.tenantName}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-bold border border-slate-200 mr-2">
                        {log.category}
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${getSeverityBadge(log.severity)}`}
                      >
                        {log.severity}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">
                      {log.ipAddress}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setInspectLog(log)}
                        className="px-2.5 py-1 font-bold text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {inspectLog && (
          <AuditLogDetailsModal
            log={inspectLog}
            onClose={() => setInspectLog(null)}
          />
        )}
      </div>
    </SuperAdminLayout>
  );
}
