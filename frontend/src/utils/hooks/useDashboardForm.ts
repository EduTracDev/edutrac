import { useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import {
  announcementSchema,
  classSchema,
  expenseSchema,
  teacherSchema,
} from "@/utils/validation";
import {
  AnnouncementFormElement,
  ClassFormElement,
  ExpenseFormElement,
} from "@/modules/types/forms";
import { ActiveModal } from "@/modules/types/dashboard";

export const useDashboardForms = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => {
    setActiveModal(null);
    setFormErrors({});
  };

  // Generic Error Handler for Yup
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

  // --- Announcement Logic ---
  const handleAnnouncementSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const form = e.currentTarget as AnnouncementFormElement;
    const { title, content } = form.elements;
    const data = { title: title.value, content: content.value };

    try {
      await announcementSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Sending broadcast...");

      // Simulating API/Firebase Call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Broadcast sent!", { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Class Creation Logic ---
  const handleClassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as ClassFormElement;
    const { className, category } = form.elements;
    const data = { className: className.value, category: category.value };

    try {
      await classSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Creating class...");

      // Simulating API/Firebase Call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`${data.className} created!`, { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  // -- Expenses Logic ---
  const handleExpenseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as ExpenseFormElement;
    const { amount, category, description } = form.elements;

    const data = {
      amount: Number(amount.value),
      category: category.value,
      description: description.value,
    };

    try {
      await expenseSchema.validate(data, { abortEarly: false });
      setIsSubmitting(true);
      const loading = toast.loading("Logging expense...");

      // Firebase logic would go here:
      // await addDoc(collection(db, "expenses"), { ...data, date: new Date() });

      toast.success("Expense logged successfully!", { id: loading });
      closeModal();
    } catch (err) {
      handleValidationError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  //Teacher Schema
  const handleTeacherSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Extract data from the form
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      assignedClass: formData.get("assignedClass") as string,
    };

    try {
      // 1. Validate using Yup
      await teacherSchema.validate(data, { abortEarly: false });

      setIsSubmitting(true);
      const loading = toast.loading("Sending professional invite...");

      // 2. Simulated API/Firebase Call
      // await addDoc(collection(db, "invites"), { ...data, status: "pending", createdAt: new Date() });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(`Invite sent to ${data.name}!`, { id: loading });
      closeModal();
    } catch (err) {
      // This now handles the "err" properly and updates formErrors state
      handleValidationError(err);
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
  };
};
