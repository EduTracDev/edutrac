"use client";

import React from "react";
import { ServiceMetric, HealthStatus } from "../types/health.types";

interface ServiceStatusTableProps {
  services: ServiceMetric[];
}

export function ServiceStatusTable({ services }: ServiceStatusTableProps) {
  const getBadgeStyle = (status: HealthStatus) => {
    switch (status) {
      case "Operational":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Degraded":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Outage":
        return "bg-red-100 text-red-800 border-red-200";
      case "Maintenance":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Infrastructure Microservices</h3>
          <p className="text-xs text-slate-500">Real-time health probes and API endpoint latency.</p>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Automated poll: 15s</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/60 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Service Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Avg Latency</th>
              <th className="p-3">90-Day Uptime</th>
              <th className="p-3 text-right">Last Verified</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {services.map((srv) => (
              <tr key={srv.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{srv.name}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-bold text-slate-600 border border-slate-200">
                    {srv.category}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeStyle(srv.status)}`}>
                    {srv.status}
                  </span>
                </td>
                <td className="p-3 font-mono font-semibold text-slate-800">{srv.latencyMs} ms</td>
                <td className="p-3 font-mono font-bold text-slate-900">{srv.uptime90d}%</td>
                <td className="p-3 text-right text-slate-400">{srv.lastChecked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}