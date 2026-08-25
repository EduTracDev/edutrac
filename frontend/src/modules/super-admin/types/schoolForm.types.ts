export interface SchoolFormData {
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  adminName: string;
  adminEmail: string;
  plan: "Trial" | "Standard" | "Pro" | "Enterprise";
  maxStudents: number;
  status: "Active" | "Pending" | "Suspended";
}

export type FormErrors = Partial<Record<keyof SchoolFormData, string>>;

export function validateSchoolForm(data: SchoolFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = "School name is required.";
  if (!data.code.trim()) errors.code = "School code identifier is required.";
  else if (!/^[A-Z0-9_-]{3,10}$/i.test(data.code)) {
    errors.code = "Code must be 3-10 alphanumeric characters (e.g., SCH-001).";
  }

  if (!data.email.trim()) errors.email = "School contact email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.address.trim()) errors.address = "Address is required.";

  if (!data.adminName.trim())
    errors.adminName = "Primary Admin name is required.";
  if (!data.adminEmail.trim()) errors.adminEmail = "Admin email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.adminEmail)) {
    errors.adminEmail = "Enter a valid admin email address.";
  }

  if (!data.maxStudents || data.maxStudents < 10) {
    errors.maxStudents = "Student capacity must be at least 10.";
  }

  return errors;
}
