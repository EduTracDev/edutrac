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
import { Parent, Student } from "@/modules/types/dashboard";
import Image from "next/image";

interface Props {
  parent: Parent;
  allStudents: Student[];
  onLinkStudent: (parentId: string) => void;
  onViewProfile: (id: string) => void;
  onEdit: () => void;
}

export const ParentTableRow = ({
  parent,
  allStudents,
  onLinkStudent,
  onViewProfile,
  onEdit,
}: Props) => {
  const isActive = parent.employmentStatus === "Active";
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isResending, setIsResending] = useState(false);
  const children = allStudents.filter((s) => parent.studentIds.includes(s.id));

  const handleResendInvite = async (id: string) => {
    setIsResending(true);

    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve({ name: parent.fullName });
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

  const initials = parent.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <tr
      onClick={() => onViewProfile(parent.id)}
      className="hover:bg-slate-50 transition cursor-pointer border-b border-slate-50"
    >
      {/* Name and Avatar Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 relative rounded-2xl overflow-hidden bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold shrink-0">
            {parent.avatarUrl && !imageError ? (
              <Image
                src={parent.avatarUrl}
                alt={parent.fullName}
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
          <div className="whitespace-nowrap">
            <p className="text-sm font-bold text-slate-800">
              {parent.fullName}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              ID: {parent.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-slate-600">{parent.email}</p>
      </td>

      <td className="px-6 py-4">
        <p className="text-[11px] text-[#923CF9] font-black uppercase tracking-tight">
          {parent.phoneNumber}
        </p>
      </td>
      <td className="px-6 py-4">
        <p className="text-[11px] text-[#923CF9] font-black uppercase tracking-tight ">
          {parent.emergencyContact}
        </p>
      </td>
      <td className="px-6 py-4">
        <p className="text-[11px] text-[#923CF9] font-black uppercase tracking-tight">
          {parent.occupation}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg flex items-center justify-center text-xs font-black text-slate-600">
            {children.length}
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
            {children.length === 1 ? "Child" : "Children"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 px-1">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              parent.accountStatus === "Joined"
                ? "bg-emerald-400"
                : parent.accountStatus === "Pending"
                  ? "bg-amber-400 animate-pulse"
                  : "bg-slate-300"
            }`}
          />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            {parent.accountStatus}
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
          {parent.employmentStatus}
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
                onLinkStudent(parent.id); // Triggers a "Search Students" modal
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
            >
              <UserCheck size={14} className="text-emerald-500" />
              Link to Student
            </button>

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

            {/*  Resend Invite  */}
            {parent.accountStatus !== "Joined" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResendInvite(parent.id);
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
              <Trash2 size={14} /> Delete Parent
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
