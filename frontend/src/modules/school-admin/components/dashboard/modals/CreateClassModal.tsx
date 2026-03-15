import Modal from "../Modal";

// 1. Define the Props Interface
interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Match the name
  errors: { [key: string]: string }; // Match the name
  isSubmitting: boolean;
}

// 2. Pass the props into the function
export default function CreateClassModal({
  isOpen,
  onClose,
  onSubmit,
  errors,
  isSubmitting,
}: CreateClassModalProps) {
  return (
    <Modal title="Create Class" onClose={onClose} isOpen={isOpen}>
      <form className="space-y-5" onSubmit={onSubmit}>
        {/* Class Name Input */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Class Name
          </label>
          <input
            name="className"
            type="text"
            placeholder="e.g. SSS 3 Emerald"
            className={`w-full p-3 bg-slate-50 border ${
              errors.className ? "border-red-500" : "border-slate-100"
            } rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all`}
          />
          {errors.className && (
            <p className="text-red-500 text-[11px] mt-1 font-medium italic">
              {errors.className}
            </p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Section / Category
          </label>
          <div className="relative">
            <select
              name="category"
              className={`w-full p-3 bg-slate-50 border ${
                errors.category ? "border-red-500" : "border-slate-100"
              } rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all`}
            >
              <option value="">Select a section</option>
              <option value="nursery">Nursery / Primary</option>
              <option value="junior">Junior Secondary (JSS)</option>
              <option value="senior">Senior Secondary (SSS)</option>
            </select>
            {/* Custom Chevron for the Select */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.category && (
            <p className="text-red-500 text-[11px] mt-1 font-medium italic">
              {errors.category}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
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
            className="flex-[2] py-4 bg-[#923CF9] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#7c28e0] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Class"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
