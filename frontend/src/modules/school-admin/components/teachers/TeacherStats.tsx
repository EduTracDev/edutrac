import React from "react";
import { Users, UserCheck, UserMinus, GraduationCap } from "lucide-react";
import StatCard from "../dashboard/StatCard";

export const TeacherStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        title="Total Instructors"
        value={24}
        icon={Users}
        color="text-blue-600"
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Active Now"
        value={22}
        icon={UserCheck}
        color="text-emerald-600"
        bgColor="bg-emerald-50"
      />
      <StatCard
        title="On Leave"
        value="02"
        icon={UserMinus}
        color="text-amber-600"
        bgColor="bg-amber-50"
      />
      <StatCard
        title="Departments"
        value="08"
        icon={GraduationCap}
        color="text-[#923CF9]"
        bgColor="bg-[#923CF9]/10"
      />
    </div>
  );
};
