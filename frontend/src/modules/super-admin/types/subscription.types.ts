export type PlanTier = "Basic" | "Professional" | "Enterprise";
export type BillingCycle = "Monthly" | "Annual";
export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Cancelled";

export interface SubscriptionPlan {
  id: string;
  name: PlanTier;
  monthlyPrice: number;
  annualPrice: number;
  maxStudents: number;
  maxStorageGB: number;
  features: string[];
}

export interface TenantSubscription {
  id: string;
  schoolId: string;
  schoolName: string;
  planTier: PlanTier;
  billingCycle: BillingCycle;
  amount: number;
  nextBillingDate: string;
  autoRenew: boolean;
  status: "Active" | "Past Due" | "Trialing" | "Cancelled";
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  schoolName: string;
  planTier: PlanTier;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: InvoiceStatus;
}

export const MOCK_SUBSCRIPTIONS: TenantSubscription[] = [
  {
    id: "sub_1",
    schoolId: "sch_1",
    schoolName: "Greenwood High",
    planTier: "Professional",
    billingCycle: "Annual",
    amount: 3200,
    nextBillingDate: "Nov 15, 2026",
    autoRenew: true,
    status: "Active",
  },
  {
    id: "sub_2",
    schoolId: "sch_2",
    schoolName: "St. Jude Grammar",
    planTier: "Enterprise",
    billingCycle: "Monthly",
    amount: 550,
    nextBillingDate: "Sep 01, 2026",
    autoRenew: true,
    status: "Active",
  },
  {
    id: "sub_3",
    schoolId: "sch_3",
    schoolName: "Lagos Prep Academy",
    planTier: "Basic",
    billingCycle: "Monthly",
    amount: 150,
    nextBillingDate: "Aug 22, 2026",
    autoRenew: false,
    status: "Past Due",
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv_101",
    invoiceNumber: "INV-2026-001",
    schoolName: "Greenwood High",
    planTier: "Professional",
    amount: 3200,
    issueDate: "Nov 15, 2025",
    dueDate: "Dec 01, 2025",
    status: "Paid",
  },
  {
    id: "inv_102",
    invoiceNumber: "INV-2026-042",
    schoolName: "St. Jude Grammar",
    planTier: "Enterprise",
    amount: 550,
    issueDate: "Aug 01, 2026",
    dueDate: "Aug 15, 2026",
    status: "Paid",
  },
  {
    id: "inv_103",
    invoiceNumber: "INV-2026-089",
    schoolName: "Lagos Prep Academy",
    planTier: "Basic",
    amount: 150,
    issueDate: "Aug 01, 2026",
    dueDate: "Aug 15, 2026",
    status: "Overdue",
  },
];
