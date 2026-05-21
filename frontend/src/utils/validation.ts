import * as yup from "yup";

// REUSABLE BASE
const emailSchema = yup
  .string()
  .email("Invalid email")
  .required("Email is required");

const phoneSchema = yup
  .string()
  .matches(/^[0-9+]+$/, "Invalid phone number")
  .required("Required");

const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[@$!%*#?&]/,
    "Password must contain at least one special character (@$!%*#?&)",
  );

//  AUTH & PUBLIC SCHEMAS
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
  schoolName: yup.string().required("School name is required"),
  adminName: yup.string().required("Full name is required"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  plan: yup.string().oneOf(["basic", "pro", "enterprise"]).required(),
});

export const profileSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, "Name is too short")
    .required("Full name is required"),
  email: emailSchema,
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  bio: yup.string().max(200, "Bio must be under 200 characters"),
});

export const contactSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: emailSchema,
  phoneNumber: phoneSchema,
  schoolName: yup.string().required("School name is required"),
  message: yup
    .string()
    .min(10, "Please provide more detail")
    .required("Required"),
});

//PEOPLE MANAGEMENT (TEACHER & STUDENTS & PARENTS)
// single student
export const studentBaseSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"])
    .required("Gender is required"),
  dateOfBirth: yup
    .date()
    .max(new Date(), "Birth date cannot be in the future")
    .required("DOB is required"),
  classId: yup.string().required("Class assignment is required"),
  studentId: yup.string().optional(),
  // 🗑️ parentEmail and parentPhoneNumber removed.
  // These are handled via the link to a Parent object.
});
//bulk student
export const bulkStudentSchema = yup.object().shape({
  students: yup
    .array()
    .of(studentBaseSchema)
    .min(1, "At least one student is required"),
});

// --- single teacher ---
export const teacherBaseSchema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject department is required"), // Defined as its own field
  role: yup
    .string()
    .oneOf([
      "Subject Teacher",
      "Class Teacher",
      "HOD (Dept Head)",
      "VP Academic",
    ])
    .required("Please select a role"),
  assignedClass: yup.string().required("Class assignment is required"),
});

// --- bulk teacher ---
export const bulkTeacherSchema = yup.object().shape({
  teachers: yup
    .array()
    .of(teacherBaseSchema)
    .min(1, "The list cannot be empty"),
});
export const VALID_TEACHER_ROLES = [
  "Subject Teacher",
  "Class Teacher",
  "HOD (Dept Head)",
  "VP Academic",
] as const;

// single parent
export const parentBaseSchema = yup.object({
  fullName: yup.string().required(),
  email: emailSchema,
  phoneNumber: phoneSchema,
  address: yup.string().required(),
  occupation: yup.string().optional(),
  emergencyContact: yup.string().optional(),
});

// bulk parent
export const bulkParentSchema = yup.object({
  parents: yup
    .array()
    .of(parentBaseSchema)
    .min(1, "Parent list cannot be empty")
    .required("Parent list is required"),
});

export const studentParentLinkSchema = yup.object({
  studentId: yup.string().required(),
  parentId: yup.string().required(),
  relationship: yup
    .string()
    .oneOf(["Father", "Mother", "Guardian", "Other"])
    .required("Please specify the relationship"),
  isPrimaryContact: yup.boolean().default(false),
  canPickup: yup.boolean().default(true),
});

// SCHOOL OPERATIONS (CLASSES, EXPENSES, ANNOUNCEMENTS)
//  -- announcement ---
export const announcementSchema = yup.object().shape({
  title: yup
    .string()
    .required("Please provide a heading")
    .max(60, "Max 60 characters"),
  content: yup
    .string()
    .required("Body is required")
    .min(10, "Min 10 characters")
    .max(500, "Max 500 characters"),
});
// --- class ---
export const classSchema = yup.object().shape({
  className: yup.string().required("Class name is required"),
  category: yup.string().required("Please select a category"),
});

//--- expenses ---
export const expenseSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("How much was spent?")
    .positive("Amount must be greater than zero"),
  category: yup.string().required("Please select an expense category"),
  description: yup
    .string()
    .required("What was this expense for?")
    .min(3, "Too short")
    .max(100, "Keep descriptions brief"),
});

export const assignmentSchema = yup.object({
  title: yup
    .string()
    .required("Headline is required")
    .min(5, "Title too short"),
  description: yup.string().required("Instructions are required"),
  targetClass: yup.string().required("Select a target class"),
  points: yup.number().typeError("Points must be a number").required().min(0),
  dueDate: yup.string().required("Deadline is required"),
  dueTime: yup.string().required("Time is required"),
  allowLateSubmission: yup.boolean().default(false),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type StudentFormData = yup.InferType<typeof studentBaseSchema>;
export type BulkStudentFormData = yup.InferType<typeof bulkStudentSchema>;
export type TeacherFormData = yup.InferType<typeof teacherBaseSchema>;
export type ParentFormData = yup.InferType<typeof parentBaseSchema>;
export type TeacherRole = (typeof VALID_TEACHER_ROLES)[number];
export type ProfileFormData = yup.InferType<typeof profileSchema>;
export type AssignmentFormData = yup.InferType<typeof assignmentSchema>;
