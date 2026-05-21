import { Student } from "@/modules/types/dashboard";
import Image from "next/image";
import { useState } from "react";

type AttendanceStatus = "present" | "absent" | "late" | "unmarked";

interface AttendanceRowProps {
  student: Student;
  status: AttendanceStatus;
  onStatusChange: (id: string, newStatus: AttendanceStatus) => void;
}

export const AttendanceRow = ({
  student,
  status,
  onStatusChange,
}: AttendanceRowProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "present":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "absent":
        return "bg-rose-50 border-rose-200 text-rose-700";
      case "late":
        return "bg-amber-50 border-amber-200 text-amber-700";
      default:
        return "bg-white border-slate-100 text-slate-400";
    }
  };

  const [imageError, setImageError] = useState(false);

  if (!student) return null;

  // Initials from firstName and lastName
  const initials =
    `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();

  return (
    <div
      className={`flex items-center justify-between p-4 mb-3 rounded-3xl border-2 transition-all ${getStatusStyles()}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
          {student.avatarUrl && !imageError ? (
            <Image
              src={student.avatarUrl}
              alt={`${student.firstName} ${student.lastName}`}
              fill
              className="object-cover"
              sizes="96px"
              priority={true}
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-3xl uppercase tracking-wider">
              {initials}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-black truncate max-w-[120px]">
            {student.firstName} {student.lastName[0]}.
          </p>
          <p className="text-[10px] uppercase font-bold opacity-60">
            {student.studentId}
          </p>
        </div>
      </div>

      {/* Touch-Friendly Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange(student.id, "present")}
          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${status === "present" ? "bg-emerald-500 text-white border-emerald-600" : "bg-white border-slate-200"}`}
          aria-label="Mark Present"
        >
          P
        </button>
        <button
          onClick={() => onStatusChange(student.id, "absent")}
          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${status === "absent" ? "bg-rose-500 text-white border-rose-600" : "bg-white border-slate-200"}`}
          aria-label="Mark Absent"
        >
          A
        </button>
        <button
          onClick={() => onStatusChange(student.id, "late")}
          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${status === "late" ? "bg-amber-500 text-white border-amber-600" : "bg-white border-slate-200"}`}
          aria-label="Mark Late"
        >
          L
        </button>
      </div>
    </div>
  );
};
