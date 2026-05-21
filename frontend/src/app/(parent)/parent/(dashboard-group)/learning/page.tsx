"use client";

import { useWard } from "@/modules/context/WardContext";
import { AssignmentCard } from "@/modules/parent/components/learning/AssignmentCard";
import { SubmitAssignmentModal } from "@/modules/parent/components/learning/SubmitAssignmentModal";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/modules/shared/EmptyState";
import { ClipboardCheck } from "lucide-react";

interface AssignmentTask {
  id: string;
  title: string;
  subject: string;
}

export default function Page() {
  const { activeWard } = useWard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pendingAssignments = [];
  const [activeTask, setActiveTask] = useState<AssignmentTask | null>(null);

  const handleOpenSubmit = (task: AssignmentTask) => {
    setActiveTask(task);
    setIsModalOpen(true);
  };

  if (!activeWard) return null;

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Learning Hub</h1>
          <p className="text-slate-400 font-medium">
            Current curriculum and tasks for{" "}
            <span className="text-[#923CF9] font-bold">{activeWard.name}</span>
          </p>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
          <Calendar size={16} className="text-[#923CF9]" />
          View Class Timetable
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Pending Assignments
            </h2>
            <span className="bg-[#923CF9]/10 text-[#923CF9] text-[10px] font-black px-2 py-0.5 rounded-md">
              4 Total
            </span>
          </div>
          {pendingAssignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AssignmentCard
                subject="Mathematics"
                title="Quadratic Equations: Exercise 4.2"
                dueDate="Tomorrow, 8:00 AM"
                status="pending"
                onAction={() =>
                  handleOpenSubmit({
                    id: "1",
                    title: "Quadratic Equations",
                    subject: "Mathematics",
                  })
                }
              />
              <AssignmentCard
                subject="English Language"
                title="Argumentative Essay: The Role of AI"
                dueDate="Friday, 12:00 PM"
                status="pending"
                onAction={() =>
                  handleOpenSubmit({
                    id: "2",
                    title: "Argumentative Essay",
                    subject: "English Language",
                  })
                }
              />
            </div>
          ) : (
            <EmptyState
              icon={ClipboardCheck}
              title="All Caught Up!"
              description={`There are no pending assignments for ${activeWard.name} at the moment. Check back later for new classwork.`}
              actionLabel="Refresh Tasks"
              onActionClick={() => window.location.reload()}
              isSearch={false}
            />
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Today&apos;s Subjects
          </h2>
          <div className="bg-white border border-slate-100 rounded-[40px] p-6 space-y-4 shadow-sm">
            {[
              { time: "08:00", subject: "Further Maths", room: "Lab 2" },
              { time: "10:00", subject: "Physics", room: "Hall A" },
              { time: "12:00", subject: "Lunch Break", room: "Cafeteria" },
              { time: "01:00", subject: "Literature", room: "Room 12" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#923CF9] transition-colors">
                  {item.time}
                </span>
                <div className="h-8 w-[2px] bg-slate-50 rounded-full" />
                <div>
                  <p className="text-xs font-black text-slate-700">
                    {item.subject}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400">
                    {item.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SubmitAssignmentModal
        isOpen={isModalOpen}
        assignment={activeTask}
        onClose={() => {
          setIsModalOpen(false);
          setActiveTask(null);
        }}
      />
    </div>
  );
}
