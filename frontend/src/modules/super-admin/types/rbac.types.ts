export type GlobalRole =
  | "Super Admin"
  | "Support Engineer"
  | "Billing Manager"
  | "Auditor";

export interface SystemPermission {
  id: string;
  code: string;
  name: string;
  description: string;
  category:
    | "Tenant Control"
    | "Financials"
    | "Security & Logs"
    | "System Settings";
}

export interface SystemUser {
  id: string;
  fullName: string;
  email: string;
  role: GlobalRole;
  status: "Active" | "Suspended" | "Pending Setup";
  lastActive: string;
  mfaEnabled: boolean;
}

export const SYSTEM_PERMISSIONS: SystemPermission[] = [
  {
    id: "p1",
    code: "tenant:create",
    name: "Provision Tenants",
    description: "Create and configure new school workspaces.",
    category: "Tenant Control",
  },
  {
    id: "p2",
    code: "tenant:delete",
    name: "Deprovision Tenants",
    description: "Hard-delete or suspend tenant instances.",
    category: "Tenant Control",
  },
  {
    id: "p3",
    code: "billing:invoice",
    name: "Manage Invoices",
    description: "Issue, override, and void SaaS billing invoices.",
    category: "Financials",
  },
  {
    id: "p4",
    code: "billing:plan",
    name: "Adjust Plans",
    description: "Upgrade or downgrade tenant subscription tiers.",
    category: "Financials",
  },
  {
    id: "p5",
    code: "audit:view",
    name: "View Audit Logs",
    description: "Access platform-wide security and operational logs.",
    category: "Security & Logs",
  },
  {
    id: "p6",
    code: "user:manage",
    name: "Manage Staff Roles",
    description: "Grant system-level access and modify user roles.",
    category: "System Settings",
  },
];

export const MOCK_SYSTEM_USERS: SystemUser[] = [
  {
    id: "usr_1",
    fullName: "Alex Rivera",
    email: "a.rivera@edutrac.io",
    role: "Super Admin",
    status: "Active",
    lastActive: "Just now",
    mfaEnabled: true,
  },
  {
    id: "usr_2",
    fullName: "Aisha Bello",
    email: "a.bello@edutrac.io",
    role: "Support Engineer",
    status: "Active",
    lastActive: "2 hours ago",
    mfaEnabled: true,
  },
  {
    id: "usr_3",
    fullName: "Chidi Nwosu",
    email: "c.nwosu@edutrac.io",
    role: "Billing Manager",
    status: "Pending Setup",
    lastActive: "Never",
    mfaEnabled: false,
  },
];
