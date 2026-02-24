import dayjs from "dayjs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const capitalizeFirstLetter = (str: string = "") => {
  if (typeof str !== "string") return str;

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word?.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getHeaders = (type: "teacher" | "child" | "childInfo" | "detail") => {
  if (type === "teacher")
    return ["Name", "Time In", "Time Out", "Hours Worked", "Reason/Note", "Status", "Action"];

  if (type === "child") return ["Child Name", "Time In", "Time Out", "Reason/Note", "Status", "Action"];
  if (type === "childInfo")
    return ["Date", "Time In", "Time Out", "Reason/Note", "Status", "Action"];

  return ["Date", "Time In", "Time Out", "Hours Worked", "Reason/Note", "Status", "Action"];
};

export const appendQueryParams = (url: string, params: Record<string, any>, currentSearchParams?: URLSearchParams): string => {
  // Parse existing params from URL or use provided searchParams
  const urlObj = new URL(url, window.location.origin);
  const existingParams = new URLSearchParams(currentSearchParams || urlObj.search);

  // Merge new params with existing ones
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      existingParams.set(key, params[key]);
    } else {
      existingParams.delete(key);
    }
  });

  const queryString = existingParams.toString();
  return queryString ? `${url.split('?')[0]}?${queryString}` : url.split('?')[0];
};

export function getHoursWorked(timeIn: string, timeOut: string): number {
  const [inH, inM, inS] = timeIn.split(":").map(Number);
  const [outH, outM, outS] = timeOut.split(":").map(Number);

  const dateIn = new Date();
  dateIn.setHours(inH, inM, inS, 0);

  const dateOut = new Date();
  dateOut.setHours(outH, outM, outS, 0);

  // If timeOut is earlier, treat it as next day
  if (dateOut <= dateIn) {
    dateOut.setDate(dateOut.getDate() + 1);
  }

  const diffMs = dateOut.getTime() - dateIn.getTime(); // ✅ now both sides are numbers
  const diffHrs = diffMs / (1000 * 60 * 60);

  return Number(diffHrs.toFixed(2));
}


export function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'; // 11th, 12th, 13th, etc.
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function dateFormatter(date?: string | Date | null, format?: string) {
  if (date && new Date(date).getTime()) {
    const day = dayjs(date).date();
    const daySuffix = getDaySuffix(day);
    format = format || `DD[${daySuffix}] MMM, YYYY`;

    return dayjs(date).format(format);
  } else {
    return '-- / --';
  }
}

export function simpleDateFormatter(date?: string | Date | null) {
  if (date && new Date(date).getTime()) {
    return dayjs(date).format('D MMM, YYYY');
  } else {
    return '-- / --';
  }
}

export function timeFormatter(time?: string | null) {
  if (time && time.includes(':')) {
    const parts = time.split(':');
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (isNaN(hours) || isNaN(minutes)) {
      return time;
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } else {
    return time || '--';
  }
}

export function formatHoursWorked(hours: number | string): string {
  if (typeof hours === 'string') {
    const num = parseFloat(hours);
    if (isNaN(num)) return hours;
    hours = num;
  }
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

/**
 * Get date range based on period type (matches PERIOD_OPTIONS and dashboard filter)
 * @param periodType - "Today", "This week", "This month", "Last month", "This year", "Last year", "Weekly", "Monthly", etc.
 * @returns Object with startDate and endDate in YYYY-MM-DD format
 */
export function getDateRangeByPeriodType(periodType: string): { startDate: string; endDate: string } {
  const today = dayjs();
  let startDate: dayjs.Dayjs;
  let endDate: dayjs.Dayjs = today;

  const normalized = periodType.toLowerCase().trim();

  switch (normalized) {
    case "today":
      startDate = today;
      endDate = today;
      break;
    case "this week":
    case "weekly":
      startDate = today.startOf("week").add(1, "day");
      endDate = today.startOf("week").add(6, "day");
      break;
    case "this month":
    case "monthly":
      startDate = today.startOf("month");
      endDate = today.endOf("month");
      break;
    case "last month": {
      const firstDayLastMonth = today.subtract(1, "month").startOf("month");
      const lastDayLastMonth = today.subtract(1, "month").endOf("month");
      startDate = firstDayLastMonth;
      endDate = lastDayLastMonth;
      break;
    }
    case "this year": {
      startDate = today.startOf("year");
      endDate = today.endOf("year");
      break;
    }
    case "last year": {
      startDate = today.subtract(1, "year").startOf("year");
      endDate = today.subtract(1, "year").endOf("year");
      break;
    }
    default:
      startDate = today;
      endDate = today;
  }

  return {
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD"),
  };
}

/** Number of days for "2 months" threshold (weekly vs monthly) */
const TWO_MONTHS_DAYS = 61;

/**
 * Derive attendancePeriodType from a date range for the dashboard/analytics API.
 * - Up to 7 days → "daily"
 * - More than 7 days and up to 2 months → "weekly" (week 1–5 on backend; fewer weeks = empty points)
 * - More than 2 months / this year / last year → "monthly"
 */
export function getAttendancePeriodTypeFromRange(
  startDate: string,
  endDate: string,
): "daily" | "weekly" | "monthly" | "yearly" {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, "day") + 1;
  if (days <= 7) return "daily";
  if (days <= TWO_MONTHS_DAYS) return "weekly";
  return "monthly";
}

/** X-axis labels for attendance chart by period type (replaces API xAxis) */
export const ATTENDANCE_CHART_XAXIS_LABELS = {
  daily: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
  monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  yearly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
} as const;

export function getXAxisLabelsForAttendancePeriod(
  periodType: "daily" | "weekly" | "monthly" | "yearly",
): string[] {
  return [...ATTENDANCE_CHART_XAXIS_LABELS[periodType]];
}

/**
 * Map API attendanceTrend (present, absent, late arrays) to chart data with our x-axis labels.
 * Pads or trims to match label count.
 */
export function mapAttendanceTrendToChartData(
  trend: { present?: number[]; absent?: number[]; late?: number[] } | null | undefined,
  periodType: "daily" | "weekly" | "monthly" | "yearly",
): Array<{ name: string; present: number; absent: number; late: number }> {
  const labels = getXAxisLabelsForAttendancePeriod(periodType);
  if (!trend) return labels.map((name) => ({ name, present: 0, absent: 0, late: 0 }));
  const present = trend.present ?? [];
  const absent = trend.absent ?? [];
  const late = trend.late ?? [];
  return labels.map((name, idx) => ({
    name,
    present: present[idx] ?? 0,
    absent: absent[idx] ?? 0,
    late: late[idx] ?? 0,
  }));
}

/**
 * Round a value up to a "nice" number for chart Y-axis max.
 * Handles small counts (e.g. 0–100) and large values (e.g. earnings).
 */
export function roundUpToNiceAxisMax(n: number): number {
  if (n <= 0) return 10; // avoid empty axis when no data
  if (n <= 10) return Math.ceil(n);
  if (n <= 100) return Math.ceil(n / 10) * 10;
  if (n <= 1_000) return Math.ceil(n / 50) * 50;
  if (n <= 10_000) return Math.ceil(n / 100) * 100;
  if (n <= 100_000) return Math.ceil(n / 1_000) * 1_000;
  if (n <= 1_000_000) return Math.ceil(n / 10_000) * 10_000;
  return Math.ceil(n / 100_000) * 100_000;
}