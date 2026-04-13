"use client";
import React, { useState, useEffect } from "react";
import { AlertCircle, Save } from "lucide-react";
import Modal from "@/modules/school-admin/components/dashboard/Modal";

export interface FlaggedResult {
  id: string;
  studentName: string;
  subject: string;
  currentGrade: string;
  reason: string;
  date: string;
  scores: {
    ca1: number;
    ca2: number;
    exam: number;
  };
}
interface EditResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: FlaggedResult | null;
}

export default function EditResultModal({
  isOpen,
  onClose,
  result,
}: EditResultModalProps) {
  const [form, setForm] = useState<FlaggedResult["scores"]>({
    ca1: 0,
    ca2: 0,
    exam: 0,
  });

  // Sync internal state when a result is selected
  useEffect(() => {
    if (result?.scores) {
      setForm(result.scores);
    }
  }, [result]);

  const handleResubmit = () => {
    if (!result) return;
    console.log(`Updating ${result.id}:`, form);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Correct Result Entry">
      <div className="space-y-6">
        {/* Admin Feedback Header */}
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3">
          <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-black text-red-600 block mb-1">
              Feedback from Admin
            </span>
            <p className="text-slate-600 italic">"{result?.reason}"</p>
          </div>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">
                {key}
              </label>
              <input
                type="number"
                value={form[key as keyof typeof form]}
                onChange={(e) =>
                  setForm({ ...form, [key]: Number(e.target.value) })
                }
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#923CF9] focus:bg-white transition-all outline-none"
              />
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-sm font-black text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleResubmit}
            className="flex-1 bg-[#923CF9] text-white px-6 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-[#8126e8] shadow-lg shadow-purple-200 transition-all"
          >
            <Save size={18} />
            Resubmit
          </button>
        </div>
      </div>
    </Modal>
  );
}
