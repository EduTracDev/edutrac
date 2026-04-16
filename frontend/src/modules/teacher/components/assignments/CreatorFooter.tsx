"use client";

import { Info, Loader2, CheckCircle } from "lucide-react";

interface FooterProps {
  onCancel: () => void;
  isSaving: boolean;
  onPublish?: () => void; // Optional if using form submit
}

export const CreatorFooter = ({
  onCancel,
  isSaving,
  onPublish,
}: FooterProps) => {
  return (
    <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
      {/* Draft Hint */}
      <div className="hidden sm:flex items-center gap-2 text-slate-400 italic">
        <Info size={14} />
        <span className="text-[10px] font-medium">
          Changes are saved as a draft automatically.
        </span>
      </div>

      <div className="flex items-center gap-6 w-full sm:w-auto">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
        >
          Discard
        </button>

        <button
          onClick={onPublish}
          type={onPublish ? "button" : "submit"}
          disabled={isSaving}
          className="flex-1 sm:flex-none px-10 py-4 bg-[#923CF9] text-white rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-purple-100 hover:bg-[#8126e8] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Publishing...
            </>
          ) : (
            <>
              <CheckCircle size={16} /> Publish Task
            </>
          )}
        </button>
      </div>
    </div>
  );
};
