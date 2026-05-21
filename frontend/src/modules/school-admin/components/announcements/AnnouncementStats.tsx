// @/modules/common/components/announcements/AnnouncementStats.tsx

import StatCard from "@/modules/school-admin/components/dashboard/StatCard";
import { Send, Users, Zap, TrendingUp, BookOpen } from "lucide-react";

interface StatsProps {
  totalSent: number;
  totalRecipients: number;
  // Admin-specific
  activeChannels?: number;
  // Teacher-specific
  classCount?: number;
  variant?: "admin" | "teacher";
}

export const AnnouncementStats = ({
  totalSent,
  totalRecipients,
  activeChannels = 0,
  classCount = 0,
  variant = "admin",
}: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Broadcasts"
        value={totalSent}
        icon={Send}
        color="text-blue-600"
        bgColor="bg-blue-50"
        description={
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <TrendingUp size={12} />
            <span>Active communications</span>
          </div>
        }
      />

      <StatCard
        title="Total Reach"
        value={totalRecipients.toLocaleString()}
        icon={Users}
        color="text-[#923CF9]"
        bgColor="bg-[#923CF9]/5"
        description={
          <p className="text-[10px] font-medium text-slate-500">
            {variant === "admin"
              ? "Total community reach"
              : "Students in your classes"}
          </p>
        }
      />

      {/* Conditional Rendering based on Variant */}
      {variant === "admin" ? (
        <StatCard
          title="Active Channels"
          value={activeChannels}
          icon={Zap}
          color="text-emerald-600"
          bgColor="bg-emerald-50"
          description={
            <p className="text-[10px] font-medium text-slate-500">
              WhatsApp, SMS, and Email
            </p>
          }
        />
      ) : (
        <StatCard
          title="Affected Classes"
          value={classCount}
          icon={BookOpen}
          color="text-amber-600"
          bgColor="bg-amber-50"
          description={
            <p className="text-[10px] font-medium text-slate-500">
              Broadcast coverage across grades
            </p>
          }
        />
      )}
    </div>
  );
};
