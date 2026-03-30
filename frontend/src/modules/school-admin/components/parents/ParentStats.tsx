import React from "react";
import { Users, UserCheck, Clock } from "lucide-react";
import StatCard from "../dashboard/StatCard";
import { parentData } from "@/modules/constants/dashboard";

export const ParentStats = () => {
  const totalParents = parentData.length;

  const activeCount = parentData.filter(
    (t) => t.employmentStatus === "Active",
  ).length;

  const pendingCount = parentData.filter(
    (t) => t.accountStatus === "Pending",
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <StatCard
        title="Total Parents"
        value={totalParents}
        icon={Users}
        color="text-blue-600"
        bgColor="bg-blue-50"
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
    </div>
  );
};
