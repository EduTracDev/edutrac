"use client";

import { useState } from "react";
import { AddTeacherModal } from "@/modules/school-admin/components/dashboard/modals/AddTeacherModal";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { TeacherStats } from "@/modules/school-admin/components/teachers/TeacherStats";
import { TeacherActionBar } from "@/modules/school-admin/components/teachers/TeacherActionBar";
import { TeacherTable } from "@/modules/school-admin/components/teachers/TeacherTable";
import { teacherData } from "@/modules/constants/dashboard";
import { SharedPagination } from "@/modules/shared/Pagination";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";

export default function Page() {
  const { activeModal, closeModal } = useModals();
  const [searchQuery, setSearchQuery] = useState("");

  // --- ADDED MISSING STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 1. Filter the data based on search
  const filteredTeachers = teacherData.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. --- ADDED SLICING LOGIC ---
  // This ensures the table only shows the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const {
    isSubmitting,
    handleTeacherSubmit,
    handleBulkTeacherSubmit,
    formErrors,
    teacherBulkErrors,
    clearErrors,
  } = useDashboardForms();

  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900">
            Teacher Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your academic staff and department assignments.
          </p>
        </div>
        <TeacherStats />
        <div className="mt-8">
          {" "}
          <TeacherActionBar
            onSearch={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* <div className="space-y-4">
          <TeacherTable
            teachers={currentTeachers}
            onEdit={(t) => console.log("Edit", t)}
            onViewProfile={(id) => console.log("View", id)}
            onReset={() => setSearchQuery("")}
          />

          <SharedPagination
            entityName="teacher"
            totalItems={filteredTeachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
        </div> */}
        <AddTeacherModal
          isOpen={activeModal === "teacher"}
          onClose={closeModal}
          onSubmit={handleTeacherSubmit}
          onBulkSubmit={handleBulkTeacherSubmit}
          errors={formErrors}
          isSubmitting={isSubmitting}
          teacherBulkErrors={teacherBulkErrors}
          clearErrors={clearErrors}
        />
      </div>
    </AdminLayout>
  );
}
