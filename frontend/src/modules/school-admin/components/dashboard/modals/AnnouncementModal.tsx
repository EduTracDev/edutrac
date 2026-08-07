import Modal from "../../../../shared/component/Modal";
interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: { [key: string]: string };
  isSubmitting: boolean;
}

export default function AnnouncementModal({
  isOpen,
  onClose,
  onSubmit,
  errors,
  isSubmitting,
}: AnnouncementModalProps) {
  return (
    <Modal title="Announcement" onClose={onClose} isOpen={isOpen}>
      <form className="space-y-5" onSubmit={onSubmit}>
        {/* Message Title */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Announcement Title
          </label>
          <input
            name="title"
            placeholder="e.g. Mid-term Break Notice"
            className={`w-full p-3 bg-slate-50 border ${
              errors.title ? "border-red-500" : "border-slate-200"
            } rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all text-slate-800 placeholder:text-slate-400`}
          />
          {errors.title && (
            <p className="text-red-500 text-[11px] mt-1 font-medium">
              {errors.title}
            </p>
          )}
        </div>

        {/* Content Area */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Detailed Message
          </label>
          <textarea
            name="content"
            placeholder="Type your message to parents and staff here..."
            rows={5}
            className={`w-full p-3 bg-slate-50 border ${
              errors.content ? "border-red-500" : "border-slate-200"
            } rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all text-slate-800 placeholder:text-slate-400 resize-none`}
          />
          {errors.content && (
            <p className="text-red-500 text-[11px] mt-1 font-medium">
              {errors.content}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] py-4 bg-[#923CF9] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#7c28e0] active:scale-[0.95] transition-all disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Broadcast"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
