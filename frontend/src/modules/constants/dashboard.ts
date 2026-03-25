import {
  AcademicDataPoint,
  EnrollmentDataPoint,
  ActivityItem,
  Teacher,
  Student,
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
    parentName: "Mr. Ciroma",
    studentId: "LIN001",
    parentEmail: "p.ciroma@mail.com",
    parentPhoneNumber: "+234 801 234 5678",
    enrollmentStatus: "Active",
    accountStatus: "Joined",
    admissionDate: "2023-09-12",
  },
  {
    id: "STU-2026-002",
    studentId: "LIN002",
    firstName: "Chinyere",
    lastName: "Okoro",
    email: "c.okoro@edutrac.com",
    class: "SS 3 Art",
    gender: "Female",
    parentName: "Mrs. Okoro",
    parentEmail: "okoro.fam@mail.com",
    parentPhoneNumber: "+234 802 345 6789",
    enrollmentStatus: "Active",
    accountStatus: "Pending", // 👈 This will trigger our "Resend Invite" UI
    admissionDate: "2023-09-15",
  },
  {
    id: "STU-2026-003",
    studentId: "LIN003",
    firstName: "Fatimah",
    lastName: "Abubakar",
    email: "f.abubakar@edutrac.com",
    class: "JSS 1 Gold",
    avatarUrl:
      "https://robohash.org/2b5b57aa71aea0118bc30f2c739c8487?set=set4&bgset=&size=400x400",
    gender: "Female",
    parentName: "Alhaji Abubakar",
    parentEmail: "abubakar.h@mail.com",
    parentPhoneNumber: "+234 803 456 7890",
    enrollmentStatus: "Suspended",
    accountStatus: "Joined",
    admissionDate: "2025-01-05",
  },
  {
    id: "STU-2026-004",
    studentId: "LIN004",
    firstName: "Joshua",
    lastName: " Adeyemi",
    email: "o.adeyemi@edutrac.com",
    class: "SS 2 Commercial",
    gender: "Male",
    parentName: "Mr. Adeyemi",
    parentEmail: "adeyemi.o@mail.com",
    parentPhoneNumber: "+234 805 567 8901",
    enrollmentStatus: "Active",
    accountStatus: "Pending",
    admissionDate: "2024-09-10",
  },
];
