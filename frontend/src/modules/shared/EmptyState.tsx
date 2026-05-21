"use client";

import React from "react";
import { SearchX, UserPlus, RefreshCcw, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  onActionClick?: () => void;
  actionLabel?: string;
  onReset?: () => void;
  isSearch?: boolean;
  icon?: LucideIcon;
}

export const EmptyState = ({
  title,
  description,
  onActionClick,
  actionLabel,
  onReset,
  isSearch = true,
  icon: Icon = SearchX,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-white rounded-[32px] border border-dashed border-slate-200 animate-in fade-in zoom-in-95 duration-500">
      {/* Icon with "Nexus" styling */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#923CF9]/10 blur-2xl rounded-full" />
        <div className="relative bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm">
          <Icon className="text-[#923CF9]" size={48} strokeWidth={1.5} />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-sm space-y-2">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-2xl transition-all"
          >
            <RefreshCcw size={18} />
            Clear Filters
          </button>
        )}

        {onActionClick && actionLabel && (
          <button
            onClick={onActionClick}
            className="flex items-center gap-2 px-8 py-3 bg-[#923CF9] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#923CF9]/20 hover:bg-[#7b2cd6] hover:-translate-y-0.5 transition-all"
          >
            <UserPlus size={18} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
