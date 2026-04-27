"use client";

import React, { useState, useMemo } from "react";
import { StudentTableRow } from "./StudentTableRow";
import { StudentMobileCard } from "./StudentMobileCard";
import { Parent, Student, StudentParentLink } from "@/modules/types/dashboard";
import { EmptyState } from "@/modules/shared/EmptyState";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { StudentProfileSlideover } from "./StudentProfileSliderover";
import { UniversalLinkerModal } from "@/modules/shared/component/UniversalLinkerModal";

interface StudentTableProps {
  students: Student[];
  onReset: () => void;
  parentData: Parent[];
  studentParentLink: StudentParentLink[];
}

export const StudentTable = ({
  students,
  onReset,
  parentData,
  studentParentLink,
}: StudentTableProps) => {
  const { openModal } = useModals();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // SYNCED STATE: Use 'activeStudentForLinking' consistently
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [activeStudentForLinking, setActiveStudentForLinking] =
    useState<Student | null>(null);

  const handleQuickLink = (student: Student) => {
    setActiveStudentForLinking(student);
    setIsLinkModalOpen(true);
  };

  const handleViewProfile = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setIsProfileOpen(true);
    }
  };

  // Mock API Handler (Move this into your page or keep here if just for testing)
  const handleLinkStudentToParent = async (
    parentId: string,
    relationship: string,
  ) => {
    if (!activeStudentForLinking) return;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log(
        `Linked ${activeStudentForLinking.id} to ${parentId} as ${relationship}`,
      );
      // In a real app, you'd call setStudents or a mutation here
    } catch (error) {
      console.error(error);
    }
  };

  const studentsWithPrimaryData = useMemo(() => {
    if (!studentParentLink || !parentData) {
      return students.map((s) => ({
        ...s,
        primaryParent: undefined,
        relationship: "Guardian",
      }));
    }

    return students.map((student) => {
      const primaryLink = studentParentLink?.find(
        (link) => link.studentId === student.id && link.isPrimaryContact,
      );

      const activeLink =
        primaryLink ||
        studentParentLink?.find((link) => link.studentId === student.id);

      const parent = activeLink
        ? parentData?.find((p) => p.id === activeLink.parentId)
        : undefined;

      return {
        ...student,
        primaryParent: parent,
        relationship: activeLink?.relationship || "Guardian",
      };
    });
  }, [students, parentData, studentParentLink]);

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
                  Parent Info
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
              {studentsWithPrimaryData.map((data) => (
                <StudentTableRow
                  key={data.id}
                  student={data}
                  parent={data.primaryParent}
                  relationship={data.relationship}
                  onEdit={() => openModal("student", data)}
                  onViewProfile={() => handleViewProfile(data.id)}
                  onQuickLink={handleQuickLink}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden p-3 bg-slate-50/50">
          {studentsWithPrimaryData.map((data) => (
            <StudentMobileCard
              key={data.id}
              student={data}
              parent={data.primaryParent}
              relationship={data.relationship}
              onEdit={() => openModal("student", data)}
              onViewProfile={() => handleViewProfile(data.id)}
            />
          ))}
        </div>
      </div>

      <StudentProfileSlideover
        student={selectedStudent}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* UNIVERSAL MODAL: Synced with local state */}
      {activeStudentForLinking && (
        <UniversalLinkerModal
          isOpen={isLinkModalOpen}
          onClose={() => {
            setIsLinkModalOpen(false);
            setActiveStudentForLinking(null);
          }}
          mode="find-parent"
          targetName={`${activeStudentForLinking.firstName} ${activeStudentForLinking.lastName}`}
          targetId={activeStudentForLinking.id}
          dataPool={parentData}
          onLink={handleLinkStudentToParent}
        />
      )}
    </>
  );
};
