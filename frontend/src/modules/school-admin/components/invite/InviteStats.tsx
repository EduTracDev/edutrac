import StatCard from "../dashboard/StatCard";
import { Send, UserCheck, Clock3, ClockAlert } from "lucide-react";

interface InviteStatsProps {
  stats: {
    total: number;
    accepted: number;
    pending: number;
    expired: number;
  };
}

export const InviteStats = ({ stats }: InviteStatsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <StatCard
      title="Total Invitations"
      value={stats.total.toString()}
      icon={Send}
      color="text-blue-600"
      bgColor="bg-blue-50"
    />

    <StatCard
      title="Accepted"
      value={stats.accepted.toString()}
      icon={UserCheck}
      color="text-green-600"
      bgColor="bg-green-50"
    />

    <StatCard
      title="Pending"
      value={stats.pending.toString()}
      icon={Clock3}
      color="text-amber-600"
      bgColor="bg-amber-50"
    />

    <StatCard
      title="Expired"
      value={stats.expired.toString()}
      icon={ClockAlert}
      color="text-red-600"
      bgColor="bg-red-50"
    />
  </div>
);
