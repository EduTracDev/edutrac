"use client";

import React, { useState, useMemo } from "react";
import { ParentTableRow } from "./ParentTableRow";
import { ParentMobileCard } from "./ParentMobileCard";
import { Parent, Student } from "@/modules/types/dashboard";
import { EmptyState } from "@/modules/shared/EmptyState";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { ParentProfileSlideover } from "./ParentProfileSlideover";
import { UniversalLinkerModal } from "@/modules/shared/component/UniversalLinkerModal";
import { studentData } from "@/modules/constants/dashboard";
import { toast } from "react-hot-toast";
import { ConfirmUnlinkModal } from "../dashboard/modals/ConfirmUnlinkModal";

interface ParentTableProps {
  parents: Parent[];
  allStudents: Student[];
  onEdit: (parent: Parent) => void;
  onViewProfile: (id: string) => void;
  onReset: () => void;
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>; // Added to handle state update
}

export const ParentTable = ({
  parents,
  allStudents,
  onEdit,
  onViewProfile,
  onReset,
  setParents,
}: ParentTableProps) => {
  const { openModal } = useModals();

  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modal State for Linking
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [parentToLink, setParentToLink] = useState<Parent | null>(null);
  const [unlinkModal, setUnlinkModal] = useState<{
    isOpen: boolean;
    parentId: string;
    studentId: string;
    studentName: string;
  }>({ isOpen: false, parentId: "", studentId: "", studentName: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedParent = useMemo(
    () => parents.find((p) => p.id === selectedParentId) || null,
    [parents, selectedParentId],
  );

  const handleViewProfile = (id: string) => {
    const parent = parents.find((t) => t.id === id);
    if (parent) {
      setSelectedParentId(id);
      setIsProfileOpen(true);
    }
  };

  const handleOpenLinkModal = (parent: Parent) => {
    setParentToLink(parent);
    setIsLinkModalOpen(true);
  };

  const handleLinkStudent = async (studentId: string, relationship: string) => {
    if (!parentToLink) return;

    try {
      // Simulate API
      await new Promise((resolve) => setTimeout(resolve, 800));

      setParents((prev) =>
        prev.map((p) =>
          p.id === parentToLink.id
            ? { ...p, studentIds: [...p.studentIds, studentId] }
            : p,
        ),
      );

      toast.success("Student successfully linked");
    } catch (error) {
      toast.error("Failed to link student");
      throw error; // Let the modal handle the error UI
    }
  };

  // 1. Triggered by the Slideover 'Unlink' button
  const handleUnlinkClick = (parentId: string, studentId: string) => {
    const student = allStudents.find((s) => s.id === studentId);
    setUnlinkModal({
      isOpen: true,
      parentId,
      studentId,
      studentName: student
        ? `${student.firstName} ${student.lastName}`
        : "this ward",
    });
  };

  // 2. Triggered by the 'Yes, Unlink' button inside the Modal
  const handleConfirmUnlink = async () => {
    const { parentId, studentId } = unlinkModal;
    setIsSubmitting(true);

    try {
      // Simulate API Latency (important for testing the spinner!)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setParents((prev) =>
        prev.map((p) =>
          p.id === parentId
            ? {
                ...p,
                studentIds: p.studentIds.filter((id) => id !== studentId),
              }
            : p,
        ),
      );

      toast.success("Ward unlinked successfully");
      setUnlinkModal((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      toast.error("Failed to remove ward");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (parents.length === 0) {
    return (
      <EmptyState
        title="No Parents found" // Fixed the "Teachers" typo
        description="Try adjusting your filters or search terms."
        onReset={onReset}
        actionLabel="Add New Parent"
        onActionClick={() => openModal("parent")}
      />
    );
  }

  return (
    <>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="hidden md:table w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Parents
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Phone
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Emergency
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Occupation
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Wards
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Status
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent) => (
              <ParentTableRow
                key={parent.id}
                parent={parent}
                allStudents={allStudents}
                onEdit={() => openModal("parent", parent)}
                onViewProfile={() => handleViewProfile(parent.id)}
                onLinkStudent={() => handleOpenLinkModal(parent)} // Pass the trigger
              />
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden p-3 space-y-3">
          {parents.map((parent) => (
            <ParentMobileCard
              key={parent.id}
              parent={parent}
              allStudents={allStudents}
              onEdit={() => openModal("parent", parent)}
              onViewProfile={() => handleViewProfile(parent.id)}
              onLinkStudent={() => handleOpenLinkModal(parent)}
            />
          ))}
        </div>
      </div>

      {/* Slideover for Profile */}

      <ParentProfileSlideover
        parent={selectedParent}
        allStudents={allStudents}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onUnlink={handleUnlinkClick}
      />

      {/* Link Student Modal */}
      {parentToLink && (
        <UniversalLinkerModal
          isOpen={isLinkModalOpen}
          onClose={() => {
            setIsLinkModalOpen(false);
            setParentToLink(null);
          }}
          mode="find-student"
          targetName={parentToLink.fullName}
          targetId={parentToLink.id}
          dataPool={allStudents} // Use the prop passed to ParentTable
          onLink={handleLinkStudent} // Your existing logic that updates setParents
        />
      )}
      <ConfirmUnlinkModal
        isOpen={unlinkModal.isOpen}
        studentName={unlinkModal.studentName}
        onClose={() => setUnlinkModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmUnlink}
      />
    </>
  );
};
