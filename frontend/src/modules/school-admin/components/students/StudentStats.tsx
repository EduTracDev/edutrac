import React from "react";
import { Users, UserCheck, Clock, LayoutGrid } from "lucide-react";
import StatCard from "../dashboard/StatCard";
import { studentData } from "@/modules/constants/dashboard";

export const StudentStats = () => {
  const totalStudents = studentData.length;

  const activeCount = studentData.filter(
    (t) => t.enrollmentStatus === "Active",
  ).length;

  const pendingCount = studentData.filter(
    (t) => t.accountStatus === "Pending",
  ).length;

  // Create a map of { "SS 3": 12, "JSS 1": 45, ... }
  const classBreakdown = studentData.reduce(
    (acc, student) => {
      const className = student.class || "Unassigned";
      acc[className] = (acc[className] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Convert to an array for easy mapping in the UI
  const sortedClasses = Object.entries(classBreakdown)
    .sort((a, b) => b[1] - a[1]) // Sort by most students first
    .slice(0, 5); // Just show the top 5 to keep the tooltip clean

  //  Calculate Gender counts
  const maleCount = studentData.filter((s) => s.gender === "Male").length;
  const femaleCount = studentData.filter((s) => s.gender === "Female").length;

  // Calculate percentages for a more "Data-Pro" look
  const malePercent = Math.round((maleCount / studentData.length) * 100);
  const femalePercent = Math.round((femaleCount / studentData.length) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        title="Total Students"
        value={totalStudents}
        icon={Users}
        color="text-blue-600"
        bgColor="bg-blue-50"
        description={
          <div className="pt-2 border-t border-slate-50 w-full">
            <div className="flex justify-between text-[10px] font-bold mb-2">
              <span className="text-blue-600">Male: {maleCount}</span>
              <span className="text-pink-600">Female: {femaleCount}</span>
            </div>

            {/* Visual Gender Split Bar */}
            <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-100">
              <div
                className="bg-blue-500 transition-all duration-500"
                style={{ width: `${malePercent}%` }}
              />
              <div
                className="bg-pink-500 transition-all duration-500"
                style={{ width: `${femalePercent}%` }}
              />
            </div>

            <p className="text-[9px] text-slate-400 mt-1 text-center font-medium">
              {malePercent}% Male • {femalePercent}% Female
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
        title="Pending Onboarding"
        value={pendingCount}
        icon={Clock}
        color="text-amber-600"
        bgColor="bg-amber-50"
      />
      <StatCard
        title="Total Classes"
        value={Object.keys(classBreakdown).length}
        icon={LayoutGrid}
        color="text-[#923CF9]"
        bgColor="bg-[#923CF9]/10"
        description={
          <div className="pt-2 border-t border-slate-50">
            <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">
              Top Enrollments
            </p>
            {sortedClasses.map(([name, count]) => (
              <div
                key={name}
                className="flex justify-between text-[10px] font-bold text-slate-800"
              >
                <span>{name}</span>
                <span className="">{count}</span>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};
