"use client";
import { useMemo, useState } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { ResultsTable } from "@/modules/school-admin/components/results/ResultsTable";
import { mockResults } from "@/modules/constants/dashboard";
import { SharedPagination } from "@/modules/shared/Pagination";
import { toast } from "react-hot-toast";
import { FlagResultModal } from "@/modules/school-admin/components/dashboard/modals/FlagResultModal";
import { ResultsActionBar } from "@/modules/school-admin/components/results/ResultsActionBar";
import { ResultFilterState } from "@/modules/school-admin/components/results/ResultsActionBar";
import { ClassStatsHeader } from "@/modules/school-admin/components/results/ClassStatsHeader";
import { ResultBulkActions } from "@/modules/school-admin/components/results/ResultBulkActions";

export default function Page() {
  const [results, setResults] = useState(mockResults);
  const [flaggingId, setFlaggingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<ResultFilterState>({
    search: "",
    class: "",
    status: "All",
  });

  const filteredResults = useMemo(() => {
    return results.filter((res) => {
      const matchesSearch = res.studentName
        .toLowerCase()
        .includes(filters.search?.toLowerCase() || "");

      const matchesClass = filters.class ? res.class === filters.class : true;

      const matchesStatus =
        filters.status !== "All" ? res.status === filters.status : true;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [results, filters]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const handleFilterChange = (newFilters: Partial<ResultFilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  // Get unique classes for the filter dropdown
  const availableClasses = useMemo(() => {
    return Array.from(new Set(results.map((r) => r.class)));
  }, [results]);

  // Find the student currently being flagged
  const studentToFlag = results.find((r) => r.id === flaggingId);

  const handleFlagClick = (id: string) => {
    setFlaggingId(id); // Opens the modal
  };

  const handleConfirmFlag = (reason: string) => {
    if (!flaggingId) return;

    // Update the local state (in a real app, this is an API call)
    setResults((prev) =>
      prev.map((res) =>
        res.id === flaggingId
          ? { ...res, status: "Flagged", adminComment: reason }
          : res,
      ),
    );

    toast.success("Result flagged and sent back to teacher", {
      icon: "🚩",
    });
  };

  const handleApprove = (id: string) => {
    setResults((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: "Approved" } : res)),
    );
    toast.success("Result approved");
  };

  const handleBulkApprove = () => {
    setResults((prev) =>
      prev.map((res) =>
        selectedIds.includes(res.id) ? { ...res, status: "Approved" } : res,
      ),
    );
    setSelectedIds([]); // Reset selection after approval
    toast.success(`Successfully approved ${selectedIds.length} results!`);
  };
  // 1. Individual Selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // 2. Select All (based on currently visible/filtered results)
  const handleSelectAll = () => {
    if (selectedIds.length === filteredResults.length) {
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(filteredResults.map((r) => r.id)); // Select only visible
    }
  };
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 1. Header Component */}
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Grade Review
          </h1>
          <p className="text-slate-500 font-medium">
            JSS 3 Gold — Mathematics (First Term)
          </p>
        </div>
        <ClassStatsHeader
          average={68}
          highest={98}
          lowest={24}
          pendingCount={12}
        />
        {/* 2. Filter Component */}
        <ResultsActionBar
          selectedCount={selectedIds.length}
          onBulkApprove={handleBulkApprove}
          onBulkGenerate={() => console.log("Generating PDFs...")}
          onClearSelection={() => setSelectedIds([])}
          availableClasses={availableClasses}
          onFilterChange={handleFilterChange}
        />

        {/* 3. The Main Table */}
        <section className="bg-white rounded-4xl border border-slate-100 overflow-hidden">
          <ResultsTable
            results={currentResults}
            selectedIds={selectedIds}
            onSelect={toggleSelect} // Use handler from parent
            onSelectAll={handleSelectAll}
            onApprove={handleApprove}
            onFlag={handleFlagClick}
            onViewReport={(id) => console.log("Viewing...", id)}
          />
          <FlagResultModal
            isOpen={!!flaggingId}
            onClose={() => setFlaggingId(null)}
            onConfirm={handleConfirmFlag}
            studentName={studentToFlag?.studentName || ""}
          />
        </section>

        {/* 4. Pagination */}
        {filteredResults.length > itemsPerPage && (
          <SharedPagination
            entityName="results"
            totalItems={filteredResults.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}
