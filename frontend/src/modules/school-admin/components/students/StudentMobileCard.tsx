"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
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

import { Student, EnrollmentStatus } from "@/modules/types/dashboard";

interface Props {
  student: Student;
  onEdit: () => void;
  onViewProfile: (id: string) => void;
}

export const StudentMobileCard = ({
  student,
  onEdit,
  onViewProfile,
}: Props) => {
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);

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
        return <UserCheck size={10} />;
      case "Graduated":
        return <GraduationCap size={10} />;
      case "Withdrawn":
        return <XCircle size={10} />;
      default:
        return <UserMinus size={10} />;
    }
  };

  const handleResendInvite = async (id: string) => {
    setIsResending(true);
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve(true), 1500),
    );

    toast.promise(promise, {
      loading: "Sending invite...",
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
    <div
      onClick={() => onViewProfile(student.studentId)}
      className="relative bg-white border border-slate-100 rounded-2xl p-4 mb-3 shadow-sm cursor-pointer active:scale-[0.98] transition-all"
    >
      {/* TOP ROW: Avatar and Primary Info */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 relative rounded-2xl overflow-hidden bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold shrink-0">
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
            <span className="text-sm uppercase tracking-wider">{initials}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-800">
            {student.firstName} {student.lastName}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
            ID: {student.studentId || student.studentId.slice(0, 8)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-slate-50 pt-3">
        <div>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
            Class
          </p>
          <p className="text-xs font-bold text-slate-700">{student.class}</p>
        </div>
        <div className="flex flex-col gap-4">
          {" "}
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
              Parent Email
            </p>
            <p className="text-xs font-bold text-slate-700 truncate max-w-[120px]">
              {student.parentEmail}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
              Parent Phone No
            </p>
            <p className="text-xs font-bold text-slate-700 truncate max-w-[120px]">
              {student.parentPhoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Statuses and Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Enrollment Status */}
          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider ${getStatusStyles(student.enrollmentStatus)}`}
          >
            {getStatusIcon(student.enrollmentStatus)}
            {student.enrollmentStatus}
          </div>

          {/* Portal Status */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <div
              className={`h-1.5 w-1.5 rounded-full ${student.accountStatus === "Joined" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}
            />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
              {student.accountStatus}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 text-slate-400"
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 bottom-full mb-2 z-[100] w-48 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
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
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#923CF9] hover:bg-[#923CF9]/5 flex items-center gap-2"
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
        </div>
      </div>
    </div>
  );
};
