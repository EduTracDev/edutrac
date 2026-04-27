"use client";

import { useState, useMemo } from "react";
import { AddTeacherModal } from "@/modules/school-admin/components/dashboard/modals/AddTeacherModal";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { TeacherStats } from "@/modules/school-admin/components/teachers/TeacherStats";
import { TeacherActionBar } from "@/modules/school-admin/components/teachers/TeacherActionBar";
import { TeacherTable } from "@/modules/school-admin/components/teachers/TeacherTable";
import { teacherData } from "@/modules/constants/dashboard";
import { SharedPagination } from "@/modules/shared/Pagination";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { AccountStatus, EmploymentStatus } from "@/modules/types/dashboard";

export default function Page() {
  const { activeModal, closeModal } = useModals();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    account: "All" as "All" | AccountStatus,
    employment: "All" as "All" | EmploymentStatus,
  });

  const handleFilterChange = (
    type: "account" | "employment",
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ account: "All", employment: "All" });
    setSearchQuery("");
  };

  const filteredTeachers = useMemo(() => {
    console.log("Filtering logic running...");

    return teacherData.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAccount =
        filters.account === "All" || t.accountStatus === filters.account;

      const matchesEmployment =
        filters.employment === "All" ||
        t.employmentStatus === filters.employment;

      return matchesSearch && matchesAccount && matchesEmployment;
    });

    //
  }, [searchQuery, filters, teacherData]);

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
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900">
            Teacher Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your academic staff and department assignments.
          </p>
        </div>
        <TeacherStats />
        <div className="p-4 mt-8">
          <p className="text-xs font-medium text-slate-500">
            Showing{" "}
            <span className="text-[#923CF9] font-bold">
              {filteredTeachers.length}
            </span>
            {filteredTeachers.length === 1 ? " teacher" : " teachers"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        <TeacherActionBar
          onSearch={setSearchQuery}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        <div className="mt-8">
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
        </div>
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
