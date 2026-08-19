export type BillingCycle = "Monthly" | "Annual";

export interface SaaSPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  maxStudents: number;
  maxTeachers: number;
  maxStorageGB: number;
  features: string[];
  isPopular?: boolean;
}

export interface SchoolSubscription {
  id: string;
  schoolId: string;
  schoolName: string;
  planId: string;
  planName: string;
  billingCycle: BillingCycle;
  status: "Active" | "Past Due" | "Canceled" | "Trialing";
  currentPeriodEnd: string;
  studentCount: number;
  maxStudents: number;
}

export const INITIAL_PLANS: SaaSPlan[] = [
  {
    id: "plan_basic",
    name: "Starter",
    priceMonthly: 99,
    priceAnnual: 990,
    maxStudents: 250,
    maxTeachers: 20,
    maxStorageGB: 10,
    features: [
      "Core Academics & Attendance",
      "Parent Portal",
      "Standard Email Support",
    ],
  },
  {
    id: "plan_pro",
    name: "Professional",
    priceMonthly: 249,
    priceAnnual: 2490,
    maxStudents: 1000,
    maxTeachers: 75,
    maxStorageGB: 50,
    isPopular: true,
    features: [
      "Core Academics & Attendance",
      "Parent & Student Portals",
      "Custom Announcements",
      "Priority Support & Billing",
    ],
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    priceMonthly: 599,
    priceAnnual: 5990,
    maxStudents: 5000,
    maxTeachers: 300,
    maxStorageGB: 250,
    features: [
      "All Professional Features",
      "Dedicated Account Manager",
      "Custom Domain Support",
      "Audit Logging & Analytics",
    ],
  },
];

export const MOCK_SUBSCRIPTIONS: SchoolSubscription[] = [
  {
    id: "sub_101",
    schoolId: "sch_1",
    schoolName: "Greenwood High",
    planId: "plan_pro",
    planName: "Professional",
    billingCycle: "Annual",
    status: "Active",
    currentPeriodEnd: "Dec 31, 2026",
    studentCount: 840,
    maxStudents: 1000,
  },
  {
    id: "sub_102",
    schoolId: "sch_2",
    schoolName: "St. Jude Grammar",
    planId: "plan_basic",
    planName: "Starter",
    billingCycle: "Monthly",
    status: "Past Due",
    currentPeriodEnd: "Aug 25, 2026",
    studentCount: 245,
    maxStudents: 250,
  },
  {
    id: "sub_103",
    schoolId: "sch_3",
    schoolName: "Apex International",
    planId: "plan_enterprise",
    planName: "Enterprise",
    billingCycle: "Annual",
    status: "Active",
    currentPeriodEnd: "Mar 15, 2027",
    studentCount: 2100,
    maxStudents: 5000,
  },
];
