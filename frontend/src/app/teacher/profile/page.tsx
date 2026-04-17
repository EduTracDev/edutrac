import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import { ProfileHeader } from "@/modules/school-admin/components/profile/ProfileHeader";
import { ProfileForm } from "@/modules/school-admin/components/profile/ProfileForm";
import { SecuritySettings } from "@/modules/school-admin/components/profile/SecuritySettings";
import { Award, BookOpen } from "lucide-react";

export default function Page() {
  // In a real app, this data would come from your Auth Context
  const teacherUser = {
    name: "Adewale Johnson",
    email: "a.johnson@greentreeschool.edu",
    role: "Senior Lead Teacher",
    assignedClasses: ["JSS 2 Gold", "SS 2 Science", "SS 3 Art"],
  };
  return (
    <TeacherLayout>
      <div className="max-w-5xl mx-auto pb-20">
        <ProfileHeader
          name={teacherUser.name}
          email={teacherUser.email}
          role={teacherUser.role}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Main Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Award className="text-[#923CF9]" size={20} />
              Personal Information
            </h2>
            <ProfileForm role="teacher" />
          </div>

          {/* Right: Academic Context (Sidebar) */}
          <div className="space-y-6">
            <div className="bg-[#923CF9] p-8 rounded-[32px] text-white shadow-xl shadow-purple-200">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen size={18} />
                My Classes
              </h3>
              <div className="space-y-3">
                {teacherUser.assignedClasses.map((cls) => (
                  <div
                    key={cls}
                    className="bg-white/10 border border-white/20 p-4 rounded-2xl flex justify-between items-center"
                  >
                    <span className="font-bold text-sm">{cls}</span>
                    <span className="text-[10px] font-black uppercase bg-white text-[#923CF9] px-2 py-1 rounded-lg">
                      Active
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[10px] text-purple-100 font-medium leading-relaxed italic">
                Note: Class assignments are managed by the School Administrator.
              </p>
            </div>
          </div>
        </div>
        <SecuritySettings isTeacher={true} />
      </div>
    </TeacherLayout>
  );
}
