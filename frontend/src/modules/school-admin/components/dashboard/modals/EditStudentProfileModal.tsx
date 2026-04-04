import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Student } from "@/modules/types/dashboard";
import Modal from "../Modal";

interface EditStudentFormValues {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string; // HTML date inputs use "YYYY-MM-DD" strings
  classId: string;
}

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Student;
  onSubmit: (data: EditStudentFormValues) => Promise<void>;
}

export const EditStudentProfileModal = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: EditStudentModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditStudentFormValues>();

  // Helper to format Date to YYYY-MM-DD for the input field
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        gender: (initialData.gender as "Male" | "Female" | "Other") || "Other",
        dateOfBirth: formatDate(initialData.dateOfBirth),
        // classId: initialData.classId || "",
      });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${initialData?.firstName ?? "Student"}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              First Name
            </label>
            <input
              {...register("firstName", { required: "Required" })}
              className={`w-full p-3 bg-slate-50 border ${errors.firstName ? "border-red-500" : "border-slate-100"} rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#923CF9]/5 transition-all`}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Required" })}
              className={`w-full p-3 bg-slate-50 border ${errors.lastName ? "border-red-500" : "border-slate-100"} rounded-2xl text-sm outline-none focus:bg-white transition-all`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Gender</label>
            <select
              {...register("gender")}
              className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-[#923CF9] hover:bg-[#7b2edb] rounded-xl transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
