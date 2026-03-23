"use client";

import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { TeacherTableRow } from "./TeacherTableRow";
import { TeacherMobileCard } from "./TeacherMobileCard";
import { Teacher } from "@/modules/types/dashboard";
import { EmptyState } from "@/modules/shared/EmptyState";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { TeacherProfileSlideover } from "./TeacherProfileSlideover";

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
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleViewProfile = (id: string) => {
    const teacher = teachers.find((t) => t.id === id);
    if (teacher) {
      setSelectedTeacher(teacher);
      setIsProfileOpen(true);
    }
  };

  if (teachers.length === 0) {
    return (
      <EmptyState
        title="No Teachers found"
        description="Try adjusting your filters or search terms."
        onReset={onReset}
        actionLabel="Add New Teacher"
        onActionClick={() => openModal("teacher")}
      />
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-y-auto">
      {/* DESKTOP */}

      <>
        {" "}
        <table className="hidden md:table w-full text-left">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Teachers
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Subject
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Status
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <TeacherTableRow
                key={teacher.id}
                teacher={teacher}
                onEdit={() => openModal("teacher", teacher)}
                onViewProfile={() => handleViewProfile(teacher.id)}
              />
            ))}
          </tbody>
        </table>
        <TeacherProfileSlideover
          teacher={selectedTeacher}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </>

      {/* MOBILE */}

      <div className="md:hidden p-3">
        {teachers.map((teacher) => (
          <TeacherMobileCard
            key={teacher.id}
            teacher={teacher}
            onEdit={() => openModal("teacher", teacher)}
            onViewProfile={() => handleViewProfile(teacher.id)}
          />
        ))}
        <TeacherProfileSlideover
          teacher={selectedTeacher}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </div>
  );
};
