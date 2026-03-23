"use client";
import { useState } from "react";
import Image from "next/image";

import {
  MoreHorizontal,
  UserCheck,
  UserMinus,
  Trash2,
  Edit3,
} from "lucide-react";

import { Teacher } from "@/modules/types/dashboard";

interface Props {
  teacher: Teacher;
  onView?: () => void;
  onEdit: () => void;
  onViewProfile: (id: string) => void;
}

export const TeacherMobileCard = ({
  teacher,
  onView,
  onEdit,
  onViewProfile,
}: Props) => {
  const isActive = teacher.status === "Active";
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={() => onViewProfile(teacher.id)}
      className="relative bg-white border border-slate-100 rounded-2xl p-4 mb-3 shadow-sm cursor-pointer active:scale-[0.99] transition"
    >
      <div className="flex items-center gap-3">
        {/* 🖼️ NEW: Avatar Container */}
        <div className="h-11 w-11 relative rounded-2xl overflow-hidden bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold">
          {teacher.avatarUrl && !imageError ? (
            <Image
              src={teacher.avatarUrl}
              alt={teacher.name}
              fill // Use 'fill' for parent-relative sizing in Next.js
              className="object-cover"
              sizes="44px" // Optimization: tells Next.js exactly how small this image is
              priority={false}
              onError={() => setImageError(true)} // Set state on error
            />
          ) : (
            // Fallback shows if there's no URL OR if the image fails to load
            <span className="text-sm uppercase tracking-wider">{initials}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">{teacher.name}</p>
          <p className="text-xs text-slate-400">ID: {teacher.id}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <div>
          <p className="text-xs text-slate-400 font-bold">SUBJECT</p>
          <p className="text-sm font-semibold">{teacher.subject}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 font-bold">ROLE</p>
          <p className="text-sm font-semibold">{teacher.role}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold
${
  isActive
    ? "text-emerald-600 bg-emerald-50 border-emerald-100"
    : "text-amber-600 bg-amber-50 border-amber-100"
}`}
        >
          {isActive ? <UserCheck size={12} /> : <UserMinus size={12} />}

          {teacher.status}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#923CF9]"
        >
          <MoreHorizontal size={18} />
        </button>

        {/* The Dropdown Menu */}

        {menuOpen && (
          <div
            // Stop clicks inside the menu from triggering onView card click
            onClick={(e) => e.stopPropagation()}
            className="absolute right-12 top-12 z-[100] w-48 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              onClick={(e) => {
                e.stopPropagation(); // Double safety
                onEdit();
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
            >
              <Edit3 size={14} /> Edit Information
            </button>
            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-amber-600 hover:bg-amber-50 flex items-center gap-2">
              <UserMinus size={14} /> Suspend Access
            </button>

            <div className="my-1 border-t border-slate-50" />

            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
              <Trash2 size={14} /> Delete Teacher
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
