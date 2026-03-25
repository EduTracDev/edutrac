"use client";

import React, { useState } from "react";
import { StudentTableRow } from "./StudentTableRow";
import { StudentMobileCard } from "./StudentMobileCard";
import { Student } from "@/modules/types/dashboard";
import { EmptyState } from "@/modules/shared/EmptyState";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { StudentProfileSlideover } from "./StudentProfileSliderover";

interface StudentTableProps {
  students: Student[];
  onReset: () => void;
}

export const StudentTable = ({ students, onReset }: StudentTableProps) => {
  const { openModal } = useModals();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleViewProfile = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setIsProfileOpen(true);
    }
  };

  if (students.length === 0) {
    return (
      <EmptyState
        title="No students found"
        description="Try adjusting your filters or search terms."
        onReset={onReset}
        actionLabel="Add New Student"
        onActionClick={() => openModal("student")}
      />
    );
  }

  return (
    <>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        {/* DESKTOP TABLE */}
        <div className="overflow-x-auto">
          <table className="hidden md:table w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Student Name
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Parent Email
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Parent Phone No
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Portal Status
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  onEdit={() => openModal("student", student)}
                  onViewProfile={() => handleViewProfile(student.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden p-3 bg-slate-50/50">
          {students.map((student) => (
            <StudentMobileCard
              key={student.id}
              student={student}
              onEdit={() => openModal("student", student)}
              onViewProfile={() => handleViewProfile(student.id)}
            />
          ))}
        </div>
      </div>

      {/* Student Profile Slideover */}
      <StudentProfileSlideover
        student={selectedStudent}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};
