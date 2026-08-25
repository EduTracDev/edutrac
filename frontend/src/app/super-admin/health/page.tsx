"use client";

import React, { useState } from "react";
import {
  MOCK_SERVICES,
  MOCK_RESOURCE_METRICS,
  MOCK_ALERTS,
  ServiceMetric,
  SystemAlert,
} from "@/modules/super-admin/types/health.types";
import { SystemResourcesGauge } from "@/modules/super-admin/components/SystemResourcesGauge";
import { ServiceStatusTable } from "@/modules/super-admin/components/ServiceStatusTable";

export default function SystemHealthPage() {
  const [services] = useState<ServiceMetric[]>(MOCK_SERVICES);
  const [resourceMetrics] = useState(MOCK_RESOURCE_METRICS);
  const [alerts, setAlerts] = useState<SystemAlert[]>(MOCK_ALERTS);

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const hasDegradedService = services.some((s) => s.status !== "Operational");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            System Health & Status
          </h1>
          <p className="text-sm text-slate-500">
            Platform infrastructure metrics, latency monitoring, and active
            service alerts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                hasDegradedService ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                hasDegradedService ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
          </span>
          <span className="text-xs font-bold text-slate-700">
            {hasDegradedService
              ? "Partial Degradation"
              : "All Systems Operational"}
          </span>
        </div>
      </div>

      {/* Resource Utilization Gauges */}
      <SystemResourcesGauge metrics={resourceMetrics} />

      {/* Operational Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Operational Incidents
          </h3>
          <div className="space-y-2">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className={`p-3.5 rounded-xl border text-xs flex justify-between items-center ${
                  alt.severity === "Critical"
                    ? "bg-red-50 border-red-200 text-red-900"
                    : alt.severity === "Warning"
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-blue-50 border-blue-200 text-blue-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-extrabold uppercase text-[10px] px-2 py-0.5 rounded bg-white/60">
                    {alt.severity}
                  </span>
                  <div>
                    <span className="font-bold mr-1.5">[{alt.service}]</span>
                    <span>{alt.message}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {alt.timestamp}
                  </span>
                  <button
                    onClick={() => dismissAlert(alt.id)}
                    className="font-bold text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Table */}
      <ServiceStatusTable services={services} />
    </div>
  );
}
