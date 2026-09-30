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

import { Student, Parent, EnrollmentStatus } from "@/modules/types/dashboard";

interface Props {
  student: Student;
  parent?: Parent;
  relationship?: string;
  onEdit: () => void;
  onViewProfile: (id: string) => void;
}

export const StudentMobileCard = ({
  student,
  parent,
  relationship,
  onEdit,
  onViewProfile,
}: Props) => {
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        {parent ? (
          <div className="flex flex-col">
            <p className="text-sm font-bold text-slate-700 whitespace-nowrap">
              {parent.fullName}
              <span className="ml-2 text-[10px] font-medium text-slate-400">
                ({relationship})
              </span>
            </p>
            <div className="flex justify-between items-center gap-6 mt-2">
              <p className="text-[11px] text-[#923CF9] font-bold">
                {parent.email}
              </p>
              <p className="text-[11px] text-[#923CF9] font-bold">
                {parent.phoneNumber}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {parent.emergencyContact}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-xs text-rose-400 font-medium italic">
            No parent linked
          </span>
        )}
      </div>

      {/* BOTTOM ROW: Statuses and Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Enrollment Status */}
          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded-[8px] border text-[9px] font-black uppercase tracking-wider ${getStatusStyles(student.enrollmentStatus)}`}
          >
            {getStatusIcon(student.enrollmentStatus)}
            {student.enrollmentStatus}
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
