export interface SystemKPI {
  id: string;
  label: string;
  value: string;
  changeValue: string;
  trend: "up" | "down" | "neutral";
  timeframe: string;
}

export interface ActivityLog {
  id: string;
  type: "onboarding" | "subscription" | "alert" | "system";
  message: string;
  entityName: string;
  timestamp: string;
  status: "success" | "warning" | "info" | "danger";
}

export interface ChartDataPoint {
  label: string;
  revenue: number;
  activeSchools: number;
}

export const MOCK_KPIS: SystemKPI[] = [
  {
    id: "kpi_1",
    label: "Total Active Schools",
    value: "142",
    changeValue: "+12",
    trend: "up",
    timeframe: "vs last month",
  },
  {
    id: "kpi_2",
    label: "Platform Users",
    value: "84.2K",
    changeValue: "+5.1K",
    trend: "up",
    timeframe: "vs last month",
  },
  {
    id: "kpi_3",
    label: "Monthly Recurring Revenue",
    value: "$42,500",
    changeValue: "+$3,200",
    trend: "up",
    timeframe: "vs last month",
  },
  {
    id: "kpi_4",
    label: "System Error Rate",
    value: "0.04%",
    changeValue: "-0.01%",
    trend: "down", // For errors, down is good, but we'll style it contextually
    timeframe: "vs last month",
  },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { label: "Feb", revenue: 28000, activeSchools: 110 },
  { label: "Mar", revenue: 31000, activeSchools: 115 },
  { label: "Apr", revenue: 32500, activeSchools: 121 },
  { label: "May", revenue: 35000, activeSchools: 128 },
  { label: "Jun", revenue: 38500, activeSchools: 135 },
  { label: "Jul", revenue: 42500, activeSchools: 142 },
];

export const MOCK_ACTIVITIES: ActivityLog[] = [
  {
    id: "act_1",
    type: "onboarding",
    message: "New school workspace provisioned",
    entityName: "Lagos Prep Academy",
    timestamp: "10 mins ago",
    status: "success",
  },
  {
    id: "act_2",
    type: "subscription",
    message: "Upgraded to Enterprise Tier",
    entityName: "St. Jude Grammar",
    timestamp: "2 hours ago",
    status: "info",
  },
  {
    id: "act_3",
    type: "alert",
    message: "Approaching storage capacity limit (92%)",
    entityName: "Greenwood High",
    timestamp: "5 hours ago",
    status: "warning",
  },
  {
    id: "act_4",
    type: "system",
    message: "Database automated backup completed",
    entityName: "System-Wide",
    timestamp: "1 day ago",
    status: "success",
  },
];
