"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Mail,
  ShieldCheck,
  GraduationCap,
  MapPin,
  School,
  Printer,
  Phone,
  User,
} from "lucide-react";
import { Student } from "@/modules/types/dashboard";

interface Props {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  schoolName?: string;
}

export const StudentProfileSlideover = ({
  student,
  isOpen,
  onClose,
  schoolName = "EduTrac Academy",
}: Props) => {
  const [imageError, setImageError] = useState(false);

  if (!student) return null;

  // Initials from firstName and lastName
  const initials =
    `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100] transition-opacity duration-300 no-print ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] transform transition-transform duration-500 ease-in-out print-container ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Color Block */}
        <div className="relative h-32 bg-[#923CF9] overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors no-print"
          >
            <X size={20} />
          </button>
        </div>

        {/* Card Content */}
        <div className="px-8 -mt-12 relative">
          {/* Avatar Container */}
          <div className="h-24 w-24 relative rounded-[32px] bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-3xl font-black text-[#923CF9]">
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

          <div className="mt-6">
            <h2 className="text-2xl font-black text-slate-800">
              {student.firstName} {student.lastName}
            </h2>

            <div className="flex items-center gap-1.5 mt-1 text-slate-500 font-bold text-xs uppercase tracking-tight">
              <School size={14} className="text-[#923CF9]" />
              <span>{schoolName}</span>
            </div>

            <p className="text-slate-400 font-medium flex items-center gap-1.5 mt-2 text-xs">
              <span
                className={`h-1.5 w-1.5 rounded-full ${student.enrollmentStatus === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
              />
              Student ID: {student.studentId || student.id.slice(0, 8)}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Current Class
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">
                  {student.class}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Enrollment
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">
                  {student.accountStatus}
                </p>
              </div>
            </div>

            {/* Detailed Info List */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-2">
              {/* <InfoRow
                icon={<Mail size={18} />}
                label="Parent Email"
                value={student.parentEmail}
              />
              <InfoRow
                icon={<Phone size={18} />}
                label="Parent Phone"
                value={student.parentPhoneNumber}
              /> */}
              <InfoRow
                icon={<User size={18} />}
                label="Gender"
                value={student.gender}
              />
              <InfoRow
                icon={<GraduationCap size={18} />}
                label="Portal Access"
                value={student.accountStatus}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 w-full p-8 border-t border-slate-50 bg-white/80 backdrop-blur-md no-print">
          <button
            onClick={handlePrint}
            className="w-full py-4 bg-[#923CF9] text-white rounded-2xl text-sm font-black shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Printer size={18} />
            Print Student ID Card
          </button>
        </div>
      </div>
    </>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 p-1">
    <div className="h-9 w-9 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className="text-xs font-bold text-slate-700 truncate" title={value}>
        {value}
      </p>
    </div>
  </div>
);
