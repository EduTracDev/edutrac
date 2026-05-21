"use client";

import { useState } from "react";
import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import { Plus, Search, Filter, BookOpen } from "lucide-react";
import { AssignmentStats } from "@/modules/teacher/components/assignments/AssignmentStats";
import { AssignmentCard } from "@/modules/teacher/components/assignments/AssignmentCard";
import { AssignmentCreator } from "@/modules/teacher/components/assignments/AssignmentCreator";
import { Assignment } from "@/modules/types/dashboard";
import { AssignmentFormData } from "@/utils/validation";

const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "1",
    title: "Quadratic Equations Lab",
    subject: "Mathematics",
    class: "SS 3 Science",
    dueDate: "2026-04-20",
    status: "Published",
    points: 20,
    submissions: { turnedIn: 24, total: 30, graded: 12 },
  },
  {
    id: "2",
    title: "Poetry Analysis: Wole Soyinka",
    subject: "English Literature",
    class: "SS 2 Art",
    dueDate: "2026-04-22",
    status: "Published",
    points: 15,
    submissions: { turnedIn: 5, total: 28, graded: 0 },
  },
];

export default function AssignmentPage() {
  const [assignments, setAssignments] =
    useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveAssignment = async (data: AssignmentFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newAssignment: Assignment = {
      id: Math.random().toString(),
      title: data.title,
      subject: "General",
      class: data.targetClass,
      dueDate: data.dueDate,
      status: "Published",
      points: data.points,
      submissions: { turnedIn: 0, total: 30, graded: 0 },
    };

    setAssignments((prev) => [newAssignment, ...prev]);
    setIsCreating(false);
  };

  // This calculates a new list every time 'assignments' or 'searchQuery' changes.
  const filteredAssignments = assignments.filter((assignment) => {
    const search = searchQuery.toLowerCase();
    return (
      assignment.title.toLowerCase().includes(search) ||
      assignment.class.toLowerCase().includes(search) ||
      assignment.subject.toLowerCase().includes(search)
    );
  });

  return (
    <TeacherLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Assignments
            </h1>
            <p className="text-slate-500 font-medium">
              Manage tasks and grade submissions across your classes.
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#923CF9] text-white rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-200 hover:scale-105 transition-all"
          >
            <Plus size={18} /> Create New Task
          </button>
        </div>

        {/* Stats Overview */}
        <AssignmentStats assignments={assignments} />

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by assignment title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/10 font-medium text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-xs uppercase">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-slate-800 font-black uppercase text-xs tracking-widest">
                No Assignments Found
              </h3>
              <p className="text-slate-400 text-[10px] font-medium mt-1">
                Try adjusting your search or create a new task.
              </p>
            </div>
          )}
        </div>

        {/* Overlay Creator - Only shows when isCreating is true */}
        {isCreating && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl my-auto">
              <AssignmentCreator
                onCancel={() => setIsCreating(false)}
                onSave={handleSaveAssignment}
                availableClasses={["SS 3 Science", "SS 2 Art", "JSS 1 Gold"]}
              />
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
