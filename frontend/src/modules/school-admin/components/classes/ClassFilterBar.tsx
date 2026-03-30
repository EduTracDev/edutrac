"use client";

import React, { useState } from "react";
import { LayoutGrid, GraduationCap, School } from "lucide-react";

type ClassCategory = "All" | "Junior" | "Senior" | "Primary";

interface ClassFilterProps {
  activeCategory: ClassCategory;
  onCategoryChange: (category: ClassCategory) => void;
}

export const ClassFilterBar = ({
  activeCategory,
  onCategoryChange,
}: ClassFilterProps) => {
  const categories: {
    id: ClassCategory;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: "All", label: "All Classes", icon: <LayoutGrid size={14} /> },
    { id: "Junior", label: "Junior (JSS)", icon: <School size={14} /> },
    { id: "Senior", label: "Senior (SS)", icon: <GraduationCap size={14} /> },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      {/* Segmented Control */}
      <div className="inline-flex p-1 bg-slate-100 rounded-[20px] w-fit border border-slate-200/50 shadow-inner">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2.5 rounded-[16px] text-xs font-black transition-all duration-300
              ${
                activeCategory === cat.id
                  ? "bg-white text-[#923CF9] shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
              }
            `}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Quick Search inside Filter Bar */}
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
        Showing:{" "}
        <span className="text-[#923CF9]">{activeCategory} Division</span>
      </div>
    </div>
  );
};
