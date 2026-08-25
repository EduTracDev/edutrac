export type UserRole =
  | "Super Admin"
  | "School Admin"
  | "Teacher"
  | "Student"
  | "Parent";
export type UserStatus = "Active" | "Inactive" | "Pending" | "Suspended";

export interface UserFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  schoolId: string; // "global" for Super Admin
  // Role-specific optional fields
  employeeId?: string; // Teacher / Admin
  studentIdNumber?: string; // Student
  gradeLevel?: string; // Student
  parentGuardianEmail?: string; // Student
}

export type UserFormErrors = Partial<Record<keyof UserFormData, string>>;

export function validateUserForm(data: UserFormData): UserFormErrors {
  const errors: UserFormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (data.role !== "Super Admin" && !data.schoolId) {
    errors.schoolId = "Please select an assigned school.";
  }

  if (data.role === "Teacher" && !data.employeeId?.trim()) {
    errors.employeeId = "Employee ID is required for Teachers.";
  }

  if (data.role === "Student") {
    if (!data.studentIdNumber?.trim()) {
      errors.studentIdNumber = "Student ID Number is required.";
    }
    if (
      data.parentGuardianEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.parentGuardianEmail)
    ) {
      errors.parentGuardianEmail = "Enter a valid parent/guardian email.";
    }
  }

  return errors;
}
