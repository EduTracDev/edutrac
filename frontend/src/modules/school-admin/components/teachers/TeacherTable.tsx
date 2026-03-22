"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { TeacherRow } from "./TeacherRow";
import { Teacher } from "@/modules/types/dashboard";
import { EmptyState } from "@/modules/shared/EmptyState";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";

interface TeacherTableProps {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onViewProfile: (id: string) => void;
  onReset: () => void;
}

export const TeacherTable = ({
  teachers,
  onEdit,
  onViewProfile,
  onReset,
}: TeacherTableProps) => {
  const { openModal } = useModals();

  if (teachers.length === 0) {
    return (
      <EmptyState
        title="No instructors found"
        description="Try adjusting your filters or search terms."
        onReset={onReset}
        actionLabel="Add New Teacher"
        onActionClick={() => openModal("teacher")}
      />
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
      {/* Main Responsive Wrapper: 
          - On mobile, we hide the traditional table headers.
          - We use overflow-x-auto to allow horizontal scrolling on small tablets.
      */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-50 hidden md:table-row">
              <th
                scope="col"
                className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest"
              >
                Instructor
              </th>
              <th
                scope="col"
                className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest"
              >
                Subject & Role
              </th>
              <th
                scope="col"
                className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest hidden lg:table-cell"
              >
                Class
              </th>
              <th
                scope="col"
                className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest"
              >
                Status
              </th>
              <th scope="col" className="px-6 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {teachers.map((teacher) => (
              <TeacherRow
                key={teacher.id}
                teacher={teacher}
                onEdit={() => onEdit(teacher)}
                onView={() => onViewProfile(teacher.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
