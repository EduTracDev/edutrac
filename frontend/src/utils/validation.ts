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

// Types for your components
export type ContactFormData = yup.InferType<typeof contactSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type StudentFormData = yup.InferType<typeof studentBaseSchema>;
export type BulkStudentFormData = yup.InferType<typeof bulkStudentSchema>;
