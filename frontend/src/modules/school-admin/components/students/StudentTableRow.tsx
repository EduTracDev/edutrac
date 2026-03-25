"use client";
import { useState } from "react";
import {
  MoreHorizontal,
  UserCheck,
  UserMinus,
  Trash2,
  Edit3,
  Send,
  Mail,
  GraduationCap,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Student, EnrollmentStatus } from "@/modules/types/dashboard";
import Image from "next/image";

interface Props {
  student: Student;
  onViewProfile: (id: string) => void;
  onEdit: () => void;
}

export const StudentTableRow = ({ student, onViewProfile, onEdit }: Props) => {
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Helper to determine status styles
  const getStatusStyles = (status: EnrollmentStatus) => {
    switch (status) {
      case "Active":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Suspended":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "Withdrawn":
        return "text-rose-600 bg-rose-50 border-rose-100";
      case "Graduated":
        return "text-[#923CF9] bg-[#923CF9]/5 border-[#923CF9]/10";
      default:
        return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  const getStatusIcon = (status: EnrollmentStatus) => {
    switch (status) {
      case "Active":
        return <UserCheck size={12} />;
      case "Graduated":
        return <GraduationCap size={12} />;
      case "Withdrawn":
        return <XCircle size={12} />;
      default:
        return <UserMinus size={12} />;
    }
  };

  const handleResendInvite = async (id: string) => {
    setIsResending(true);
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve(true), 1500),
    );

    toast.promise(promise, {
      loading: "Resending portal access...",
      success: "Invite sent to parent!",
      error: "Failed to send.",
    });

    try {
      await promise;
    } finally {
      setIsResending(false);
      setMenuOpen(false);
    }
  };

  const initials =
    `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();

  return (
    <tr
      onClick={() => onViewProfile(student.studentId)}
      className="group hover:bg-slate-50/80 transition cursor-pointer border-b border-slate-50"
    >
      {/* Name and Avatar */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 relative rounded-2xl overflow-hidden bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold shrink-0 border border-[#923CF9]/5">
            {student.avatarUrl && !imageError ? (
              <Image
                src={student.avatarUrl}
                alt={student.firstName}
                fill
                className="object-cover"
                sizes="44px"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-xs uppercase tracking-widest">
                {initials}
              </span>
            )}
          </div>
          <div className="">
            <p className="text-sm font-bold text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px]">
              {student.firstName} {student.lastName}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
              Reg: {student.studentId || student.studentId.slice(0, 8)}
            </p>
          </div>
        </div>
      </td>

      {/* Class */}
      <td className="px-6 py-4 text-sm font-bold text-slate-600 whitespace-nowrap">
        {student.class}
      </td>

      {/* Parent Contact */}
      <td className="px-6 py-4 text-sm font-bold text-slate-600">
        {student.parentEmail}
      </td>
      <td className="px-6 py-4 text-sm font-bold text-slate-600 whitespace-nowrap">
        {student.parentPhoneNumber}
      </td>
      {/* Enrollment Status Pill */}
      <td className="px-6 py-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider w-fit ${getStatusStyles(student.enrollmentStatus)}`}
        >
          {getStatusIcon(student.enrollmentStatus)}
          {student.enrollmentStatus}
        </div>
      </td>

      {/* Portal Status */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <div
            className={`h-1.5 w-1.5 rounded-full ${student.accountStatus === "Joined" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}
          />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            {student.accountStatus}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="relative px-6 py-4 text-right">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#923CF9] transition-all"
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && (
          <div className="absolute right-6 top-14 z-50 w-52 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
            >
              <Edit3 size={14} /> Edit Information
            </button>

            {student.accountStatus !== "Joined" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResendInvite(student.studentId);
                }}
                disabled={isResending}
                className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#923CF9] hover:bg-[#923CF9]/5 flex items-center gap-2 disabled:opacity-50"
              >
                <Send
                  size={14}
                  className={isResending ? "animate-pulse" : ""}
                />
                {isResending ? "Sending..." : "Resend Invite"}
              </button>
            )}

            <div className="my-1 border-t border-slate-50" />

            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
              <Trash2 size={14} /> Delete Record
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
