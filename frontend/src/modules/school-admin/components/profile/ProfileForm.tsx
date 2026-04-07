"use client";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema, ProfileFormData } from "@/utils/validation";

export const ProfileForm = () => {
  const { handleProfileUpdate, isSubmitting } = useDashboardForms();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: "Adewale Johnson",
      email: "a.johnson@greentreeschool.edu",
      phoneNumber: "+2348030000000",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleProfileUpdate)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Full Name */}
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
        >
          Full Name
        </label>
        <input
          {...register("fullName")}
          className={`w-full p-4 bg-slate-50 border ${errors.fullName ? "border-red-500" : "border-slate-200"} rounded-[20px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-[10px] font-bold ml-2 uppercase tracking-tighter">
            {errors.fullName.message}
          </p>
        )}
      </div>
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
        >
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          className={`w-full p-4 bg-slate-50 border ${errors.email ? "border-red-500" : "border-slate-200"} rounded-[20px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700`}
        />
        {errors.email && (
          <p className="text-red-500 text-[10px] font-bold ml-2 uppercase tracking-tighter">
            {errors.email.message}
          </p>
        )}
      </div>
      {/* Phone Number */}
      <div className="space-y-2">
        <label
          htmlFor="phoneNumber"
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
        >
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          className={`w-full p-4 bg-slate-50 border ${errors.phoneNumber ? "border-red-500" : "border-slate-200"} rounded-[20px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700`}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-[10px] font-bold ml-2 uppercase tracking-tighter">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
      {/* Bio */}
      <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="bio"
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
        >
          Professional Bio
        </label>
        <textarea
          {...register("bio")}
          rows={4}
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-[#923CF9]/10 transition-all font-medium text-slate-700 resize-none"
        />
      </div>
      <div className="md:col-span-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-10 py-4 bg-[#923CF9] text-white font-black text-xs uppercase tracking-widest rounded-[20px] shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Syncing..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};
