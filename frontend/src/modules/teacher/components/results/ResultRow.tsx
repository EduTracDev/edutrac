"use client";

import { Student } from "@/modules/types/dashboard";
import { useState } from "react";

interface ScoreInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  max: number;
  studentId: string;
}

interface ResultRowProps {
  student: Student;
  scores: { ca1: string; ca2: string; exam: string };
  onScoreChange: (category: "ca1" | "ca2" | "exam", value: string) => void;
}

export const ResultRow = ({
  student,
  scores,
  onScoreChange,
}: ResultRowProps) => {
  const total = Number(scores.ca1) + Number(scores.ca2) + Number(scores.exam);

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex items-center gap-4 lg:w-1/4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black border border-slate-100 uppercase">
            {student.firstName[0]}
          </div>
          <div className="min-w-0">
            <h3 className="font-black text-slate-800 truncate">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              ID: {student.id}
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-3 md:gap-6">
          <ScoreInput
            label="CA 1"
            value={scores.ca1}
            onChange={(v) => onScoreChange("ca1", v)}
            max={20}
            studentId={student.id}
          />
          <ScoreInput
            label="CA 2"
            value={scores.ca2}
            onChange={(v) => onScoreChange("ca2", v)}
            max={20}
            studentId={student.id}
          />
          <ScoreInput
            label="Exam"
            value={scores.exam}
            onChange={(v) => onScoreChange("exam", v)}
            max={60}
            studentId={student.id}
          />
        </div>

        {/* Total Display */}
        <div className="lg:w-32 text-center bg-slate-50 p-3 rounded-2xl">
          <span className="text-[10px] font-black text-slate-400 uppercase">
            Total
          </span>
          <p className="text-xl font-black text-[#923CF9]">{total || 0}</p>
        </div>
      </div>
    </div>
  );
};

const ScoreInput = ({
  label,
  value,
  onChange,
  max,
  studentId,
}: ScoreInputProps) => (
  <div className="space-y-2">
    <label
      htmlFor={`${studentId}-${label}`}
      className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
    >
      {label} <span className="text-slate-300">/ {max}</span>
    </label>
    <input
      id={`${studentId}-${label}`}
      type="number"
      min="0"
      max={max}
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (val === "" || (Number(val) <= max && Number(val) >= 0)) {
          onChange(val);
        }
      }}
      placeholder="0"
      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 text-sm font-black text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-[#923CF9] transition-all text-center"
    />
  </div>
);
