"use client";
import { useState } from "react";

import {
  MoreHorizontal,
  UserCheck,
  UserMinus,
  Trash2,
  Edit3,
} from "lucide-react";

import { Teacher } from "@/modules/types/dashboard";
import Image from "next/image";

interface Props {
  teacher: Teacher;
  onViewProfile: (id: string) => void;
  onEdit: () => void;
}

export const TeacherTableRow = ({ teacher, onViewProfile, onEdit }: Props) => {
  const isActive = teacher.status === "Active";
  const [imageError, setImageError] = useState(false);

  const initials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <tr
      onClick={() => onViewProfile(teacher.id)}
      className="hover:bg-slate-50 transition cursor-pointer"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
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
              <span className="text-sm uppercase tracking-wider">
                {initials}
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-bold">{teacher.name}</p>

            <p className="text-xs text-slate-400">ID: {teacher.id}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-semibold">{teacher.subject}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-xs text-[#923CF9] font-bold uppercase">
          {teacher.role}
        </p>
      </td>
      <td className="px-6 py-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold w-fit
${
  isActive
    ? "text-emerald-600 bg-emerald-50 border-emerald-100"
    : "text-amber-600 bg-amber-50 border-amber-100"
}`}
        >
          {isActive ? <UserCheck size={14} /> : <UserMinus size={14} />}

          {teacher.status}
        </div>
      </td>

      <td className="relative px-6 py-4 text-right">
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
          <div className="absolute right-6 top-14 z-50 w-48 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
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
      </td>
    </tr>
  );
};
