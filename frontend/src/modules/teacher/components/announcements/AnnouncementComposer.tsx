// @/modules/teacher/components/announcements/AnnouncementComposer.tsx

import { useState } from "react";
import { Send, X, AlertCircle, Megaphone, Loader2 } from "lucide-react";
import {
  AnnouncementCategory,
  AnnouncementLog,
} from "@/modules/types/dashboard";

interface AnnouncementFormData {
  title: string;
  content: string;
  category: AnnouncementCategory;
  targetAudience: string[];
}
interface AnnouncementComposerProps {
  onSave: (data: AnnouncementFormData) => void;
  onCancel: () => void;
  availableClasses: string[];
}

export const AnnouncementComposer = ({
  onSave,
  onCancel,
  availableClasses,
}: AnnouncementComposerProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    content: "",
    category: "General",
    targetAudience: [],
  });

  const toggleClass = (className: string) => {
    setFormData((prev) => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(className)
        ? prev.targetAudience.filter((c) => c !== className)
        : [...prev.targetAudience, className],
    }));
  };

  const handleBroadcast = async () => {
    if (isInvalid) return;

    setIsSaving(true);
    try {
      // We 'await' the parent's onSave function
      await onSave(formData);
    } catch (error) {
      console.error("Failed to broadcast:", error);
      setIsSaving(false); // Only stop loading if it fails (otherwise component unmounts)
    }
  };

  const isInvalid =
    !formData.title.trim() ||
    !formData.content.trim() ||
    formData.targetAudience.length === 0;

  return (
    <div className="bg-white rounded-[32px] border-2 border-[#923CF9]/20 p-8 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#923CF9]/10 rounded-xl flex items-center justify-center text-[#923CF9]">
            <Megaphone size={20} />
          </div>
          <h2 className="text-xl font-black text-slate-800">
            Draft Announcement
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as AnnouncementCategory,
                })
              }
              className="w-full mt-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#923CF9]/20"
            >
              <option value="General">General</option>
              <option value="Urgent">Urgent</option>
              <option value="Academic">Academic</option>
              <option value="Event">Event</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Subject / Headline
            </label>
            <input
              type="text"
              placeholder="e.g., Mid-term Project Submission Update"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mt-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#923CF9]/20"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Announcement Body
          </label>
          <textarea
            rows={4}
            placeholder="Type your message here..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#923CF9]/20 resize-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Send To:
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {availableClasses.map((cls) => (
              <button
                key={cls}
                type="button" // Important: prevents accidental form submission
                onClick={() => toggleClass(cls)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                  formData.targetAudience.includes(cls)
                    ? "bg-slate-800 text-white shadow-md"
                    : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2 text-amber-600">
            {isInvalid && (
              <>
                <AlertCircle size={14} />
                <span className="text-[10px] font-bold uppercase">
                  All fields required
                </span>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={onCancel}
              className="px-6 py-3 text-slate-500 font-black text-xs uppercase"
            >
              Discard
            </button>
            <button
              type="button"
              disabled={isInvalid}
              onClick={handleBroadcast}
              className={`px-8 py-3 bg-[#923CF9] text-white rounded-2xl font-black text-xs uppercase transition-all shadow-lg shadow-purple-200 flex items-center gap-2 
          ${isSaving ? "opacity-80 cursor-not-allowed" : "hover:bg-[#8126e8]"} 
          disabled:opacity-50 disabled:shadow-none`}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Broadcast Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
