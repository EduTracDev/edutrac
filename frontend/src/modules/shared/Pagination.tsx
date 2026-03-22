"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";

interface SharedPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
  /* Add a 'label' prop to customize the screen reader context */
  entityName: string;
}

export const SharedPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  entityName,
}: SharedPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null; // Hide pagination if no data

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2 py-4 border-t border-slate-50 mt-2">
      {/* Results Counter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
          <ListFilter size={14} className="text-slate-400" />
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-transparent text-[11px] font-black text-slate-600 outline-none cursor-pointer"
            aria-label={`Rows per ${entityName} page`}
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Showing{" "}
          <span className="text-slate-900">
            {startItem}-{endItem}
          </span>{" "}
          of <span className="text-slate-900">{totalItems}</span>
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2.5 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-[#923CF9] hover:border-[#923CF9]/20 disabled:opacity-30 transition-all active:scale-90"
          aria-label={`Previous ${entityName} page`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-2xl text-xs font-black transition-all ${
                  isActive
                    ? "bg-[#923CF9] text-white shadow-lg shadow-[#923CF9]/20"
                    : "bg-white text-slate-400 hover:bg-slate-50 border border-transparent hover:border-slate-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2.5 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-[#923CF9] hover:border-[#923CF9]/20 disabled:opacity-30 transition-all active:scale-90"
          aria-label={`Next ${entityName} page`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
