"use client";

import React from "react";
import { SystemResourceMetrics } from "../types/health.types";

interface SystemResourcesGaugeProps {
  metrics: SystemResourceMetrics;
}

export function SystemResourcesGauge({ metrics }: SystemResourcesGaugeProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* CPU Usage */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider">CPU Utilization</span>
          <span className="font-mono text-slate-400">16 vCPUs</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-slate-900">{metrics.cpuUsagePercent}%</span>
          <span className="text-xs font-semibold text-emerald-600">Optimal</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              metrics.cpuUsagePercent > 80 ? "bg-red-500" : metrics.cpuUsagePercent > 60 ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${metrics.cpuUsagePercent}%` }}
          />
        </div>
      </div>

      {/* Memory Usage */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider">RAM Usage</span>
          <span className="font-mono text-slate-400">64 GB Total</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-slate-900">{metrics.memoryUsagePercent}%</span>
          <span className="text-xs font-semibold text-slate-600">39.6 GB Allocated</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              metrics.memoryUsagePercent > 85 ? "bg-red-500" : metrics.memoryUsagePercent > 70 ? "bg-amber-500" : "bg-indigo-600"
            }`}
            style={{ width: `${metrics.memoryUsagePercent}%` }}
          />
        </div>
      </div>

      {/* Storage Vault */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider">Object Storage</span>
          <span className="font-mono text-slate-400">Multi-Region S3</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-slate-900">{metrics.storageUsedTB} TB</span>
          <span className="text-xs font-semibold text-slate-500">/ {metrics.storageTotalTB} TB</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${(metrics.storageUsedTB / metrics.storageTotalTB) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Traffic */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider">Live WebSockets</span>
          <span className="font-mono text-emerald-600 font-bold">● Active Sync</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-slate-900">
            {metrics.activeWebsockets.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-indigo-600">{metrics.requestsPerSecond} req/s</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}