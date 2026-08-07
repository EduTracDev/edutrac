// @/modules/teacher/pages/AssignmentSubmissionsPage.tsx
"use client";

import { use, useState } from "react";
import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import { GradingOverlay } from "@/modules/teacher/components/assignments/GradingOverlay";
import {
  ArrowLeft,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface Submission {
  studentId: string;
  studentName: string;
  status: "Graded" | "Pending" | "Missing" | "Late";
  submittedAt?: string;
  grade?: number;
}
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AssignmentSubmissions({ params }: PageProps) {
  const resolvedParams = use(params);
  const assignmentId = resolvedParams.id;
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  // Mock data for the specific assignment
  const assignmentInfo = {
    title: "Quadratic Equations Lab",
    class: "SS 3 Science",
    totalPoints: 20,
  };

  const [submissions] = useState<Submission[]>([
    {
      studentId: "1",
      studentName: "Chioma Adebayo",
      status: "Graded",
      submittedAt: "Apr 12, 10:20 AM",
      grade: 18,
    },
    {
      studentId: "2",
      studentName: "Emeka Obi",
      status: "Pending",
      submittedAt: "Apr 14, 02:15 PM",
    },
    {
      studentId: "3",
      studentName: "Fatima Musa",
      status: "Late",
      submittedAt: "Apr 15, 09:00 AM",
    },
    { studentId: "4", studentName: "Tunde Bakare", status: "Missing" },
  ]);

  return (
    <TeacherLayout>
      <div className="max-w-6xl mx-auto pb-20">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link
            href="/teacher/assignments"
            className="flex items-center gap-2 text-slate-400 hover:text-[#923CF9] font-black text-[10px] uppercase tracking-widest transition-colors mb-4"
          >
            <ArrowLeft size={14} /> Back to Assignments
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="px-3 py-1 bg-[#923CF9]/10 text-[#923CF9] text-[10px] font-black uppercase tracking-widest rounded-lg">
                {assignmentInfo.class}
              </span>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-2">
                {assignmentInfo.title}
              </h1>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Total Points
                </p>
                <p className="text-xl font-black text-slate-800">
                  {assignmentInfo.totalPoints}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions List Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="font-black text-slate-800 text-sm uppercase tracking-widest">
              Student Submissions
            </h2>
            <div className="relative w-full md:w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Find a student..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#923CF9]/10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Student
                  </th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Date Submitted
                  </th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Grade
                  </th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {submissions.map((sub) => (
                  <tr
                    key={sub.studentId}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                          {sub.studentName.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-700 text-sm">
                          {sub.studentName}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="p-6 text-xs font-medium text-slate-500">
                      {sub.submittedAt || "—"}
                    </td>
                    <td className="p-6">
                      {sub.grade ? (
                        <span className="font-black text-slate-800">
                          {sub.grade}
                          <span className="text-slate-400">
                            /{assignmentInfo.totalPoints}
                          </span>
                        </span>
                      ) : (
                        <span className="text-slate-300 italic text-xs">
                          Not graded
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      {sub.status !== "Missing" ? (
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="px-4 py-2 bg-[#923CF9] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-purple-100 hover:scale-105 transition-all"
                        >
                          Review
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl cursor-not-allowed">
                          N/A
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedSubmission && (
              <GradingOverlay
                studentName={selectedSubmission.studentName}
                submissionDate={selectedSubmission.submittedAt || ""}
                fileName="student_work_submission.pdf" // This would come from your DB
                totalPoints={assignmentInfo.totalPoints}
                onClose={() => setSelectedSubmission(null)}
                onSave={(grade, feedback) => {
                  console.log("Saving grade:", grade, "Feedback:", feedback);
                  setSelectedSubmission(null);
                  // Here you would trigger your Firebase/Django update
                }}
              />
            )}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}

// Helper component for the Status column
const StatusBadge = ({ status }: { status: Submission["status"] }) => {
  const configs = {
    Graded: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: CheckCircle,
    },
    Pending: { color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
    Late: { color: "text-orange-600", bg: "bg-orange-50", icon: AlertCircle },
    Missing: { color: "text-red-600", bg: "bg-red-50", icon: AlertCircle },
  };

  const { color, bg, icon: Icon } = configs[status];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${bg} ${color}`}
    >
      <Icon size={12} />
      <span className="text-[10px] font-black uppercase tracking-widest">
        {status}
      </span>
    </div>
  );
};
