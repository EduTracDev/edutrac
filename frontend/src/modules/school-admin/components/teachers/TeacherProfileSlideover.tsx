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
} from "lucide-react";
import { Teacher } from "@/modules/types/dashboard";

interface Props {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  schoolName?: string; // Allow the SaaS to pass the specific school name
}

export const TeacherProfileSlideover = ({
  teacher,
  isOpen,
  onClose,
  schoolName = "EduTrac Academy",
}: Props) => {
  const [imageError, setImageError] = useState(false);
  if (!teacher) return null;

  const initials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Now triggers the high-fidelity print view
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Backdrop - Hidden on Print */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100] transition-opacity duration-300 no-print ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Slide-over Panel - Becomes the 'print-container' */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] transform transition-transform duration-500 ease-in-out print-container ${isOpen ? "translate-x-0" : "translate-x-full"}`}
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
          {/* 🖼️ Avatar Container */}
          <div className="h-24 w-24 relative rounded-[32px] bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-3xl font-black text-[#923CF9]">
            {teacher.avatarUrl && !imageError ? (
              <Image
                src={teacher.avatarUrl}
                alt={teacher.name}
                fill // Takes up 100% of the relative parent
                className="object-cover" // Ensures the face isn't stretched
                sizes="96px" // h-24 = 96px. Better quality for profile view.
                priority={true} // High priority as it's the main profile image
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
              {teacher.name}
            </h2>

            <div className="flex items-center gap-1.5 mt-1 text-slate-500 font-bold text-xs uppercase tracking-tight">
              <School size={14} className="text-[#923CF9]" />
              <span>{schoolName}</span>
            </div>

            <p className="text-slate-400 font-medium flex items-center gap-1.5 mt-2 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Instructor ID: {teacher.id}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Department
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">
                  {teacher.subject}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Job Status
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">
                  {teacher.employmentStatus}
                </p>
              </div>
            </div>

            {/* Detailed Info List */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-2">
              <InfoRow
                icon={<Mail size={18} />}
                label="Email"
                value={teacher.email}
              />
              <InfoRow
                icon={<ShieldCheck size={18} />}
                label="Role"
                value={teacher.role}
              />
              <InfoRow
                icon={<MapPin size={18} />}
                label="Class"
                value={teacher.assignedClass}
              />
              <InfoRow
                icon={<GraduationCap size={18} />}
                label="Date Joined"
                value={teacher.joinedDate}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions - Hidden on Print */}
        <div className="absolute bottom-0 left-0 w-full p-8 border-t border-slate-50 bg-white/80 backdrop-blur-md no-print">
          <button
            onClick={handlePrint}
            className="w-full py-4 bg-[#923CF9] text-white rounded-2xl text-sm font-black shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Printer size={18} />
            Print Staff ID Card
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
      <p className="text-xs font-bold text-slate-700 truncate">{value}</p>
    </div>
  </div>
);
