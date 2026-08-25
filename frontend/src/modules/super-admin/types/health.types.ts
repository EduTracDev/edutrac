export type HealthStatus = "Operational" | "Degraded" | "Outage" | "Maintenance";

export interface ServiceMetric {
  id: string;
  name: string;
  category: "Core API" | "Database" | "Storage & CDN" | "Integration";
  status: HealthStatus;
  latencyMs: number;
  uptime90d: number; // e.g. 99.98%
  lastChecked: string;
}

export interface SystemResourceMetrics {
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  storageUsedTB: number;
  storageTotalTB: number;
  activeWebsockets: number;
  requestsPerSecond: number;
}

export interface SystemAlert {
  id: string;
  severity: "Critical" | "Warning" | "Info";
  service: string;
  message: string;
  timestamp: string;
}

export const MOCK_SERVICES: ServiceMetric[] = [
  {
    id: "srv_1",
    name: "Multi-Tenant API Gateway",
    category: "Core API",
    status: "Operational",
    latencyMs: 42,
    uptime90d: 99.99,
    lastChecked: "Just now",
  },
  {
    id: "srv_2",
    name: "Primary PostgreSQL Cluster",
    category: "Database",
    status: "Operational",
    latencyMs: 12,
    uptime90d: 99.95,
    lastChecked: "Just now",
  },
  {
    id: "srv_3",
    name: "Redis Cache Grid",
    category: "Database",
    status: "Operational",
    latencyMs: 4,
    uptime90d: 100.0,
    lastChecked: "Just now",
  },
  {
    id: "srv_4",
    name: "S3 Student Document Vault",
    category: "Storage & CDN",
    status: "Operational",
    latencyMs: 85,
    uptime90d: 99.98,
    lastChecked: "1 min ago",
  },
  {
    id: "srv_5",
    name: "SMS Gateway Integration (Twilio/Termii)",
    category: "Integration",
    status: "Degraded",
    latencyMs: 410,
    uptime90d: 98.42,
    lastChecked: "Just now",
  },
];

export const MOCK_RESOURCE_METRICS: SystemResourceMetrics = {
  cpuUsagePercent: 34,
  memoryUsagePercent: 62,
  storageUsedTB: 4.2,
  storageTotalTB: 10.0,
  activeWebsockets: 18420,
  requestsPerSecond: 1240,
};

export const MOCK_ALERTS: SystemAlert[] = [
  {
    id: "alt_101",
    severity: "Warning",
    service: "SMS Gateway Integration",
    message: "Third-party latency spike detected (>400ms avg response). Retry rates elevated.",
    timestamp: "10 mins ago",
  },
  {
    id: "alt_102",
    severity: "Info",
    service: "S3 Student Document Vault",
    message: "Automated incremental backup job completed successfully.",
    timestamp: "1 hour ago",
  },
];