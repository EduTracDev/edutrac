"use client";
import { useState } from "react";
import {
  MoreHorizontal,
  UserCheck,
  UserMinus,
  Trash2,
  Edit3,
  Send,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Teacher } from "@/modules/types/dashboard";
import Image from "next/image";

interface Props {
  teacher: Teacher;
  onViewProfile: (id: string) => void;
  onEdit: () => void;
}

export const TeacherTableRow = ({ teacher, onViewProfile, onEdit }: Props) => {
  const isActive = teacher.employmentStatus === "Active";
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isResending, setIsResending] = useState(false);

  const handleResendInvite = async (id: string) => {
    setIsResending(true);

    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve({ name: teacher.name });
        } catch (err) {
          reject(err);
        }
      }, 1500);
    });

    toast.promise(promise, {
      loading: "Sending new invite...",
      success: "Invite sent successfully!",
      error: "Failed to send invite.",
    });

    try {
      await promise;
    } finally {
      setIsResending(false);
      setMenuOpen(false);
    }
  };

  const initials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <tr
      onClick={() => onViewProfile(teacher.id)}
      className="hover:bg-slate-50 transition cursor-pointer border-b border-slate-50"
    >
      {/* Name and Avatar Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 relative rounded-2xl overflow-hidden bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold shrink-0">
            {teacher.avatarUrl && !imageError ? (
              <Image
                src={teacher.avatarUrl}
                alt={teacher.name}
                fill
                className="object-cover"
                sizes="44px"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-sm uppercase tracking-wider">
                {initials}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{teacher.name}</p>
            <p className="text-[11px] text-slate-400 font-medium">
              ID: {teacher.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-slate-600">
          {teacher.subject}
        </p>
      </td>

      <td className="px-6 py-4">
        <p className="text-[11px] text-[#923CF9] font-black uppercase tracking-tight">
          {teacher.role}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 px-1">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              teacher.accountStatus === "Joined"
                ? "bg-emerald-400"
                : teacher.accountStatus === "Pending"
                  ? "bg-amber-400 animate-pulse"
                  : "bg-slate-300"
            }`}
          />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            {teacher.accountStatus}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider w-fit
          ${
            isActive
              ? "text-emerald-600 bg-emerald-50 border-emerald-100"
              : "text-amber-600 bg-amber-50 border-amber-100"
          }`}
        >
          {isActive ? <UserCheck size={12} /> : <UserMinus size={12} />}
          {teacher.employmentStatus}
        </div>
      </td>

      <td className="relative px-6 py-4 text-right">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#923CF9] transition-colors"
        >
          <MoreHorizontal size={18} />
        </button>

        {/* The Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-6 top-14 z-50 w-48 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
            >
              <Edit3 size={14} /> Edit Information
            </button>

            {/* 🚀 Resend Invite (Placed inside the menu) */}
            {teacher.accountStatus !== "Joined" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResendInvite(teacher.id);
                }}
                disabled={isResending}
                className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#923CF9] hover:bg-[#923CF9]/5 flex items-center gap-2 disabled:opacity-50"
              >
                <Send
                  size={14}
                  className={isResending ? "animate-pulse" : ""}
                />
                {isResending ? "Sending..." : "Resend Invitation"}
              </button>
            )}

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
