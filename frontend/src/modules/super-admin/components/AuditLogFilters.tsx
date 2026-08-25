"use client";

import React from "react";

interface AuditLogFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedSeverity: string;
  onSeverityChange: (sev: string) => void;
  onExportCsv: () => void;
}

export function AuditLogFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSeverity,
  onSeverityChange,
  onExportCsv,
}: AuditLogFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center text-xs">
      {/* Search Input */}
      <div className="w-full md:w-80">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search actor, action, tenant, or IP..."
          className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Select Filters */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-2.5 border border-slate-300 rounded-lg bg-white outline-none font-medium"
        >
          <option value="ALL">All Categories</option>
          <option value="Authentication">Authentication</option>
          <option value="Tenant Config">Tenant Config</option>
          <option value="Data Access">Data Access</option>
          <option value="Database">Database</option>
          <option value="Billing">Billing</option>
        </select>

        <select
          value={selectedSeverity}
          onChange={(e) => onSeverityChange(e.target.value)}
          className="p-2.5 border border-slate-300 rounded-lg bg-white outline-none font-medium"
        >
          <option value="ALL">All Severities</option>
          <option value="Info">Info</option>
          <option value="Warning">Warning</option>
          <option value="Critical">Critical</option>
        </select>

        <button
          onClick={onExportCsv}
          className="px-4 py-2.5 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
        >
          ↓ Export CSV
        </button>
      </div>
    </div>
  );
}
