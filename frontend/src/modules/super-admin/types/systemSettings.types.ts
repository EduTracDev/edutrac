export interface GeneralSettings {
  platformName: string;
  supportEmail: string;
  maxFileUploadSizeMB: number;
  sessionTimeoutMinutes: number;
  enableMultiTenantIsolation: boolean;
}

export interface SecuritySettings {
  enforce2FAForAdmins: boolean;
  passwordExpiryDays: number;
  failedLoginThreshold: number;
  apiRateLimitPerMinute: number;
}

export interface MaintenanceSettings {
  isMaintenanceModeActive: boolean;
  maintenanceMessage: string;
  allowedIPs: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
}

export interface BackupRecord {
  id: string;
  fileName: string;
  sizeMB: number;
  status: "Completed" | "In Progress" | "Failed";
  createdAt: string;
  triggeredBy: string;
}

export const MOCK_BACKUPS: BackupRecord[] = [
  {
    id: "bk_1",
    fileName: "edutrac_prod_db_20260819_0000.sql.gz",
    sizeMB: 1240,
    status: "Completed",
    createdAt: "Aug 19, 2026, 00:00 AM",
    triggeredBy: "Automated Daily Schedule",
  },
  {
    id: "bk_2",
    fileName: "edutrac_prod_db_20260818_0000.sql.gz",
    sizeMB: 1232,
    status: "Completed",
    createdAt: "Aug 18, 2026, 00:00 AM",
    triggeredBy: "Automated Daily Schedule",
  },
  {
    id: "bk_3",
    fileName: "edutrac_manual_pre_migration.sql.gz",
    sizeMB: 1228,
    status: "Completed",
    createdAt: "Aug 15, 2026, 03:45 PM",
    triggeredBy: "Super Admin (Alex Rivera)",
  },
];
