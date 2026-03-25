import React from "react";
import { Users, UserCheck, Clock, GraduationCap } from "lucide-react";
import StatCard from "../dashboard/StatCard";
import { teacherData } from "@/modules/constants/dashboard"; // Import your data source

export const TeacherStats = () => {
  //  Logic: Calculate totals dynamically
  const totalInstructors = teacherData.length;

  const activeCount = teacherData.filter(
    (t) => t.employmentStatus === "Active",
  ).length;

  const pendingCount = teacherData.filter(
    (t) => t.accountStatus === "Pending",
  ).length;

  // Logic to get unique departments
  const uniqueDepartments = new Set(teacherData.map((t) => t.subject)).size;

  // Calculate Teacher Gender Split
  const maleTeachers = teacherData.filter((t) => t.gender === "Male").length;
  const femaleTeachers = teacherData.filter(
    (t) => t.gender === "Female",
  ).length;

  // Percentages for the visual bar
  const total = teacherData.length;
  const malePercent = total > 0 ? Math.round((maleTeachers / total) * 100) : 0;
  const femalePercent =
    total > 0 ? Math.round((femaleTeachers / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        title="Total Instructors"
        value={totalInstructors}
        icon={Users}
        color="text-blue-600"
        bgColor="bg-blue-50"
        description={
          <div className="pt-2 border-t border-slate-50 w-full">
            <div className="flex justify-between text-[10px] font-bold mb-2">
              <span className="text-blue-600">Male: {maleTeachers}</span>
              <span className="text-rose-500">Female: {femaleTeachers}</span>
            </div>

            {/* Visual Staff Split Bar */}
            <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-100">
              <div
                className="bg-blue-500 transition-all duration-500"
                style={{ width: `${malePercent}%` }}
              />
              <div
                className="bg-rose-500 transition-all duration-500"
                style={{ width: `${femalePercent}%` }}
              />
            </div>

            <p className="text-[9px] text-slate-400 mt-1 text-center font-medium italic">
              Staff Gender Distribution
            </p>
          </div>
        }
      />
      <StatCard
        title="Active Now"
        value={activeCount}
        icon={UserCheck}
        color="text-emerald-600"
        bgColor="bg-emerald-50"
      />
      <StatCard
        title="Pending Invites"
        value={pendingCount}
        icon={Clock}
        color="text-amber-600"
        bgColor="bg-amber-50"
      />
      <StatCard
        title="Departments"
        value={uniqueDepartments}
        icon={GraduationCap}
        color="text-[#923CF9]"
        bgColor="bg-[#923CF9]/10"
      />
    </div>
  );
};
