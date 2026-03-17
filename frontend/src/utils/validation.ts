import * as yup from "yup";

// --- REUSABLE FRAGMENTS ---
const emailSchema = yup
  .string()
  .email("Invalid email")
  .required("Email is required");
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
const phoneSchema = yup
  .string()
  .matches(/^[0-9+]+$/, "Invalid phone number")
  .required("Required");

// --- 1. CONTACT FORM SCHEMA ---
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

// --- 2. REGISTRATION SCHEMA (Extending the logic) ---
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

// --- 3. LOGIN SCHEMA ---
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required("Password is required"),
});

// --- THE SINGLE STUDENT TRUTH ---
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
  parentEmail: yup
    .string()
    .email("Invalid email")
    .required("Parent email is required for SMS/Alerts"),
  studentId: yup.string().optional(), // System generated or Manual
});
// --- THE BULK UPLOAD SCHEMA ---
export const bulkStudentSchema = yup.object().shape({
  students: yup
    .array()
    .of(studentBaseSchema)
    .min(1, "At least one student is required"),
});

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

export const classSchema = yup.object().shape({
  className: yup.string().required("Class name is required"),
  category: yup.string().required("Please select a category"),
});

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

export const teacherSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name is too short")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  role: yup
    .string()
    .oneOf(
      ["Subject Teacher", "Class Teacher", "HOD (Dept Head)", "VP Academic"],
      "Please select a valid role",
    )
    .required("Role assignment is required"),
  assignedClass: yup.string().required("Please specify a class (e.g., JSS 3)"),
});

// Types for your components
export type ContactFormData = yup.InferType<typeof contactSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type StudentFormData = yup.InferType<typeof studentBaseSchema>;
export type BulkStudentFormData = yup.InferType<typeof bulkStudentSchema>;
export type TeacherFormData = yup.InferType<typeof teacherSchema>;
