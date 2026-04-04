"use client";

import { useState, useMemo } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { StudentStats } from "@/modules/school-admin/components/students/StudentStats";
import {
  parentData,
  studentData,
  studentParentLink,
} from "@/modules/constants/dashboard";
import { StudentActionBar } from "@/modules/school-admin/components/students/StudentActionBar";
import { StudentFilters } from "@/modules/types/dashboard";
import { AddStudentModal } from "@/modules/school-admin/components/dashboard/modals/AddStudentModal";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { StudentTable } from "@/modules/school-admin/components/students/StudentTable";
import { SharedPagination } from "@/modules/shared/Pagination";
import { AlertCircle } from "lucide-react";

export default function Page() {
  const { activeModal, closeModal } = useModals();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<StudentFilters>({
    class: "All",
    gender: "All",
    accountStatus: "All",
    linkStatus: "All",
  });

  //  Define missing handler for Filter Changes
  const handleFilterChange = (type: keyof StudentFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // Define missing handler for Clearing Filters
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
      const matchesLinkStatus =
        filters.linkStatus === "All" ||
        (filters.linkStatus === "Unlinked" &&
          (!s.parentIds || s.parentIds.length === 0));

      return (
        matchesSearch &&
        matchesClass &&
        matchesGender &&
        matchesStatus &&
        matchesLinkStatus
      );
    });
  }, [searchQuery, filters]);

  const availableClasses = useMemo(() => {
    const classes = studentData
      .map((s) => s.class)
      .filter((id): id is string => !!id);
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

  const unlinkedCount = useMemo(
    () =>
      studentData.filter((s) => !s.parentIds || s.parentIds.length === 0)
        .length,
    [],
  );

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
        {unlinkedCount > 0 && filters.linkStatus !== "Unlinked" && (
          <div className="mb-6 flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-[24px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <AlertCircle size={20} className="animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">
                  Missing Parent Links
                </p>
                <p className="text-[11px] text-amber-700 font-medium">
                  {unlinkedCount} students have no parents assigned.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleFilterChange("linkStatus", "Unlinked")}
              className="px-4 py-2 bg-white text-amber-700 text-[10px] font-black uppercase rounded-xl border border-amber-200 shadow-sm"
            >
              Filter Unlinked
            </button>
          </div>
        )}
        <div className="mt-8">
          <StudentTable
            students={currentStudents}
            onReset={handleClearFilters}
            parentData={parentData || []}
            studentParentLink={studentParentLink || []}
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
