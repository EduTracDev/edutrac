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
    // e.preventDefault() and manual date parsing are now handled by the form resolver

    try {
      setIsSubmitting(true);
      const loading = toast.loading(`Enrolling ${data.firstName}...`);

      // 2. Simulated API call
      // In production: await api.students.create(data);
      await new Promise((res) => setTimeout(res, 1500));

      toast.success(`${data.firstName} ${data.lastName} has been enrolled!`, {
        id: loading,
      });

      // 3. Close the modal and clean up state
      closeModal();
    } catch (err) {
      // This catches API errors. Validation errors are caught by the UI automatically.
      console.error("Enrollment failed:", err);
      toast.error("Could not complete enrollment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkStudentSubmit = async (file: File) => {
    clearErrors();
    if (!file) return;

    setIsSubmitting(true);
    const loading = toast.loading("Analyzing student list...");

    // Use the inferred StudentFormData type to keep things strict
    let studentsToValidate: StudentFormData[] = [];

    try {
      const text = await file.text();
      const { data: rawRows } = Papa.parse<StudentCSVRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      // 1. Filter out empty rows early
      const validRows = rawRows.filter(
        (row) => row && (row["First Name"] || row.firstName),
      );

      // 2. Mapping Logic with Robust Date Parsing
      studentsToValidate = validRows.map((row) => {
        const dobSource = row["Date of Birth"] || row.dateOfBirth;
        const parsedDate = dobSource ? new Date(dobSource) : new Date();

        // Ensure we provide a valid Date or undefined to let Yup handle the "Required" error
        const finalDate = isNaN(parsedDate.getTime()) ? undefined : parsedDate;

        return {
          firstName: (row["First Name"] || row.firstName || "").trim(),
          lastName: (row["Last Name"] || row.lastName || "").trim(),
          gender: (row["Gender"] ||
            row.gender ||
            "Other") as StudentFormData["gender"],
          dateOfBirth: finalDate as any, // Cast to any briefly if your Yup schema expects a Date object
          class: (row["Class"] || row.class || "").trim(),
          parentEmail: (row["Parent Email"] || row.parentEmail || "").trim(),
          studentId:
            (row["Student ID"] || row.studentId || "").trim() || undefined,
        };
      });

      // 3. Batch Validation
      await bulkStudentSchema.validate(
        { students: studentsToValidate },
        { abortEarly: false },
      );

      // Simulated API/Firebase Batch Write
      await new Promise((res) => setTimeout(res, 2000));

      toast.success(
        `${studentsToValidate.length} students successfully enrolled!`,
        {
          id: loading,
        },
      );

      closeModal();
    } catch (err: unknown) {
      // 4. Use the identifier "firstName" to help the user locate errors in the CSV
      const formatted = formatCSVValidationErrors(
        err,
        studentsToValidate,
        "firstName",
      );

      setStudentBulkErrors(formatted);
      toast.error("CSV validation failed. Please check the highlighted rows.", {
        id: loading,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleParentSubmit = async (data: ParentFormData) => {
    // No e.preventDefault() or manual field mapping needed.

    try {
      setIsSubmitting(true);
      const loading = toast.loading(`Registering ${data.fullName}...`);

      // 2. Simulated API/Firebase call
      // In production: await api.parents.create(data);
      await new Promise((res) => setTimeout(res, 1500));

      toast.success(`${data.fullName} has been registered successfully!`, {
        id: loading,
      });

      // 3. Close the modal and reset global modal state
      closeModal();
    } catch (err) {
      // This catches server/network errors.
      // Validation is already handled by the Form component.
      console.error("Parent registration failed:", err);
      toast.error("Could not register parent. Please check your connection.");
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
        fullName: (row["Full Name"] || row.fullName || "").trim(),
        email: (row["Email"] || row.email || "").trim(),
        phoneNumber: (row["Phone Number"] || row.phoneNumber || "").trim(),
        occupation: (row["Occupation"] || row.occupation || "").trim(),
        address: (row["Address"] || row.address || "").trim(),
        // Cast 'relationship' to ensure it matches your Yup schema's union types
        relationship: (row["Relationship"] ||
          row.relationship ||
          "Other") as ParentFormData["relationship"],
        emergencyContact: (
          row["Emergency Contact"] ||
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
