export type RoleType = "Super Admin" | "School Admin" | "Teacher" | "Parent" | "Student";

export interface PermissionItem {
  id: string;
  label: string;
  description: string;
  module: "Schools" | "Users" | "Academics" | "Billing" | "Announcements" | "Settings";
}

export interface RoleDefinition {
  id: RoleType;
  name: string;
  description: string;
  isSystem: boolean; // Immutable roles like Super Admin
  userCount: number;
  permissions: string[]; // Array of permission IDs
}

// Available Granular Permissions
export const PERMISSIONS_LIST: PermissionItem[] = [
  // Schools
  { id: "schools:view", label: "View Schools", description: "View school list and profiles", module: "Schools" },
  { id: "schools:manage", label: "Manage Schools", description: "Create, edit, suspend, or onboard schools", module: "Schools" },
  
  // Users
  { id: "users:view", label: "View Users", description: "View user profiles and lists", module: "Users" },
  { id: "users:manage", label: "Manage Users", description: "Create, edit, reset passwords, or suspend users", module: "Users" },
  
  // Academics
  { id: "academics:view", label: "View Classes & Grades", description: "Access student grades and course materials", module: "Academics" },
  { id: "academics:manage", label: "Manage Academics", description: "Create classes, record grades, manage curriculum", module: "Academics" },
  
  // Announcements
  { id: "announcements:view", label: "View Announcements", description: "Read global or school announcements", module: "Announcements" },
  { id: "announcements:publish", label: "Publish Announcements", description: "Dispatch platform or school wide messages", module: "Announcements" },

  // Billing
  { id: "billing:view", label: "View Billing & Invoices", description: "Access financial and payment records", module: "Billing" },
  { id: "billing:manage", label: "Manage Subscriptions", description: "Upgrade, cancel, or modify plans", module: "Billing" },

  // System Settings
  { id: "settings:manage", label: "System Configuration", description: "Modify platform configuration and security settings", module: "Settings" },
];

export const INITIAL_ROLES: RoleDefinition[] = [
  {
    id: "Super Admin",
    name: "Super Admin",
    description: "Full system-wide administrative access across all institutions.",
    isSystem: true,
    userCount: 3,
    permissions: PERMISSIONS_LIST.map((p) => p.id),
  },
  {
    id: "School Admin",
    name: "School Administrator",
    description: "Full operational control over a specific registered school.",
    isSystem: false,
    userCount: 128,
    permissions: [
      "schools:view",
      "users:view",
      "users:manage",
      "academics:view",
      "academics:manage",
      "announcements:view",
      "announcements:publish",
      "billing:view",
    ],
  },
  {
    id: "Teacher",
    name: "Teacher / Educator",
    description: "Access to assigned classes, student records, and grading tools.",
    isSystem: false,
    userCount: 3120,
    permissions: ["users:view", "academics:view", "academics:manage", "announcements:view"],
  },
  {
    id: "Parent",
    name: "Parent / Guardian",
    description: "Read-only access to enrolled ward performance, fees, and announcements.",
    isSystem: false,
    userCount: 38900,
    permissions: ["academics:view", "announcements:view", "billing:view"],
  },
  {
    id: "Student",
    name: "Student",
    description: "Access to enrolled courses, timetables, grades, and announcements.",
    isSystem: false,
    userCount: 48250,
    permissions: ["academics:view", "announcements:view"],
  },
];