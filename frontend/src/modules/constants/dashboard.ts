import {
  AcademicDataPoint,
  EnrollmentDataPoint,
  ActivityItem,
  Teacher,
  Student,
  Parent,
  StudentParentLink,
  AttendanceStatus,
  StudentResult,
  AnnouncementLog,
  FinancialRecord,
  PaymentEntry,
} from "../types/dashboard";
export const schoolData = {
  name: "Lincoln High School",
  id: "LHS-2025",
  date: "March 11, 2026",
  plan: "Premium plan",
};
export const revenueData = [
  { month: "Jan", revenue: 4500000, debt: 1200000 },
  { month: "Feb", revenue: 5200000, debt: 800000 },
  { month: "Mar", revenue: 4800000, debt: 1500000 },
];

export const enrollmentData: EnrollmentDataPoint[] = [
  { period: "Sept '24", students: 800 },
  { period: "Jan '25", students: 950 },
  { period: "May '25", students: 980 },
  { period: "Sept '25", students: 1100 },
  { period: "Jan '26", students: 1247 },
];

export const academicData: AcademicDataPoint[] = [
  { gradeLevel: "JSS 1", exceeding: 45, meeting: 30, below: 5 },
  { gradeLevel: "JSS 2", exceeding: 38, meeting: 42, below: 10 },
  { gradeLevel: "JSS 3", exceeding: 50, meeting: 25, below: 2 },
  { gradeLevel: "SSS 1", exceeding: 30, meeting: 35, below: 15 },
];

export const genderData = [
  { name: "Boys", value: 740, fill: "#923CF9" },
  { name: "Girls", value: 507, fill: "#FF64D4" },
];
export const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "payment",
    title: "Fee Payment: Adebayo Samuel",
    subtitle: "Paid ₦150,000 for 2nd Term Tuition",
    time: "2 mins ago",
  },
  {
    id: "2",
    type: "admission",
    title: "New Student Enrolled",
    subtitle: "Chinedu Okoro joined Basic 4 Silver",
    time: "45 mins ago",
  },
  {
    id: "3",
    type: "academic",
    title: "Results Published",
    subtitle: "JSS 3 Mathematics midterm scores uploaded",
    time: "2 hours ago",
  },
];

export const teacherData: Teacher[] = [
  {
    id: "TCH-001",
    name: "Adebayo Samuel",
    email: "a.samuel@nexus.edu",
    role: "VP Academic",
    avatarUrl:
      "https://gravatar.com/avatar/2b5b57aa71aea0118bc30f2c739c8487?s=400&d=robohash&r=x",
    assignedClass: "SSS 3",
    subject: "Physics",
    employmentStatus: "Active",
    gender: "Male",
    accountStatus: "Joined",
    joinedDate: "Sept 2024",
  },
  {
    id: "TCH-002",
    name: "Chinedu Okoro",
    email: "c.okoro@nexus.edu",

    role: "Class Teacher",
    assignedClass: "JSS 2",
    subject: "Mathematics",
    gender: "Female",
    employmentStatus: "Active",
    accountStatus: "Pending",
    joinedDate: "Jan 2025",
  },
  {
    id: "TCH-003",
    name: "Fatimah Dogara",
    email: "f.dogara@nexus.edu",
    role: "Subject Teacher",
    assignedClass: "SSS 2",
    subject: "Computer Science",
    gender: "Female",
    employmentStatus: "Inactive",
    accountStatus: "Joined",
    joinedDate: "March 2026",
  },
  {
    id: "TCH-004",
    name: "Irene Smith",
    email: "i.smith@nexus.edu",
    role: "Class Teacher",
    assignedClass: "JSS 3",
    subject: "Literature",
    gender: "Female",
    employmentStatus: "On Leave",
    accountStatus: "Pending",
    joinedDate: "Sept 2025",
  },
  {
    id: "TCH-005",
    name: "Adebayo Samuel",
    email: "a.samuel@nexus.edu",
    role: "VP Academic",
    assignedClass: "SSS 3",
    subject: "Physics",
    gender: "Male",
    employmentStatus: "Active",
    accountStatus: "Pending",
    joinedDate: "Sept 2024",
  },
  {
    id: "TCH-006",
    name: "Chinedu Okoro",
    email: "c.okoro@nexus.edu",
    avatarUrl:
      "https://robohash.org/2b5b57aa71aea0118bc30f2c739c8487?set=set4&bgset=&size=400x400",
    role: "HOD (Dept Head)",
    assignedClass: "JSS 2",
    gender: "Male",
    subject: "Mathematics",
    employmentStatus: "Active",
    accountStatus: "Joined",
    joinedDate: "Jan 2025",
  },
];

export const studentData: Student[] = [
  {
    id: "STU-2026-001",
    firstName: "Adewale",
    lastName: "Benson",
    avatarUrl:
      "https://robohash.org/2b5b57aa71aea0118bc30f2c739c8487?set=set4&bgset=&size=400x400",
    email: "a.ciroma@edutrac.com",
    class: "SS 3 Science",
    gender: "Male",
    studentId: "LIN001",
    dateOfBirth: "2005-06-15",
    enrollmentStatus: "Active",
    accountStatus: "Joined",
    admissionDate: "2023-09-12",
    parentIds: ["PAR-001"],
  },
  {
    id: "STU-2026-002",
    studentId: "LIN002",
    firstName: "Chinyere",
    lastName: "Okoro",
    email: "c.okoro@edutrac.com",
    class: "SS 3 Art",
    dateOfBirth: "2005-08-20",
    gender: "Female",
    enrollmentStatus: "Active",
    accountStatus: "Pending",
    admissionDate: "2023-09-15",
    parentIds: ["PAR-001"],
  },
  {
    id: "STU-2026-003",
    studentId: "LIN003",
    firstName: "Fatimah",
    lastName: "Abubakar",
    email: "f.abubakar@edutrac.com",
    class: "SS 3 Art",
    avatarUrl:
      "https://robohash.org/2b5b57aa71aea0118bc30f2c739c8487?set=set4&bgset=&size=400x400",
    gender: "Female",
    enrollmentStatus: "Suspended",
    accountStatus: "Joined",
    admissionDate: "2025-01-05",
    dateOfBirth: "2010-02-10",
    parentIds: ["PAR-003"],
  },
  {
    id: "STU-2026-004",
    studentId: "LIN004",
    firstName: "Joshua",
    lastName: " Adeyemi",
    email: "o.adeyemi@edutrac.com",
    class: "SS 2 Commercial",
    gender: "Male",
    enrollmentStatus: "Active",
    accountStatus: "Pending",
    admissionDate: "2024-09-10",
    dateOfBirth: "2006-11-25",
    parentIds: ["PAR-004"],
  },
  {
    id: "STU-2026-005",
    studentId: "LIN005",
    firstName: "Jos",
    lastName: " Ami",
    email: "j.adeyemi@edutrac.com",
    class: "SS 1 Commercial",
    gender: "Male",
    enrollmentStatus: "Active",
    accountStatus: "Pending",
    admissionDate: "2024-09-10",
    dateOfBirth: "2007-01-15",
    parentIds: ["PAR-002"],
  },
];

export const parentData: Parent[] = [
  {
    id: "PAR-001",
    fullName: "Mr. Chukwuma Okoro",
    email: "okoro@yahoo.com",
    phoneNumber: "08034567891",
    emergencyContact: "08099887766",
    avatarUrl: "https://robohash.org/okoro?set=set4",
    address: "12 Ikeja Street Lagos",
    occupation: "Engineer",
    employmentStatus: "Active",
    accountStatus: "Joined",
    studentIds: ["STU-2026-001", "STU-2026-002"], // Testing: Multiple
  },
  {
    id: "PAR-002",
    fullName: "Mrs. Bisola Ade",
    email: "ade@gmail.com",
    phoneNumber: "08122334455",
    emergencyContact: "08199887766",
    avatarUrl: "https://robohash.org/ade?set=set4",
    address: "45 Yaba Road Lagos",
    occupation: "Teacher",
    accountStatus: "Pending",
    employmentStatus: "Inactive",
    studentIds: ["STU-2026-002"], // Testing: Single
  },
  {
    id: "PAR-005", // New entry for testing "None" filter
    fullName: "Mr. Babatunde Lawal",
    email: "lawal.b@outlook.com",
    phoneNumber: "09011223344",
    emergencyContact: "09011223355",
    address: "7 Surulere Way, Lagos",
    occupation: "Legal Counsel",
    accountStatus: "Pending",
    employmentStatus: "Active",
    studentIds: [], // Testing: 0 Wards
  },
];

export const studentParentLink: StudentParentLink[] = [
  {
    id: "LINK-001",
    studentId: "STU-2026-001", // Fixed to match studentData
    parentId: "PAR-001",
    relationship: "Father",
    isPrimaryContact: true,
    canPickup: true,
    createdAt: "2026-03-27",
  },
  {
    id: "LINK-002",
    studentId: "STU-2026-002", // Fixed to match studentData
    parentId: "PAR-001",
    relationship: "Father",
    isPrimaryContact: false,
    canPickup: true,
    createdAt: "2026-03-27",
  },
  {
    id: "LINK-003",
    studentId: "STU-2026-003",
    parentId: "PAR-002",
    relationship: "Father",
    isPrimaryContact: true,
    canPickup: true,
    createdAt: "2026-03-28",
  },
  {
    id: "LINK-004",
    studentId: "STU-2026-005",
    parentId: "PAR-002",
    relationship: "Mother",
    isPrimaryContact: true,
    canPickup: true,
    createdAt: "2026-03-28",
  },
];

export interface DailyAttendance {
  studentId: string;
  status: AttendanceStatus;
  remarks?: string; // Optional: "Medical reason", "Travel", etc.
  markedAt: string;
}

export const mockAttendanceData: DailyAttendance[] = [
  {
    studentId: "STU-2026-001", // Adewale Benson
    status: "present",
    markedAt: "2026-04-01T08:15:00Z",
  },
  {
    studentId: "STU-2026-002", // Chinyere Okoro
    status: "late",
    remarks: "Heavy traffic at Lekki toll gate",
    markedAt: "2026-04-01T08:45:00Z",
  },
  {
    studentId: "STU-2026-003", // Fatimah Abubakar
    status: "absent",
    remarks: "Reported ill by parent",
    markedAt: "2026-04-01T09:00:00Z",
  },
  {
    studentId: "STU-2026-004", // Joshua Adeyemi
    status: "present",
    markedAt: "2026-04-01T08:10:00Z",
  },
  {
    studentId: "STU-2026-005", // Jos Ami
    status: "unmarked", // Testing the 'not yet marked' state
    markedAt: "",
  },
];

export const mockResults: StudentResult[] = [
  {
    id: "res-001",
    studentId: "STU-2026-001",
    studentName: "Adewale Johnson",
    class: "SS3-Science",
    subjectId: "MATH-101",
    subjectName: "Mathematics",
    ca1: 18,
    ca2: 15,
    exam: 52,
    total: 85,
    grade: "A",
    remark: "Excellent",
    term: "Second",
    session: "2025/2026",
    status: "Pending",
    updatedAt: "2026-04-01T10:00:00Z",
  },
  {
    id: "res-002",
    studentId: "STU-2026-002",
    studentName: "Chidi Okafor",
    class: "SS3-Science",
    subjectId: "MATH-101",
    subjectName: "Mathematics",
    ca1: 12,
    ca2: 10,
    exam: 45,
    total: 67,
    grade: "B",
    remark: "Very Good",
    term: "Second",
    session: "2025/2026",
    status: "Pending",
    updatedAt: "2026-04-02T08:30:00Z",
  },
  {
    id: "res-003",
    studentId: "STU-2026-003",
    studentName: "Fatima Musa",
    class: "SS3-Science",
    subjectId: "MATH-101",
    subjectName: "Mathematics",
    ca1: 20, // Suspiciously high
    ca2: 20, // Suspiciously high
    exam: 60, // Perfect score
    total: 100,
    grade: "A",
    remark: "Distinction",
    term: "Second",
    session: "2025/2026",
    status: "Flagged", // Admin needs to double check this
    adminComment:
      "Please verify if these scores are accurate. Too many perfect marks.",
    updatedAt: "2026-03-30T14:20:00Z",
  },
  {
    id: "res-004",
    studentId: "STU-2026-004",
    studentName: "Blessing Ekong",
    class: "SS2-Commercial",
    subjectId: "MATH-101",
    subjectName: "Mathematics",
    ca1: 8,
    ca2: 7,
    exam: 25,
    total: 40,
    grade: "E",
    remark: "Pass",
    term: "Second",
    session: "2025/2026",
    status: "Pending",
    updatedAt: "2026-04-03T09:15:00Z",
  },
  {
    id: "res-005",
    studentId: "STU-2026-005",
    studentName: "Samuel Zhang",
    class: "SS1-Art",
    subjectId: "MATH-101",
    subjectName: "Mathematics",
    ca1: 14,
    ca2: 12,
    exam: 30,
    total: 56,
    grade: "C",
    remark: "Credit",
    term: "Second",
    session: "2025/2026",
    status: "Approved", // Already processed
    updatedAt: "2026-03-28T11:00:00Z",
  },
];

export const mockAnnouncementHistory: AnnouncementLog[] = [
  {
    id: "ann-001",
    title: "PTA Meeting Reminder",
    preview: "Dear Parents, this is a reminder of our upcoming...",
    content:
      "Dear Parents, this is a reminder of our upcoming PTA meeting scheduled for Saturday at 10 AM.",
    channel: "WhatsApp",
    audience: "All Parents",
    sentAt: "2026-04-01T09:00:00Z",
    sentBy: "Admin Sarah",
    status: "Delivered",
    recipientsCount: 450,
  },
  {
    id: "ann-002",
    title: "Urgent: Fee Balance Notice",
    preview: "Final notice regarding outstanding tuition fees...",
    content:
      "Final notice regarding outstanding tuition fees for the second term. Please clear balances by Friday.",
    channel: "SMS",
    audience: "Debtors",
    sentAt: "2026-03-28T14:30:00Z",
    sentBy: "Bursar James",
    status: "Delivered",
    recipientsCount: 32,
  },
  {
    id: "ann-003",
    title: "Mid-Term Break Announcement",
    preview: "School will be closed from Wednesday for the...",
    content:
      "School will be closed from Wednesday for the mid-term break. Classes resume next Monday.",
    channel: "Email",
    audience: "All Parents",
    targetDetail: "Whole School",
    sentAt: "2026-03-15T11:00:00Z",
    sentBy: "Admin Sarah",
    status: "Delivered",
    recipientsCount: 512,
  },
];

export const mockDebtors: FinancialRecord[] = [
  {
    id: "fin-001",
    studentId: "STU-2026-001",
    studentName: "Adewale Johnson",
    class: "SS3-Science",
    totalBilled: 150000,
    amountPaid: 45000,
    balance: 105000,
    dueDate: "2026-01-15T00:00:00Z",
    lastPaymentDate: "2026-02-10T11:20:00Z",
    status: "Partial",
    category: "Tuition",
  },
  {
    id: "fin-002",
    studentId: "STU-2026-004",
    studentName: "Blessing Ekong",
    class: "SS2-Commercial",
    totalBilled: 120000,
    amountPaid: 0,
    balance: 120000,
    dueDate: "2026-01-15T00:00:00Z",
    status: "Overdue",
    category: "Tuition",
  },
  {
    id: "fin-003",
    studentId: "STU-2026-009",
    studentName: "Ibrahim Musa",
    class: "JSS1-B",
    totalBilled: 85000,
    amountPaid: 20000,
    balance: 65000,
    dueDate: "2026-02-01T00:00:00Z",
    lastPaymentDate: "2026-02-15T09:45:00Z",
    status: "Partial",
    category: "Comprehensive",
  },
  {
    id: "fin-004",
    studentId: "STU-2026-012",
    studentName: "Zainab Yusuf",
    class: "SS3-Art",
    totalBilled: 150000,
    amountPaid: 0,
    balance: 150000,
    dueDate: "2026-01-15T00:00:00Z",
    status: "Unpaid",
    category: "Tuition",
  },
  {
    id: "fin-005",
    studentId: "STU-2026-015",
    studentName: "Kelvin Hart",
    class: "Primary 5",
    totalBilled: 95000,
    amountPaid: 80000,
    balance: 15000,
    dueDate: "2026-01-15T00:00:00Z",
    lastPaymentDate: "2026-03-20T16:00:00Z",
    status: "Partial",
    category: "Special", // e.g., Music/Sports club fees
  },
];

export const paymentHistoryMock: PaymentEntry[] = [
  {
    id: "pay-001",
    amount: 25000,
    date: "2026-01-10T10:00:00Z",
    method: "Transfer",
    reference: "TRF-992011",
    receivedBy: "Bursar James",
  },
  {
    id: "pay-002",
    amount: 20000,
    date: "2026-02-15T14:30:00Z",
    method: "POS",
    reference: "POS-88271",
    receivedBy: "Admin Sarah",
  },
];

export const mockExpenses = [
  {
    id: "exp-1",
    title: "Staff Salaries",
    amount: 2400000,
    budget: 2500000,
    month: "March",
  },
  {
    id: "exp-2",
    title: "Generator Fuel",
    amount: 150000,
    budget: 120000,
    month: "March",
  }, // Over budget
  {
    id: "exp-3",
    title: "Stationery & Exam Papers",
    amount: 45000,
    budget: 100000,
    month: "March",
  },
];
