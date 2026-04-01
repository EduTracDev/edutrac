//  UI & Navigation Types
export type ActiveModal =
  | "announcement"
  | "class"
  | "admission"
  | "teacher"
  | "student"
  | "parent"
  | "result"
  | "expenses"
  | "fee-reminder-preview"
  | "schedule-pta"
  | "bulk-sms"
  | null;

export interface ActivityItem {
  id: string;
  type: "payment" | "admission" | "academic";
  title: string;
  subtitle: string;
  time: string;
}

// Chart & Analytics Data Points
export interface AcademicDataPoint {
  gradeLevel: string;
  exceeding: number;
  meeting: number;
  below: number;
}
export interface EnrollmentDataPoint {
  period: string;
  students: number;
}
export interface EnrollmentChartProps {
  data: EnrollmentDataPoint[];
}

export interface GenderDataPoint {
  name: string;
  value: number;
  fill: string;
}

export type TeacherRole =
  | "Subject Teacher"
  | "Class Teacher"
  | "HOD (Dept Head)"
  | "VP Academic";

export interface TeacherCSVRow {
  "Full Name"?: string;
  fullName?: string;
  Email?: string;
  email?: string;
  Role?: TeacherRole;
  role: TeacherRole;
  subject: string;
  Subject: string;
  "Assigned Class"?: string;
  assignedClass?: string;
}

export interface Parent {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  emergencyContact?: string;
  employmentStatus: EmploymentStatus;
  phoneNumber: string;
  occupation?: string;
  address?: string;
  accountStatus: "Joined" | "Pending";
  studentIds: string[];
}
export interface ParentCSVRow {
  fullName: string;
  email: string;
  phoneNumber: string;
  occupation?: string;
  address?: string;
  emergencyContact?: string;

  // 🔗 Linking Fields: These help create the StudentParentLink on import
  relationship: "Father" | "Mother" | "Guardian" | "Other";
  isPrimaryContact?: "Yes" | "No" | boolean;
  canPickup?: "Yes" | "No" | boolean;
}

export interface ParentFilters {
  searchQuery?: string;
  accountStatus: "All" | "Joined" | "Pending";
  occupation: string;
  linkedStudentCount: "All" | "0" | "1" | "Multiple";
  relationship?: string;
}

export interface CSVError {
  row: number;
  identifier: string;
  message: string;
}

export type AccountStatus = "Pending" | "Joined" | "Expired";
export type EmploymentStatus = "Active" | "On Leave" | "Inactive";
export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: TeacherRole;
  assignedClass: string;
  avatarUrl?: string;
  subject: string;
  gender: "Male" | "Female";
  employmentStatus: EmploymentStatus;
  accountStatus: AccountStatus;
  joinedDate: string;
}

//STUDENT
export type EnrollmentStatus =
  | "Active"
  | "Suspended"
  | "Withdrawn"
  | "Graduated";

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  gender: "Male" | "Female" | "Other";
  avatarUrl?: string;
  enrollmentStatus: EnrollmentStatus;
  accountStatus: AccountStatus;
  admissionDate: string;
  parentIds: string[];
}

export interface StudentCSVRow {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  class: string;
  studentId?: string;
  email?: string;
}

export interface StudentFilters {
  class: string | "All";
  gender: "Male" | "Female" | "other" | "All";
  accountStatus: AccountStatus | "All";
  linkStatus?: "All" | "Unlinked";
}

export interface StudentParentLink {
  id: string;
  studentId: string;
  parentId: string;
  relationship: "Father" | "Mother" | "Guardian" | "Sibling" | "Other" | string;
  isPrimaryContact: boolean;
  canPickup: boolean;
  createdAt?: string;
}

export type AttendanceStatus = "present" | "absent" | "late" | "unmarked";

export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  timestamp: string;
  markedBy: string; // Teacher ID
}
