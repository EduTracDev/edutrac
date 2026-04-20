"use client";

import { ProfileHeader } from "@/modules/school-admin/components/profile/ProfileHeader";
import { ProfileForm } from "@/modules/school-admin/components/profile/ProfileForm";
import { SecuritySettings } from "@/modules/school-admin/components/profile/SecuritySettings";
import { GraduationCap, Heart, ShieldCheck } from "lucide-react";
import { SettingsLayout } from "@/modules/shared/settings/SettingsLayout";
import { useState } from "react";
import { NotificationSettings } from "@/modules/school-admin/components/settings/NotificationSettings";

type SettingsTab = "profile" | "security" | "notifications";

export default function Page() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // This would come from your Auth Context (e.g., Fatimah)
  const parentUser = {
    name: "Fatimah Johnson",
    email: "f.johnson@example.com",
    role: "Legal Guardian",
    wards: ["Chidi Johnson", "Adebayo Johnson"],
  };

  return (
    <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-5xl mx-auto pb-20">
        {activeTab === "profile" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProfileHeader
              name={parentUser.name}
              email={parentUser.email}
              role={parentUser.role}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Left: Personal/Guardian Information */}
              <div className="lg:col-span-2">
                <ProfileForm role="parent" />
              </div>

              {/* Right: Family Identity Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#923CF9] p-8 rounded-[40px] text-white shadow-2xl shadow-purple-100 relative overflow-hidden">
                  <Heart
                    className="absolute -right-4 -bottom-4 text-white/10"
                    size={120}
                    strokeWidth={1}
                  />

                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <ShieldCheck size={16} />
                    Verified Wards
                  </h3>

                  <div className="space-y-3 relative z-10">
                    {parentUser.wards.map((ward) => (
                      <div
                        key={ward}
                        className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center group hover:bg-white/20 transition-all"
                      >
                        <span className="font-bold text-sm tracking-tight">
                          {ward}
                        </span>
                        <GraduationCap size={14} className="text-purple-200" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-purple-800/30 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-purple-100 font-medium leading-relaxed italic opacity-80">
                      Adding new wards requires official school verification for
                      security purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <SecuritySettings isTeacher={false} />
          </div>
        )}

        {activeTab === "notifications" && (
          <NotificationSettings role="parent" />
        )}
      </div>
    </SettingsLayout>
  );
}
