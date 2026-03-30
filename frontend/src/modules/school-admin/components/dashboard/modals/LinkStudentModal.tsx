"use client";

import React, { useState, useMemo } from "react";
import { Modal } from "@/modules/shared/component/modal";
import { Search, UserPlus, Check, User } from "lucide-react";
import { Student, Parent } from "@/modules/types/dashboard";
import Image from "next/image";

interface LinkStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLink: (studentId: string, relationship: string) => Promise<void>;
  allStudents: Student[];
  parent: Parent;
}

export const LinkStudentModal = ({
  isOpen,
  onClose,
  onLink,
  allStudents,
  parent,
}: LinkStudentModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [relationship, setRelationship] = useState("Father");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableStudents = useMemo(() => {
    return allStudents.filter((student) => {
      // Logic: Ensure we don't show students already linked
      const isAlreadyLinked = parent.studentIds?.includes(student.id);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.studentId.toLowerCase().includes(query);

      return !isAlreadyLinked && matchesSearch;
    });
  }, [allStudents, parent.studentIds, searchQuery]);

  const handleConfirm = async () => {
    if (!selectedStudentId) return;
    setIsSubmitting(true);
    try {
      await onLink(selectedStudentId, relationship);
      onClose();
      setSelectedStudentId(null);
      setSearchQuery("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Set a consistent width here */}
      <div className="p-6 space-y-6 w-full max-w-md md:min-w-[450px]">
        <div>
          <h2 className="text-xl font-black text-slate-800">Link Student</h2>
          <p className="text-sm text-slate-500">
            Connect a new ward to {parent.fullName}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or Student ID..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#923CF9]/20 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results List - Restored the UI so names actually show up */}
        <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {availableStudents.length > 0 ? (
            availableStudents.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedStudentId(student.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  selectedStudentId === student.id
                    ? "border-[#923CF9] bg-[#923CF9]/5"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                    {student.avatarUrl ? (
                      <Image
                        src={student.avatarUrl}
                        alt={student.firstName}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-700">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {student.class} • {student.studentId}
                    </p>
                  </div>
                </div>
                {selectedStudentId === student.id && (
                  <div className="w-6 h-6 bg-[#923CF9] rounded-full flex items-center justify-center text-white shrink-0">
                    <Check size={14} />
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-slate-400 text-sm">
                No available students found.
              </p>
            </div>
          )}
        </div>

        {/* Relationship Picker */}
        {selectedStudentId && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
              Relationship
            </label>
            <select
              className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-[#923CF9]/20 transition-all outline-none cursor-pointer"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
              <option value="Sibling">Sibling</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={!selectedStudentId || isSubmitting}
          onClick={handleConfirm}
          className="w-full py-4 bg-[#923CF9] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <UserPlus size={18} />
              <span>Link Student to Parent</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};
