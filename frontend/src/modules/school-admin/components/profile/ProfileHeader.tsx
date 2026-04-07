"use client";
import React, { useRef, useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image
import { Camera, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export const ProfileHeader = ({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Default fallback image
  const [previewUrl, setPreviewUrl] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  );

  const handleEditClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setIsUploading(true);
      const loading = toast.loading("Processing photo...");

      // Generate local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Simulate API Upload
      await new Promise((res) => setTimeout(res, 2000));

      toast.success("Profile photo updated!", { id: loading });
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#923CF9]/5 rounded-bl-full -mr-10 -mt-10" />

      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div
          className="relative group cursor-pointer"
          onClick={handleEditClick}
        >
          {/* Container must have overflow-hidden and relative for 'fill' to work */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] bg-slate-100 border-4 border-white shadow-xl overflow-hidden relative">
            <Image
              src={previewUrl}
              alt={`${name}'s Profile Picture`}
              fill // ✅ Fills the parent container
              className={`object-cover transition-opacity duration-300 ${isUploading ? "opacity-40" : "opacity-100"}`}
              sizes="(max-width: 768px) 96px, 128px"
              priority // ✅ Loads this immediately as it's above the fold
              unoptimized={previewUrl.startsWith("blob:")} // ✅ Required for local blob previews
            />

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/10">
                <Loader2 className="animate-spin text-[#923CF9]" size={24} />
              </div>
            )}

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                Change
              </span>
            </div>
          </div>

          <button
            type="button"
            className="absolute -bottom-2 -right-2 p-3 bg-[#923CF9] text-white rounded-2xl shadow-lg hover:scale-110 transition-transform z-20"
          >
            <Camera size={18} />
          </button>
        </div>

        {/* Text Details remain the same... */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {name}
            </h1>
            <ShieldCheck className="text-emerald-500" size={20} />
          </div>
          <p className="text-slate-500 font-medium">{email}</p>
          <div className="pt-2">
            <span className="px-3 py-1 bg-[#923CF9]/10 text-[#923CF9] text-[10px] font-black uppercase tracking-widest rounded-full">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
