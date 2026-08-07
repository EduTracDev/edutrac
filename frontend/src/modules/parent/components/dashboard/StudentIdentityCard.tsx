import { Users, GraduationCap } from "lucide-react";

export const StudentIdentityCard = ({
  name,
  className,
  studentCount,
}: {
  name: string;
  className: string;
  studentCount: number;
}) => {
  return (
    <div className="p-6 bg-gradient-to-br from-[#923CF9] to-[#7b2cd6] rounded-[32px] text-white shadow-xl shadow-purple-200">
      <div className="flex justify-between items-start mb-8">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
          <GraduationCap size={24} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-black/20 px-3 py-1 rounded-full">
          Active Session
        </span>
      </div>

      <h2 className="text-2xl font-black mb-1">{name}</h2>
      <p className="text-purple-100 font-bold text-sm mb-6">{className}</p>

      <div className="flex items-center gap-2 py-3 px-4 bg-white/10 rounded-2xl w-fit">
        <Users size={16} className="text-purple-200" />
        <span className="text-xs font-bold text-purple-50">
          with {studentCount} other students
        </span>
      </div>
    </div>
  );
};
