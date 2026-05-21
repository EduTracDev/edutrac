"use client";

import React from "react";
import { Teacher } from "@/modules/types/dashboard";
import { User, BookOpen, BadgeCheck } from "lucide-react";
import Image from "next/image";

interface SubjectTeacherListProps {
  teachers: Teacher[];
  targetClass: string;
}

export const SubjectTeacherList = ({
  teachers,
  targetClass,
}: SubjectTeacherListProps) => {
  // Filter for teachers assigned to this specific class
  const classFaculty = teachers.filter((t) => t.assignedClass === targetClass);

  return (
    <section aria-labelledby="faculty-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2
          id="faculty-heading"
          className="text-xs font-black uppercase tracking-widest text-slate-400"
        >
          Class Faculty & Subjects
        </h2>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold">
          {classFaculty.length} Educators
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classFaculty.map((teacher) => (
          <div
            key={teacher.id}
            className="group relative bg-white border border-slate-100 p-4 rounded-[24px] hover:border-[#923CF9]/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {/* Avatar Logic */}
              <div className="relative w-12 h-12 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-50">
                {teacher.avatarUrl ? (
                  <Image
                    src={teacher.avatarUrl}
                    alt={`${teacher.name}'s profile picture`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <User size={24} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {teacher.name}
                  </p>
                  {teacher.role.includes("VP") && (
                    <BadgeCheck
                      size={14}
                      className="text-[#923CF9]"
                      aria-label="Verified Administrator"
                    />
                  )}
                </div>

                <div className="flex items-center gap-1 text-[#923CF9]">
                  <BookOpen size={12} />
                  <p className="text-[11px] font-black uppercase tracking-tight leading-none">
                    {teacher.subject}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Indicator (A11y: Status described via text and color) */}
            <div className="mt-3 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  teacher.employmentStatus === "Active"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {teacher.employmentStatus}
              </span>
              <p className="text-[10px] text-slate-400 font-medium italic">
                {teacher.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
