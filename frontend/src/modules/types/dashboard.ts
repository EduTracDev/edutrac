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

// CSV Import Interfaces

export interface TeacherCSVRow {
  "Full Name"?: string;
  fullName?: string;
  Email?: string;
  email?: string;
  Role?: string;
  role?: string;
  "Assigned Class"?: string;
  assignedClass?: string;
}
export interface StudentCSVRow {
  "First Name"?: string;
  firstName?: string;
  "Last Name"?: string;
  lastName?: string;
  Gender?: string;
  gender?: string;
  "Date of Birth"?: string;
  dateOfBirth?: string;
  Class?: string;
  class?: string;
  "Parent Email"?: string;
  parentEmail?: string;
  "Parent Phone Number"?: string;
  parentPhoneNumber?: string;
  "Student ID"?: string;
  studentId?: string;
}

export interface ParentCSVRow {
  "Full Name"?: string;
  fullName?: string;
  Email?: string;
  email?: string;
  "Phone Number"?: string;
  phoneNumber?: string;
  Occupation?: string;
  occupation?: string;
  Address?: string;
  address?: string;
  Relationship?: string;
  relationship?: string;
  "Emergency Contact"?: string;
  emergencyContact?: string;
}

export interface CSVError {
  row: number;
  identifier: string;
  message: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  assignedClass: string;
  subject: string;
  status: "Active" | "On Leave" | "Inactive";
  joinedDate: string;
}
