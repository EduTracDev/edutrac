import StatCard from "@/modules/school-admin/components/dashboard/StatCard";
import { Send, Users, Zap, TrendingUp } from "lucide-react";

interface StatsProps {
  totalSent: number;
  totalRecipients: number;
  activeChannels: number;
}

export const AnnouncementStats = ({
  totalSent,
  totalRecipients,
  activeChannels,
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
            <span>+12% from last month</span>
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
            Unique parents and staff reached
          </p>
        }
      />

      <StatCard
        title="Active Channels"
        value={activeChannels}
        icon={Zap}
        color="text-emerald-600"
        bgColor="bg-emerald-50"
        description={
          <p className="text-[10px] font-medium text-slate-500">
            WhatsApp, SMS, and Email active
          </p>
        }
      />
    </div>
  );
};
