"use client";

import { useState, useMemo } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { StudentStats } from "@/modules/school-admin/components/students/StudentStats";
import { studentData } from "@/modules/constants/dashboard";
import { StudentActionBar } from "@/modules/school-admin/components/students/StudentActionBar";
import { StudentFilters } from "@/modules/types/dashboard";
import { AddStudentModal } from "@/modules/school-admin/components/dashboard/modals/AddStudentModal";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { StudentTable } from "@/modules/school-admin/components/students/StudentTable";
import { SharedPagination } from "@/modules/shared/Pagination";

export default function Page() {
  const { activeModal, closeModal } = useModals();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<StudentFilters>({
    class: "All",
    gender: "All",
    accountStatus: "All",
  });

  // 1. Define missing handler for Filter Changes
  const handleFilterChange = (type: keyof StudentFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // 2. Define missing handler for Clearing Filters
  const handleClearFilters = () => {
    setFilters({
      class: "All",
      gender: "All",
      accountStatus: "All",
    });
    setSearchQuery("");
  };

  const filteredStudents = useMemo(() => {
    return studentData.filter((s) => {
      const matchesSearch =
        (s.firstName?.toLowerCase() || "").includes(
          searchQuery.toLowerCase(),
        ) ||
        (s.lastName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (s.studentId?.toLowerCase() || "").includes(searchQuery.toLowerCase());

      const matchesClass = filters.class === "All" || s.class === filters.class;

      const matchesGender =
        filters.gender === "All" || s.gender === filters.gender;

      const matchesStatus =
        filters.accountStatus === "All" ||
        s.accountStatus === filters.accountStatus;

      return matchesSearch && matchesClass && matchesGender && matchesStatus;
    });
  }, [searchQuery, filters]);

  const availableClasses = useMemo(() => {
    const classes = studentData.map((s) => s.class);
    return Array.from(new Set(classes)).sort();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const {
    isSubmitting,
    handleStudentSubmit,
    handleBulkStudentSubmit,
    formErrors,
    studentBulkErrors,
    clearErrors,
  } = useDashboardForms();
  return (
    <AdminLayout>
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900">
            Student Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your student population and enrollment details.
          </p>
        </div>
        <StudentStats />
        <div className="p-4 mt-8">
          <p className="text-xs font-medium text-slate-500">
            Showing{" "}
            <span className="text-[#923CF9] font-bold">
              {filteredStudents.length}
            </span>
            {filteredStudents.length === 1 ? " student" : " students"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        <StudentActionBar
          onSearch={setSearchQuery}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          availableClasses={availableClasses}
        />

        <div className="mt-8">
          <StudentTable
            onReset={() => setSearchQuery("")}
            students={currentStudents}
          />
          <SharedPagination
            entityName="student"
            totalItems={filteredStudents.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
        </div>
        <AddStudentModal
          isOpen={activeModal === "student"}
          onClose={closeModal}
          onSubmit={handleStudentSubmit}
          onBulkSubmit={handleBulkStudentSubmit}
          errors={formErrors}
          isSubmitting={isSubmitting}
          studentBulkErrors={studentBulkErrors}
          clearErrors={clearErrors}
        />
      </div>
    </AdminLayout>
  );
}
