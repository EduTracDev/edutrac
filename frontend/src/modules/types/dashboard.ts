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
  class?: string;
  gender: "Male" | "Female" | "Other";
  avatarUrl?: string;
  enrollmentStatus: EnrollmentStatus;
  accountStatus: AccountStatus;
  admissionDate: string;
  parentIds: string[];
  dateOfBirth?: string;
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

export type ResultStatus = "Draft" | "Pending" | "Approved" | "Flagged";

export interface StudentResult {
  id: string; // Unique ID for this specific result record
  studentId: string; // Reference to the student
  studentName: string; // Flattened for easy display in tables
  class: string; // e.g., "SS3-Science"
  subjectId: string; // e.g., "MATH-101"
  subjectName: string; // e.g., "Mathematics"

  // Assessment Breakdown
  ca1: number; // Continuous Assessment 1 (e.g., max 20)
  ca2: number; // Continuous Assessment 2 (e.g., max 20)
  exam: number; // Final Exam (e.g., max 60)
  total: number; // ca1 + ca2 + exam (max 100)

  // Grading & Ranking
  grade: "A" | "B" | "C" | "D" | "E" | "F";
  remark: string; // e.g., "Excellent", "Credit"
  position?: number; // Rank in class (optional until all are processed)

  // Workflow Metadata
  term: "First" | "Second" | "Third";
  session: string; // e.g., "2025/2026"
  status: ResultStatus;
  teacherComment?: string;
  adminComment?: string; // For flagging reasons
  updatedAt: Date | string;
}

export type AnnouncementChannel = "SMS" | "WhatsApp" | "Email" | "In-App";
export type AnnouncementAudience =
  | "All Parents"
  | "All Teachers"
  | "Specific Class"
  | "Debtors";

export interface AnnouncementLog {
  id: string;
  title: string;
  preview: string; // Short snippet of the message
  content: string; // Full message
  channel: AnnouncementChannel;
  audience: AnnouncementAudience;
  targetDetail?: string; // e.g., "SS3 Science" if audience is "Specific Class"
  sentAt: string;
  sentBy: string; // Admin name
  status: "Delivered" | "Failed" | "Pending";
  recipientsCount: number;
}

export type AnnouncementCategory = "General" | "Urgent" | "Academic" | "Event";
export type PaymentStatus = "Unpaid" | "Partial" | "Paid" | "Overdue";

export interface PaymentEntry {
  id: string;
  amount: number;
  date: string;
  method: "Cash" | "Transfer" | "POS" | "Online";
  reference: string;
  receivedBy: string;
}

export interface FinancialRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  totalBilled: number;
  amountPaid: number;
  balance: number;
  dueDate: string;
  lastPaymentDate?: string;
  status: PaymentStatus;
  category: "Tuition" | "Comprehensive" | "Special";
  history?: PaymentEntry[];
}

export type AssignmentStatus = "Draft" | "Published" | "Closed";

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  status: AssignmentStatus;
  submissions: {
    turnedIn: number;
    total: number;
    graded: number;
  };
  points: number;
}

export interface Ward {
  id: string;
  name: string;
  class: string;
  avatar?: string;
  gender: "male" | "female";
  activeWard?: boolean;
}
