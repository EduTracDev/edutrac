export type AuditSeverity = "Info" | "Warning" | "Critical";
export type ActionCategory =
  | "Authentication"
  | "Tenant Config"
  | "Data Access"
  | "Database"
  | "Billing";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  actorRole: "Super Admin" | "Tenant Admin" | "System Worker";
  tenantName: string;
  category: ActionCategory;
  action: string;
  ipAddress: string;
  userAgent: string;
  severity: AuditSeverity;
  payloadDiff?: Record<string, unknown>;
}

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log_1001",
    timestamp: "2026-08-19 14:02:11",
    actorName: "Super Admin (Automated)",
    actorEmail: "system@edutrac.app",
    actorRole: "System Worker",
    tenantName: "Global Infrastructure",
    category: "Database",
    action: "SCHEMA_MIGRATION_EXECUTE",
    ipAddress: "10.0.4.12",
    userAgent: "EduTrac-Worker/v2.4",
    severity: "Info",
    payloadDiff: {
      schema: "tenant_crownheights",
      targetVersion: "v2.4.1",
      migrationsApplied: ["0042_add_attendance_indexes.sql"],
    },
  },
  {
    id: "log_1002",
    timestamp: "2026-08-19 13:45:09",
    actorName: "Adewale Bakare",
    actorEmail: "adewale@edutrac.app",
    actorRole: "Super Admin",
    tenantName: "Greenwood International Academy",
    category: "Tenant Config",
    action: "FEATURE_FLAG_TOGGLE",
    ipAddress: "102.89.23.11",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    severity: "Warning",
    payloadDiff: {
      flagKey: "ENABLE_AI_LESSON_PLANNER",
      previousState: false,
      newState: true,
      rolloutPercentage: 50,
    },
  },
  {
    id: "log_1003",
    timestamp: "2026-08-19 12:10:33",
    actorName: "Principal Nwosu",
    actorEmail: "principal@stgregory.edu.ng",
    actorRole: "Tenant Admin",
    tenantName: "St. Gregory College",
    category: "Authentication",
    action: "ADMIN_MFA_FAILED",
    ipAddress: "197.210.44.8",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    severity: "Critical",
    payloadDiff: {
      reason: "Invalid OTP token attempt count exceeded (3)",
      lockoutDurationMins: 15,
    },
  },
  {
    id: "log_1004",
    timestamp: "2026-08-19 10:15:00",
    actorName: "Adewale Bakare",
    actorEmail: "adewale@edutrac.app",
    actorRole: "Super Admin",
    tenantName: "Apex Model Schools",
    category: "Data Access",
    action: "BULK_STUDENT_RECORD_EXPORT",
    ipAddress: "102.89.23.11",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    severity: "Warning",
    payloadDiff: {
      recordsExported: 1420,
      format: "CSV_ENCRYPTED",
    },
  },
];
