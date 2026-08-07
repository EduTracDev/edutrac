"use client";
import { use } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { teacherData } from "@/modules/constants/dashboard"; // Ensure you have this constant
import {
  ArrowLeft,
  Mail,
  Phone,
  BookOpen,
  Clock,
  CheckCircle,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function TeacherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 1. Fetch Teacher Data
  const teacher = teacherData.find((t) => t.id === id);

  // 2. Mock Classes Assigned (In a real app, filter from your classData)
  const assignedClasses = [
    {
      id: "101",
      name: "SS 3 Science",
      room: "Lab 2",
      status: "Submitted",
      time: "08:30 AM",
    },
    {
      id: "102",
      name: "SS 1 Alpha",
      room: "Room 4",
      status: "Pending",
      time: "-",
    },
  ];

  if (!teacher) return notFound();

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation */}
        <Link
          href="/school-admin/attendance"
          className="flex items-center gap-2 text-slate-400 hover:text-[#923CF9] transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Profile Header */}
        <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-24 h-24 bg-amber-50 rounded-[24px] flex items-center justify-center text-amber-600 shadow-inner">
            <Briefcase size={40} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 mb-1">
              {teacher.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase">
                Senior Faculty
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Mail size={14} className="text-[#923CF9]" /> {teacher.email}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all">
              Message
            </button>
            <button className="px-6 py-3 bg-[#923CF9] text-white rounded-2xl font-black text-sm shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 transition-all">
              Assign Class
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Assigned Classes & Schedules */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-black text-slate-800 px-2">
              Assigned Classes
            </h2>

            <div className="grid gap-4">
              {assignedClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">
                        {cls.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Location: {cls.room}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p
                        className={`text-[10px] font-black uppercase ${cls.status === "Submitted" ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {cls.status}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold">
                        {cls.time}
                      </p>
                    </div>
                    {cls.status === "Submitted" ? (
                      <CheckCircle className="text-emerald-500" size={20} />
                    ) : (
                      <Clock className="text-amber-500" size={20} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Teacher Stats & Details */}
          <div className="space-y-6">
            <section className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
              <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest text-[10px]">
                Performance Metrics
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Register Accuracy
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[95%]" />
                    </div>
                    <span className="text-xs font-black text-slate-700">
                      95%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Punctuality
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#923CF9] w-[88%]" />
                    </div>
                    <span className="text-xs font-black text-slate-700">
                      88%
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest text-[10px]">
                Employment Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Staff ID
                  </p>
                  <p className="text-xs font-black text-slate-700">
                    {teacher.id}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Joining Date
                  </p>
                  <p className="text-xs font-black text-slate-700">
                    Jan 20, 2022
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
