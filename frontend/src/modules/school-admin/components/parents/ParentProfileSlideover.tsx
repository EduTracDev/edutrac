"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  Mail,
  Users,
  ExternalLink,
  Phone,
  Briefcase,
  Copy,
  Check,
  User,
  UserMinus,
} from "lucide-react";
import { Parent, Student } from "@/modules/types/dashboard";
import { studentData } from "@/modules/constants/dashboard";
import { toast } from "react-hot-toast";

interface Props {
  parent: Parent | null;
  allStudents: Student[]; // Added to ensure we have the latest student list
  isOpen: boolean;
  onClose: () => void;
  onUnlink: (parentId: string, studentId: string) => void;
}

export const ParentProfileSlideover = ({
  parent,
  allStudents,
  isOpen,
  onClose,
  onUnlink,
}: Props) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  if (!parent) return null;

  const handleViewStudent = (studentId: string) => {
    onClose();
    router.push(`/dashboard/students/${studentId}`);
  };

  const initials = parent.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slideover Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Background */}
        <div className="relative h-32 bg-[#923CF9] shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Identity Section */}
        <div className="px-8 -mt-10 relative shrink-0">
          <div className="h-20 w-20 relative rounded-[28px] bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-2xl font-black text-[#923CF9]">
            {parent.avatarUrl && !imageError ? (
              <Image
                src={parent.avatarUrl}
                alt={parent.fullName}
                fill
                className="object-cover"
                sizes="80px"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="uppercase tracking-wider">{initials}</span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-800">
                {parent.fullName}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {parent.occupation} • ID: {parent.id}
              </p>
            </div>
            <span className="px-2 py-1 rounded-md bg-emerald-50 text-[9px] font-black text-emerald-600 uppercase border border-emerald-100">
              {parent.accountStatus}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 px-8 mt-8 space-y-8 overflow-y-auto custom-scrollbar pb-10">
          {/* 1. Contact Details */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Contact Details
            </h3>
            <div className="space-y-2">
              <ContactCard
                icon={<Phone size={14} />}
                label="Mobile"
                value={parent.phoneNumber}
              />
              <ContactCard
                icon={<Mail size={14} />}
                label="Email"
                value={parent.email}
              />
            </div>
          </section>

          {/* 2. Employment/Occupation */}
          <section className="p-4 bg-slate-900 rounded-2xl text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase size={16} className="text-slate-400" />
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  Professional Role
                </p>
                <p className="text-sm font-bold">{parent.occupation}</p>
              </div>
            </div>
          </section>

          {/* 3. Linked Wards Section (The Relational Logic) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={14} /> Registered Wards (
                {parent.studentIds?.length || 0})
              </h3>
            </div>

            <div className="grid gap-2">
              {parent.studentIds?.map((id) => {
                const child = allStudents.find((s) => s.id === id);
                if (!child) return null;

                return (
                  <div
                    key={id}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-[#923CF9]/30 transition-all bg-slate-50/50 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[10px] font-black text-[#923CF9]">
                        {child.firstName[0]}
                        {child.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          {child.firstName} {child.lastName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          {child.class}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewStudent(child.id)}
                        className="p-2 text-slate-300 hover:text-[#923CF9] transition-colors"
                        title="View Profile"
                      >
                        <ExternalLink size={16} />
                      </button>
                      <button
                        onClick={() => onUnlink(parent.id, child.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Unlink Ward"
                      >
                        <UserMinus size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {(!parent.studentIds || parent.studentIds.length === 0) && (
                <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    No wards linked
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

/* Internal Helper Components for Cleanliness */

const ContactCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">
          {label}
        </p>
        <p className="text-xs font-bold text-slate-700">{value}</p>
      </div>
    </div>
    <CopyButton value={value} />
  </div>
);

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg transition-all ${
        copied
          ? "bg-emerald-500 text-white"
          : "text-slate-300 hover:text-[#923CF9] hover:bg-white"
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};
