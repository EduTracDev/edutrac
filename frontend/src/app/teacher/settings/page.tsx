"use client";

import { ProfileHeader } from "@/modules/school-admin/components/profile/ProfileHeader";
import { ProfileForm } from "@/modules/school-admin/components/profile/ProfileForm";
import { SecuritySettings } from "@/modules/school-admin/components/profile/SecuritySettings";
import { GraduationCap, BookOpen } from "lucide-react";
import {
  SettingsLayout,
  SettingsTab,
} from "@/modules/shared/settings/SettingsLayout";
import { useState } from "react";
import { SettingsSection } from "@/modules/shared/settings/SettingsSection";
import { NotificationSettings } from "@/modules/school-admin/components/settings/NotificationSettings";

export default function Page() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  // In a real app, this data would come from your Auth Context
  const teacherUser = {
    name: "Adewale Johnson",
    email: "a.johnson@greentreeschool.edu",
    role: "Senior Lead Teacher",
    assignedClasses: ["JSS 2 Gold", "SS 2 Science", "SS 3 Art"],
  };
  return (
    <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-5xl mx-auto pb-20">
        {activeTab === "profile" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProfileHeader
              name={teacherUser.name}
              email={teacherUser.email}
              role={teacherUser.role}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Left: Professional Information */}
              <div className="lg:col-span-2">
                {/* NOTE: We pass a 'role' prop here so the form 
                    can adjust its validation/fields for a teacher 
                 */}
                <ProfileForm role="teacher" />
              </div>

              {/* Right: Contextual Sidebar */}
              <div className="space-y-6">
                {/* Academic Identity Card */}
                <div className="bg-[#923CF9] p-8 rounded-[40px] text-white shadow-2xl shadow-purple-100 relative overflow-hidden">
                  {/* Decorative Background Icon */}
                  <GraduationCap
                    className="absolute -right-4 -bottom-4 text-white/10"
                    size={120}
                  />

                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <BookOpen size={16} />
                    Current Assignments
                  </h3>

                  <div className="space-y-3 relative z-10">
                    {teacherUser.assignedClasses.map((cls) => (
                      <div
                        key={cls}
                        className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center group hover:bg-white/20 transition-all"
                      >
                        <span className="font-bold text-sm tracking-tight">
                          {cls}
                        </span>
                        <span className="text-[9px] font-black uppercase bg-white text-[#923CF9] px-2 py-1 rounded-lg shadow-sm">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-purple-800/30 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-purple-100 font-medium leading-relaxed italic opacity-80">
                      Class assignments and permissions are strictly managed by
                      the School Administrator.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "security" && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <SecuritySettings isTeacher={true} />
          </div>
        )}
        {activeTab === "notifications" && (
          <NotificationSettings role="teacher" />
        )}
      </div>
    </SettingsLayout>
  );
}
