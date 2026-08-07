import StatCard from "@/modules/school-admin/components/dashboard/StatCard";
import { Assignment } from "@/modules/types/dashboard";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

export const AssignmentStats = ({
  assignments,
}: {
  assignments: Assignment[];
}) => {
  const activeCount = assignments.filter(
    (a) => a.status === "Published",
  ).length;
  const pendingGrading = assignments.reduce(
    (acc, a) => acc + (a.submissions.turnedIn - a.submissions.graded),
    0,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Active Assignments"
        value={activeCount}
        icon={BookOpen}
        color="text-[#923CF9]"
        bgColor="bg-[#923CF9]/5"
        description={
          <span className="text-[10px] font-medium text-slate-500">
            Currently open for students
          </span>
        }
      />
      <StatCard
        title="Pending Grading"
        value={pendingGrading}
        icon={Clock}
        color="text-amber-600"
        bgColor="bg-amber-50"
        description={
          <span className="text-[10px] font-medium text-slate-500">
            Submissions awaiting review
          </span>
        }
      />
      <StatCard
        title="Completion Rate"
        value="88%"
        icon={CheckCircle}
        color="text-emerald-600"
        bgColor="bg-emerald-50"
        description={
          <span className="text-[10px] font-medium text-slate-500">
            Avg. across all classes
          </span>
        }
      />
    </div>
  );
};
