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

  const handleTeacherSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: TeacherFormData = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      role: getValidatedRole((formData.get("role") as string) || ""),
      assignedClass: (formData.get("assignedClass") as string) || "",
    };

    try {
      await teacherBaseSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Sending professional invite...");
      await new Promise((res) => setTimeout(res, 1500));
      toast.success(`Invite sent to ${data.name}!`, { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkTeacherSubmit = async (file: File) => {
    clearErrors();
    if (!file) return;

    setIsSubmitting(true);
    const loading = toast.loading("Analyzing staff list...");

    let teachersToValidate: TeacherFormData[] = [];

    try {
      const text = await file.text();
      const { data: rawRows } = Papa.parse<TeacherCSVRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      teachersToValidate = rawRows.map((row) => ({
        name: (row["Full Name"] || row.fullName || "").trim(),
        email: (row["Email"] || row.email || "").trim(),
        role: getValidatedRole((row["Role"] || row.role || "").trim()),
        assignedClass: (
          row["Assigned Class"] ||
          row.assignedClass ||
          ""
        ).trim(),
      }));

      // Validate against the collection schema
      await bulkTeacherSchema.validate(
        { teachers: teachersToValidate },
        { abortEarly: false },
      );

      // Simulated Batch Processing
      await new Promise((res) => setTimeout(res, 2000));

      toast.success(`${teachersToValidate.length} invites sent!`, {
        id: loading,
      });
      closeModal();
    } catch (err: unknown) {
      // Use the universal formatter - we use "name" as the identifier for teachers
      const formatted = formatCSVValidationErrors(
        err,
        teachersToValidate,
        "name",
      );

      setTeacherBulkErrors(formatted);
      toast.error("Validation failed. Please fix the CSV rows.", {
        id: loading,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawId = formData.get("studentId") as string;

    const data = {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      gender: formData.get("gender") as string,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth") as string)
        : undefined,
      class: formData.get("class") as string,
      parentEmail: (formData.get("parentEmail") as string) || "",
      studentId: rawId.trim() || undefined,
    };

    try {
      await studentBaseSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Enrolling student...");

      // Simulated API call
      await new Promise((res) => setTimeout(res, 1500));

      toast.success(`${data.firstName} has been enrolled!`, { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkStudentSubmit = async (file: File) => {
    clearErrors();
    if (!file) return;

    setIsSubmitting(true);
    const loading = toast.loading("Analyzing student list...");

    let studentsToValidate: StudentFormData[] = [];

    try {
      const text = await file.text();
      const { data: rawRows } = Papa.parse<StudentCSVRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      const validRows = rawRows.filter(
        (row) => row && (row["First Name"] || row.firstName),
      );

      studentsToValidate = validRows.map((row) => {
        const dobSource = row["Date of Birth"] || row.dateOfBirth;
        const parsedDate = dobSource ? new Date(dobSource) : new Date();

        return {
          firstName: (row["First Name"] || row.firstName || "").trim(),
          lastName: (row["Last Name"] || row.lastName || "").trim(),
          gender: (row["Gender"] || row.gender || "Other") as
            | "Male"
            | "Female"
            | "Other",
          dateOfBirth: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
          classId: (row["Class"] || row.class || "").trim(),
          parentEmail: (row["Parent Email"] || row.parentEmail || "").trim(),
          parentPhoneNumber: (
            row["Parent Phone Number"] ||
            row.parentPhoneNumber ||
            ""
          ).trim(),
          studentId:
            (row["Student ID"] || row.studentId || "").trim() || undefined,
        };
      });

      // Run Validation
      await bulkStudentSchema.validate(
        { students: studentsToValidate },
        { abortEarly: false },
      );

      // Simulated API/Firebase Batch Write
      await new Promise((res) => setTimeout(res, 2000));

      toast.success(`${studentsToValidate.length} students enrolled!`, {
        id: loading,
      });
      closeModal();
    } catch (err: unknown) {
      // 3. NOW ACCESSIBLE: The catch block can now see studentsToValidate
      const formatted = formatCSVValidationErrors(
        err,
        studentsToValidate,
        "firstName",
      );

      setStudentBulkErrors(formatted);
      toast.error("Validation failed. Please check the rows.", { id: loading });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleParentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    //  Construct the data object from FormData
    const data = {
      fullName: (formData.get("fullName") as string) || "",
      email: (formData.get("email") as string) || "",
      phoneNumber: (formData.get("phoneNumber") as string) || "",
      relationship: (formData.get("relationship") as string) || "",
      address: (formData.get("address") as string) || "",
      occupation: (formData.get("occupation") as string) || "",
      emergencyContact: (formData.get("emergencyContact") as string) || "",
    };

    try {
      await parentBaseSchema.validate(data, { abortEarly: false });

      setIsSubmitting(true);
      const loading = toast.loading("Registering parent record...");

      await new Promise((res) => setTimeout(res, 1500));

      toast.success(`${data.fullName} registered successfully!`, {
        id: loading,
      });
      closeModal();
    } catch (err: unknown) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBulkParentSubmit = async (file: File) => {
    clearErrors();
    if (!file) return;

    setIsSubmitting(true);
    const loading = toast.loading("Processing parent records...");
    let parentsToValidate: ParentFormData[] = [];

    try {
      const text = await file.text();
      const { data: rawRows } = Papa.parse<ParentCSVRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      parentsToValidate = rawRows.map((row) => ({
        fullName: (row["Full Name"] || row.fullName || "").trim(),
        email: (row["Email"] || row.email || "").trim(),
        phoneNumber: (row["Phone Number"] || row.phoneNumber || "").trim(),
        occupation: (row["Occupation"] || row.occupation || "").trim(),
        address: (row["Address"] || row.address || "").trim(),
        relationship: (row["Relationship"] ||
          row.relationship ||
          "Other") as ParentFormData["relationship"],
        emergencyContact: (
          row["Emergency Contact"] ||
          row.emergencyContact ||
          ""
        ).trim(),
      }));

      await bulkParentSchema.validate(
        { parents: parentsToValidate },
        { abortEarly: false },
      );

      // Simulated API Call
      await new Promise((res) => setTimeout(res, 2000));

      toast.success(`${parentsToValidate.length} parents registered!`, {
        id: loading,
      });
      closeModal();
    } catch (err: unknown) {
      const formatted = formatCSVValidationErrors(
        err,
        parentsToValidate,
        "fullName",
      );
      setParentBulkErrors(formatted);
      toast.error("Validation failed. Check the highlighted rows.", {
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
