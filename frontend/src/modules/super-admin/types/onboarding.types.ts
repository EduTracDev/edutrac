export interface OnboardingWizardData {
  // Step 1: Basic Information
  schoolName: string;
  subdomain: string;
  country: string;
  city: string;
  address: string;

  // Step 2: Primary Administrator Contact
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPhone: string;

  // Step 3: Subscription & Tier Selection
  planId: string;
  billingCycle: "Monthly" | "Annual";
  estimatedStudents: number;
}

export type OnboardingErrors = Partial<Record<keyof OnboardingWizardData, string>>;

export const INITIAL_ONBOARDING_DATA: OnboardingWizardData = {
  schoolName: "",
  subdomain: "",
  country: "Nigeria",
  city: "Lagos",
  address: "",
  adminFirstName: "",
  adminLastName: "",
  adminEmail: "",
  adminPhone: "",
  planId: "plan_pro",
  billingCycle: "Annual",
  estimatedStudents: 500,
};

export function validateStep(step: number, data: OnboardingWizardData): OnboardingErrors {
  const errors: OnboardingErrors = {};

  if (step === 1) {
    if (!data.schoolName.trim()) errors.schoolName = "School name is required.";
    if (!data.subdomain.trim()) {
      errors.subdomain = "Subdomain prefix is required.";
    } else if (!/^[a-z0-9-]+$/.test(data.subdomain)) {
      errors.subdomain = "Subdomain can only contain lowercase letters, numbers, and hyphens.";
    }
    if (!data.address.trim()) errors.address = "Street address is required.";
  }

  if (step === 2) {
    if (!data.adminFirstName.trim()) errors.adminFirstName = "First name is required.";
    if (!data.adminLastName.trim()) errors.adminLastName = "Last name is required.";
    if (!data.adminEmail.trim()) {
      errors.adminEmail = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.adminEmail)) {
      errors.adminEmail = "Enter a valid email address.";
    }
    if (!data.adminPhone.trim()) errors.adminPhone = "Phone number is required.";
  }

  if (step === 3) {
    if (!data.planId) errors.planId = "Please select a initial subscription plan.";
    if (data.estimatedStudents <= 0) errors.estimatedStudents = "Enter a valid student count.";
  }

  return errors;
}