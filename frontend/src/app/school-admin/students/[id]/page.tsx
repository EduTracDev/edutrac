// app/school-admin/students/[id]/page.tsx
"use client";
import { use } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import {
  studentData,
  studentParentLink,
  parentData,
} from "@/modules/constants/dashboard";
import { ArrowLeft, Mail, Phone, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 1. Fetch Data
  const student = studentData.find((s) => s.id === id);
  const link = studentParentLink.find((l) => l.studentId === id);
  const parent = parentData.find((p) => p.id === link?.parentId);

  if (!student) return notFound();

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation */}
        <Link
          href="/school-admin/attendance"
          className="flex items-center gap-2 text-slate-400 hover:text-[#923CF9] transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Profile Header Card */}
        <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 bg-[#923CF9]/10 rounded-[32px] flex items-center justify-center text-[#923CF9] text-4xl font-black shadow-inner">
            {student.firstName[0]}
            {student.lastName[0]}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-slate-800">
                {student.firstName} {student.lastName}
              </h1>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase w-fit mx-auto md:mx-0">
                Active Student
              </span>
            </div>
            <p className="text-slate-500 font-medium">
              Student ID:{" "}
              <span className="text-slate-800 font-bold">{student.id}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-[#923CF9] text-white rounded-2xl font-black text-sm shadow-lg shadow-[#923CF9]/20 hover:-translate-y-0.5 transition-all">
              Edit Profile
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Personal Details */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-6">
                Academic Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Current Class
                  </p>
                  <p className="font-bold text-slate-700">SS 3 Science</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Enrollment Date
                  </p>
                  <p className="font-bold text-slate-700">Sept 12, 2023</p>
                </div>
              </div>
            </section>
          </div>

          {/* Column 2: Parent/Emergency Contact */}
          <section className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <ShieldCheck size={20} />
              <h3 className="text-lg font-black">Primary Contact</h3>
            </div>

            {parent ? (
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Parent/Guardian
                  </p>
                  <p className="text-lg font-black">{parent.fullName}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                    <Phone size={14} className="text-emerald-400" />{" "}
                    {parent.phoneNumber}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                    <Mail size={14} className="text-emerald-400" />{" "}
                    {parent.email || "No email provided"}
                  </div>
                </div>

                <Link
                  href={`/school-admin/parents/${parent.id}`}
                  className="block w-full py-3 bg-white/10 hover:bg-white/20 text-center rounded-xl text-xs font-black transition-all border border-white/10"
                >
                  View Parent Profile
                </Link>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No linked parent found.
              </p>
            )}
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
