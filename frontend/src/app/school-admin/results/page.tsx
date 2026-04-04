"use client";
import { useState } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { ResultsTable } from "@/modules/school-admin/components/results/ResultsTable";
import { mockResults } from "@/modules/constants/dashboard";
import { SharedPagination } from "@/modules/shared/Pagination";
import { toast } from "react-hot-toast";
import { FlagResultModal } from "@/modules/school-admin/components/dashboard/modals/FlagResultModal";

export default function ApproveResultsPage() {
  const [results, setResults] = useState(mockResults);
  const [flaggingId, setFlaggingId] = useState<string | null>(null);

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

  const handleBulkApprove = (ids: string[]) => {
    setResults((prev) =>
      prev.map((res) =>
        ids.includes(res.id) ? { ...res, status: "Approved" } : res,
      ),
    );
    toast.success(`Approved ${ids.length} results`);
  };
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 1. Header Component */}
        {/* <ApprovalHeader totalPending={42} onBulkApprove={handleBulkApprove} /> */}

        {/* 2. Filter Component */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4">
          {/* <ClassSelector /> */}
          {/* <SubjectSelector /> */}
          {/* <SearchBar /> */}
        </div>

        {/* 3. The Main Table */}
        <section className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
          <ResultsTable results={results} onFlag={handleFlagClick} />
          <FlagResultModal
            isOpen={!!flaggingId}
            onClose={() => setFlaggingId(null)}
            onConfirm={handleConfirmFlag}
            studentName={studentToFlag?.studentName || ""}
          />
        </section>

        {/* 4. Pagination */}
        {/* <SharedPagination /> */}
      </div>
    </AdminLayout>
  );
}
