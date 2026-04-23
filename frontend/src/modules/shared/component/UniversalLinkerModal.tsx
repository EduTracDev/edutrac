"use client";

import React, { useState, useMemo } from "react";
import Modal from "@/modules/shared/component/Modal";
import { Search, UserPlus, Check, User, Users } from "lucide-react";
import { Student, Parent } from "@/modules/types/dashboard";
import Image from "next/image";

// Define a unified interface for the list items
interface LinkableItem {
  id: string;
  primaryText: string;
  secondaryText: string;
  avatarUrl?: string;
  alreadyLinkedIds: string[];
}

interface UniversalLinkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // The 'target' is the entity we are linking TO (e.g., the Parent on the Parent Page)
  targetName: string;
  targetId: string;
  // The 'mode' determines what we are searching for
  mode: "find-student" | "find-parent";
  // The pool of items to search through
  dataPool: (Student | Parent)[];
  onLink: (selectedId: string, relationship: string) => Promise<void>;
}

export const UniversalLinkerModal = ({
  isOpen,
  onClose,
  targetName,
  targetId,
  mode,
  dataPool,
  onLink,
}: UniversalLinkerModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [relationship, setRelationship] = useState("Father");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Normalize data into a standard format for the list
  const availableItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return dataPool
      .map((item) => {
        const isStudent = "studentId" in item;
        return {
          id: item.id,
          primaryText: isStudent
            ? `${(item as Student).firstName} ${(item as Student).lastName}`
            : (item as Parent).fullName,
          secondaryText: isStudent
            ? `${(item as Student).class} • ${(item as Student).studentId}`
            : (item as Parent).email,
          avatarUrl: (item as any).avatarUrl,
          // Check if already linked based on mode
          isLinked: isStudent
            ? (item as Student).parentIds?.includes(targetId)
            : (item as Parent).studentIds?.includes(targetId),
        };
      })
      .filter((item) => {
        const matchesSearch =
          !query ||
          item.primaryText.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query);
        return !item.isLinked && matchesSearch;
      });
  }, [dataPool, searchQuery, targetId]);

  const handleConfirm = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    try {
      await onLink(selectedId, relationship);
      onClose();
      setSelectedId(null);
      setSearchQuery("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Link {mode === "find-student" ? "Student" : "Parent"}'
    >
      <div className="p-6 space-y-6 w-full max-w-md md:min-w-[480px]">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Users className="text-[#923CF9]" size={24} />
            Link {mode === "find-student" ? "Student" : "Parent"}
          </h2>
          <p className="text-sm text-slate-500">
            Connecting to{" "}
            <span className="font-bold text-slate-700">{targetName}</span>
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder={`Search ${mode === "find-student" ? "students" : "parents"}...`}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#923CF9]/20 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {availableItems.length > 0 ? (
            availableItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  selectedId === item.id
                    ? "border-[#923CF9] bg-[#923CF9]/5 shadow-sm"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="relative w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User size={18} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 leading-tight">
                      {item.primaryText}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {item.secondaryText}
                    </p>
                  </div>
                </div>
                {selectedId === item.id && (
                  <div className="w-6 h-6 bg-[#923CF9] rounded-full flex items-center justify-center text-white">
                    <Check size={14} />
                  </div>
                )}
              </button>
            ))
          ) : (
            <p className="text-center py-10 text-slate-400 text-sm italic">
              No linkable results found.
            </p>
          )}
        </div>

        {selectedId && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
              Define Relationship
            </label>
            <select
              className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-[#923CF9]/20 outline-none"
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

        <button
          disabled={!selectedId || isSubmitting}
          onClick={handleConfirm}
          className="w-full py-4 bg-[#923CF9] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <UserPlus size={18} /> <span>Establish Link</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};
