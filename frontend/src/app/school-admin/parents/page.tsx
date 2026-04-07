"use client";

import { useState, useMemo } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { ParentStats } from "@/modules/school-admin/components/parents/ParentStats";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { ParentTable } from "@/modules/school-admin/components/parents/ParentTable";
import { parentData, studentData } from "@/modules/constants/dashboard";
import { AddParentModal } from "@/modules/school-admin/components/dashboard/modals/AddParentModal";
import { SharedPagination } from "@/modules/shared/Pagination";
import { ParentActionBar } from "@/modules/school-admin/components/parents/ParentActionBar";
import { ParentFilters } from "@/modules/types/dashboard";

export default function Page() {
  const { activeModal, closeModal } = useModals();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [parents, setParents] = useState(parentData);

  const initialFilters: ParentFilters = {
    searchQuery: "",
    accountStatus: "All",
    relationship: "All",
    occupation: "All",
    linkedStudentCount: "All",
  };
  const [filters, setFilters] = useState<ParentFilters>(initialFilters);

  // Handler for dropdown/select changes
  const handleFilterChange = (type: keyof ParentFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // Reset function
  const handleClearFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
  };
  const filteredParents = useMemo(() => {
    // Use the 'parents' state here, not the 'parentData' constant
    return parents.filter((parent) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        parent.fullName.toLowerCase().includes(query) ||
        parent.email.toLowerCase().includes(query) ||
        parent.phoneNumber.includes(query);

      const matchesStatus =
        filters.accountStatus === "All" ||
        parent.accountStatus === filters.accountStatus;

      const childrenCount = parent.studentIds.length;
      let matchesFamilySize = true;

      if (filters.linkedStudentCount === "0") {
        matchesFamilySize = childrenCount === 0;
      } else if (filters.linkedStudentCount === "1") {
        matchesFamilySize = childrenCount === 1;
      } else if (filters.linkedStudentCount === "Multiple") {
        matchesFamilySize = childrenCount >= 2;
      }

      return matchesSearch && matchesStatus && matchesFamilySize;
    });
  }, [searchQuery, filters, parents]); // The WHOLE filter is memoized once

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParents = filteredParents.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const {
    isSubmitting,
    handleParentSubmit,
    handleBulkParentSubmit,
    formErrors,
    parentBulkErrors,
    clearErrors,
  } = useDashboardForms();

  return (
    <AdminLayout>
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900">
            Parent Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your student population and enrollment details.
          </p>
        </div>
        {/* parent stat */}

        <ParentStats />
        <div className=" mt-8">
          <p className="text-xs font-medium text-slate-500">
            Showing{" "}
            <span className="text-[#923CF9] font-bold">
              {filteredParents.length}
            </span>
            {filteredParents.length === 1 ? " parent" : " parents"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        <div className="mt-8">
          <ParentActionBar
            onSearch={setSearchQuery}
            activeFilters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="mt-8">
          <ParentTable
            parents={currentParents}
            allStudents={studentData}
            onEdit={(t) => console.log("Edit", t)}
            onViewProfile={(id) => console.log("View", id)}
            onReset={() => setSearchQuery("")}
            setParents={setParents}
          />

          <SharedPagination
            entityName="teacher"
            totalItems={filteredParents.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
        </div>
        {/* AddParentModal */}
        <AddParentModal
          isOpen={activeModal === "parent"}
          onClose={closeModal}
          onSubmit={handleParentSubmit}
          onBulkSubmit={handleBulkParentSubmit}
          errors={formErrors}
          isSubmitting={isSubmitting}
          parentBulkErrors={parentBulkErrors}
          clearErrors={clearErrors}
        />
      </div>
    </AdminLayout>
  );
}
