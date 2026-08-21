import { PlanTier } from "./subscription.types";

export interface ProvisioningStep1Data {
  schoolName: string;
  subdomain: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
}

export interface ProvisioningStep2Data {
  planTier: PlanTier;
  billingCycle: "Monthly" | "Annual";
  customMaxStudents?: number;
  customMaxStorageGB?: number;
}

export interface ProvisioningStep3Data {
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  sendWelcomeEmail: boolean;
}

export interface ProvisioningPayload {
  general: ProvisioningStep1Data;
  subscription: ProvisioningStep2Data;
  admin: ProvisioningStep3Data;
}

export interface ProvisionedTenant {
  id: string;
  schoolName: string;
  domain: string;
  planTier: PlanTier;
  adminEmail: string;
  status: "Active" | "Provisioning" | "Failed";
  createdAt: string;
}
