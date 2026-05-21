"use client";
import { use } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import {
  studentData,
  studentParentLink,
  parentData,
} from "@/modules/constants/dashboard";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Users,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ParentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 1. Fetch Parent Data
  const parent = parentData.find((p) => p.id === id);

  // 2. Reverse Lookup: Find all children (students) linked to this parent
  const linkedStudentIds = studentParentLink
    .filter((link) => link.parentId === id)
    .map((link) => link.studentId);

  const children = studentData.filter((student) =>
    linkedStudentIds.includes(student.id),
  );

  if (!parent) return notFound();

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
          <div className="w-24 h-24 bg-slate-100 rounded-[24px] flex items-center justify-center text-slate-400 shadow-inner">
            <Users size={40} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 mb-1">
              {parent.fullName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Phone size={14} className="text-[#923CF9]" />{" "}
                {parent.phoneNumber}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Mail size={14} className="text-[#923CF9]" />{" "}
                {parent.email || "No email"}
              </span>
            </div>
          </div>

          <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-[#923CF9] transition-all">
            Contact Parent
          </button>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Linked Children (The "Family Tree") */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-slate-800">
                Linked Students
              </h2>
              <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full uppercase text-slate-500">
                {children.length} Children Enrolled
              </span>
            </div>

            <div className="grid gap-4">
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/school-admin/students/${child.id}`}
                  className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:border-[#923CF9]/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#923CF9]/5 group-hover:text-[#923CF9] transition-colors">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">
                        {child.firstName} {child.lastName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        ID: {child.id} • SS 3 Science
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:text-[#923CF9] group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Actions & Status */}
          <div className="space-y-6">
            <section className="bg-[#923CF9] rounded-[32px] p-8 text-white shadow-xl shadow-[#923CF9]/20">
              <h3 className="text-lg font-black mb-4">Account Status</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold text-white/60 uppercase">
                    Wallet Balance
                  </p>
                  <p className="text-xl font-black">₦ 12,500.00</p>
                </div>
                <button className="w-full py-3 bg-white text-[#923CF9] rounded-xl font-black text-xs shadow-lg transition-all active:scale-95">
                  Send Invoice
                </button>
              </div>
            </section>

            <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest text-[10px]">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <p className="text-[11px] text-slate-500 font-medium">
                  <span className="font-bold text-slate-800">SMS Sent:</span>{" "}
                  Absentee alert for {children[0]?.firstName} sent at 09:15 AM
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
