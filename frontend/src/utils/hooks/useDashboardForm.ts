import { useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import Papa from "papaparse";

import {
  announcementSchema,
  classSchema,
  expenseSchema,
  teacherBaseSchema,
  bulkTeacherSchema,
  studentBaseSchema,
  bulkStudentSchema,
  parentBaseSchema,
  bulkParentSchema,
  VALID_TEACHER_ROLES,
  type TeacherRole,
  type TeacherFormData,
  type StudentFormData,
  type ParentFormData,
} from "@/utils/validation";

import {
  type TeacherCSVRow,
  type StudentCSVRow,
  type ParentCSVRow,
  type CSVError,
  type ActiveModal,
} from "@/modules/types/dashboard";

import {
  AnnouncementFormElement,
  ClassFormElement,
  ExpenseFormElement,
} from "@/modules/types/forms";

export const useDashboardForms = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentBulkErrors, setStudentBulkErrors] = useState<CSVError[]>([]);
  const [teacherBulkErrors, setTeacherBulkErrors] = useState<CSVError[]>([]);
  const [parentBulkErrors, setParentBulkErrors] = useState<CSVError[]>([]);

  // --- Helpers ---

  const clearErrors = () => {
    setStudentBulkErrors([]);
    setTeacherBulkErrors([]);
    setParentBulkErrors([]);
    setFormErrors({});
  };
  const closeModal = () => {
    setActiveModal(null);
    clearErrors();
  };

  const formatCSVValidationErrors = <T extends Record<string, unknown>>(
    err: unknown,
    dataArray: T[],
    labelKey: keyof T,
  ): CSVError[] => {
    if (err instanceof Yup.ValidationError) {
      return err.inner.map((error: Yup.ValidationError): CSVError => {
        const match = error.path?.match(/\[(\d+)\]/);
        const index = match ? parseInt(match[1]) : 0;
        const record = dataArray[index];

        const identifier =
          record && typeof record[labelKey] === "string"
            ? (record[labelKey] as string)
            : `Record ${index + 1}`;

        return {
          row: index + 2,
          identifier,
          message: error.message,
        };
      });
    }
    return [];
  };

  const handleValidationError = (err: unknown) => {
    if (err instanceof Yup.ValidationError) {
      const errors: { [key: string]: string } = {};
      err.inner.forEach((error) => {
        if (error.path) errors[error.path] = error.message;
      });
      setFormErrors(errors);
      toast.error("Please check the form for errors.");
    }
  };

  // Helper to safely cast roles (Used by both Single and Bulk)
  const getValidatedRole = (role: string): TeacherRole => {
    return (VALID_TEACHER_ROLES as readonly string[]).includes(role)
      ? (role as TeacherRole)
      : ("" as unknown as TeacherRole);
  };

  // --- Handlers ---

  const handleAnnouncementSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const { title, content } = (e.currentTarget as AnnouncementFormElement)
      .elements;
    const data = { title: title.value, content: content.value };

    try {
      await announcementSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Sending broadcast...");
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Broadcast sent!", { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { className, category } = (e.currentTarget as ClassFormElement)
      .elements;
    const data = { className: className.value, category: category.value };

    try {
      await classSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Creating class...");
      await new Promise((res) => setTimeout(res, 1000));
      toast.success(`${data.className} created!`, { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExpenseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, category, description } = (
      e.currentTarget as ExpenseFormElement
    ).elements;
    const data = {
      amount: Number(amount.value),
      category: category.value,
      description: description.value,
    };

    try {
      await expenseSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Logging expense...");
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Expense logged!", { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTeacherSubmit = async (data: TeacherFormData) => {
    // e.preventDefault() and formData extraction are DELETED.
    // React Hook Form passes the 'data' object directly.

    try {
      // 2. We skip manual validation because useForm({ resolver: yupResolver })
      // handles this before handleTeacherSubmit is triggered.
      setIsSubmitting(true);

      const loading = toast.loading(
        `Sending professional invite to ${data.name}...`,
      );

      // Simulate API Delay
      await new Promise((res) => setTimeout(res, 1500));

      // In a real app, you'd do: await api.teachers.create(data);

      toast.success(`Invite successfully sent!`, { id: loading });

      // 3. Close the modal using your context
      closeModal();
    } catch (err) {
      // This will now only catch API/Network errors, not validation errors
      console.error("Submission error:", err);
      toast.error("Failed to send invite. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkTeacherSubmit = async (file: File) => {
    clearErrors();
    if (!file) return;

    setIsSubmitting(true);
    const loading = toast.loading("Analyzing staff list...");

    // Use the inferred type from your schema to ensure consistency
    let teachersToValidate: TeacherFormData[] = [];

    try {
      const text = await file.text();

      // 1. Parse CSV with specific row type
      const { data: rawRows } = Papa.parse<TeacherCSVRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      // 2. Strict Mapping Logic
      teachersToValidate = rawRows.map((row) => {
        // Use the headers exactly as they appear in the CSV or fallbacks
        const rawRole = (row["Role"] || row.role || "").trim();

        return {
          name: (row["Full Name"] || row.fullName || "").trim(),
          email: (row["Email"] || row.email || "").trim(),
          subject: (row["Subject"] || row.subject || "").trim(), // Added subject field
          // Type assertion here ensures we pass the string through validation
          role: getValidatedRole(rawRole) as TeacherFormData["role"],
          assignedClass: (
            row["Assigned Class"] ||
            row.assignedClass ||
            ""
          ).trim(),
        };
      });

      // 3. Schema Validation
      // This will now use your Yup schema to catch bad emails or invalid roles
      await bulkTeacherSchema.validate(
        { teachers: teachersToValidate },
        { abortEarly: false },
      );

      // Simulated API Batch Processing
      await new Promise((res) => setTimeout(res, 2000));

      toast.success(`${teachersToValidate.length} staff invitations queued!`, {
        id: loading,
      });

      closeModal();
    } catch (err: unknown) {
      // 4. Handle errors with your universal formatter
      const formatted = formatCSVValidationErrors(
        err,
        teachersToValidate,
        "name", // Use 'name' as the unique key to show which row failed
      );

      setTeacherBulkErrors(formatted);
      toast.error("CSV validation failed. Please check the rows below.", {
        id: loading,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentSubmit = async (data: StudentFormData) => {
    try {
      setIsSubmitting(true);
      const loading = toast.loading(`Enrolling ${data.firstName}...`);

      // 🛠️ Data Transformation (If needed for your API)
      const payload = {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
        enrolledAt: new Date().toISOString(),
      };

      // Simulate API Call
      await new Promise((res) => setTimeout(res, 1500));

      toast.success(`${data.firstName} has been enrolled successfully!`, {
        id: loading,
      });

      closeModal();
      // Logic to refresh your list (e.g., mutate() if using SWR/React Query)
    } catch (err) {
      console.error("Enrollment failed:", err);
      toast.error("An error occurred during enrollment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkStudentSubmit = async (file: File) => {
    clearErrors();
    if (!file) return;

    setIsSubmitting(true);
    const loading = toast.loading("Analyzing student list...");

    // Initialize with an empty array of the correct type
    let studentsToValidate: StudentFormData[] = [];

    try {
      const text = await file.text();
      const { data: rawRows } = Papa.parse<StudentCSVRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      const validRows = rawRows.filter(
        (row) => row && (row["firstName"] || row.firstName),
      );

      // 2. Mapping Logic - Aligned with StudentFormData
      studentsToValidate = validRows.map((row) => {
        const dobSource = row["dateOfBirth"] || row.dateOfBirth;
        const parsedDate = dobSource ? new Date(dobSource) : new Date();

        // Fix: Check validity and cast to Date to avoid 'any' error
        const finalDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

        return {
          firstName: (row["firstName"] || row.firstName || "").trim(),
          lastName: (row["lastName"] || row.lastName || "").trim(),
          gender: (row["gender"] ||
            row.gender ||
            "Other") as StudentFormData["gender"],
          dateOfBirth: finalDate, // No more 'as any'
          classId: (row["class"] || row.class || "").trim(), // Fix: Changed from 'class' to 'classId'
          studentId:
            (row["studentId"] || row.studentId || "").trim() || undefined,
        };
      });

      // 3. Batch Validation
      await bulkStudentSchema.validate(
        { students: studentsToValidate },
        { abortEarly: false },
      );

      await new Promise((res) => setTimeout(res, 2000));

      toast.success(`${studentsToValidate.length} students enrolled!`, {
        id: loading,
      });
      closeModal();
    } catch (err: unknown) {
      const formatted = formatCSVValidationErrors(
        err,
        studentsToValidate,
        "firstName",
      );
      setStudentBulkErrors(formatted);
      toast.error("CSV validation failed.", { id: loading });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleParentSubmit = async (data: ParentFormData) => {
    try {
      setIsSubmitting(true);
      const loading = toast.loading(`Enrolling ${data.fullName}...`);

      // 🛠️ Data Transformation (If needed for your API)
      const payload = {
        ...data,
        enrolledAt: new Date().toISOString(),
      };

      // Simulate API Call
      await new Promise((res) => setTimeout(res, 1500));

      toast.success(`${data.fullName} has been enrolled successfully!`, {
        id: loading,
      });

      closeModal();
      // Logic to refresh your list (e.g., mutate() if using SWR/React Query)
    } catch (err) {
      console.error("Registratiob failed:", err);
      toast.error("An error occurred during enrollment.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBulkParentSubmit = async (file: File) => {
    clearErrors();
    if (!file) return;

    setIsSubmitting(true);
    const loading = toast.loading("Processing parent records...");

    // Use inferred ParentFormData for strict mapping
    let parentsToValidate: ParentFormData[] = [];

    try {
      const text = await file.text();
      const { data: rawRows } = Papa.parse<ParentCSVRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      // 1. Strict Mapping with header fallbacks
      parentsToValidate = rawRows.map((row) => ({
        fullName: (row["fullName"] || row.fullName || "").trim(),
        email: (row["email"] || row.email || "").trim(),
        phoneNumber: (row["phoneNumber"] || row.phoneNumber || "").trim(),
        occupation: (row["occupation"] || row.occupation || "").trim(),
        address: (row["address"] || row.address || "").trim(),
        // Cast 'relationship' to ensure it matches your Yup schema's union types
        relationship: row["relationship"] || row.relationship || "Other",
        emergencyContact: (
          row["emergencyContact"] ||
          row.emergencyContact ||
          ""
        ).trim(),
      }));

      // 2. Collection Validation
      await bulkParentSchema.validate(
        { parents: parentsToValidate },
        { abortEarly: false },
      );

      // Simulated API Call (e.g., Firebase Batch Write)
      await new Promise((res) => setTimeout(res, 2000));

      toast.success(
        `${parentsToValidate.length} parent records successfully created!`,
        {
          id: loading,
        },
      );

      closeModal();
    } catch (err: unknown) {
      // 3. Format errors using 'fullName' as the row identifier for the user
      const formatted = formatCSVValidationErrors(
        err,
        parentsToValidate,
        "fullName",
      );

      setParentBulkErrors(formatted);
      toast.error("CSV validation failed. Please review the errors.", {
        id: loading,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    activeModal,
    setActiveModal,
    closeModal,
    formErrors,
    isSubmitting,
    handleAnnouncementSubmit,
    handleClassSubmit,
    handleExpenseSubmit,
    handleTeacherSubmit,
    handleBulkTeacherSubmit,
    handleStudentSubmit,
    handleBulkStudentSubmit,
    handleParentSubmit,
    handleBulkParentSubmit,
    studentBulkErrors,
    teacherBulkErrors,
    parentBulkErrors,
    clearErrors,
  };
};
