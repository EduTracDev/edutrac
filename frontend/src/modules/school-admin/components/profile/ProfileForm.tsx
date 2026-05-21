"use client";

import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema, ProfileFormData } from "@/utils/validation";
import { SettingsSection } from "@/modules/shared/settings/SettingsSection";
import { Loader2 } from "lucide-react";

type UserRole = "admin" | "teacher" | "parent";

interface ProfileFormProps {
  role: UserRole;
}
export const ProfileForm = ({ role }: ProfileFormProps) => {
  const { handleProfileUpdate, isSubmitting } = useDashboardForms();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: "Adewale Johnson",
      email: "a.johnson@greentreeschool.edu",
      phoneNumber: "+2348030000000",
      bio: "",
    },
  });

  const labels = {
    admin: {
      bio: "Professional Bio",
      desc: "Update your admin profile details and school branding.",
    },
    teacher: {
      bio: "Professional Philosophy",
      desc: "Share your teaching approach and academic background.",
    },
    parent: {
      bio: "Parental Note",
      desc: "Manage your contact details and communication preferences.",
    },
  };

  return (
    <SettingsSection
      title="Personal Information"
      description={labels[role].desc}
    >
      <form
        onSubmit={handleSubmit(handleProfileUpdate)}
        className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Full Name
          </label>
          <input
            {...register("fullName")}
            className={`w-full p-4 bg-slate-50 border ${errors.fullName ? "border-red-500" : "border-slate-200"} rounded-[20px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700 text-sm`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-[10px] font-bold ml-2 uppercase tracking-tighter">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className={`w-full p-4 bg-slate-50 border ${errors.email ? "border-red-500" : "border-slate-200"} rounded-[20px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700 text-sm`}
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold ml-2 uppercase tracking-tighter">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            className={`w-full p-4 bg-slate-50 border ${errors.phoneNumber ? "border-red-500" : "border-slate-200"} rounded-[20px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700 text-sm`}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            {labels[role].bio}
          </label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-[24px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700 resize-none text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            disabled={!isDirty || isSubmitting}
            className="px-6 py-4 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-600 transition-colors disabled:opacity-0"
          >
            Discard
          </button>

          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="flex items-center gap-2 px-10 py-4 bg-[#923CF9] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-[20px] shadow-lg shadow-purple-100 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Syncing...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </SettingsSection>
  );
};
