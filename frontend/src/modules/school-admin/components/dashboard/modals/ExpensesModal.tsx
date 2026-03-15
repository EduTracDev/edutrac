import Modal from "../Modal";

// 1. Define the Props Interface
interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Match the name
  errors: { [key: string]: string }; // Match the name
  isSubmitting: boolean;
}

// 2. Pass the props into the function
export default function ExpensesModal({
  isOpen,
  onClose,
  onSubmit,
  errors,
  isSubmitting,
}: ExpenseModalProps) {
  return (
    <Modal title="Expenses" onClose={onClose} isOpen={isOpen}>
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Amount (₦)
          </label>
          <input
            name="amount"
            type="number"
            placeholder="5000"
            className={`w-full p-3 bg-slate-50 border ${errors.amount ? "border-red-500" : "border-slate-200"} rounded-2xl outline-none focus:ring-2 focus:ring-[#923CF9]/20`}
          />
          {errors.amount && (
            <p className="text-red-500 text-[11px] mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Category
          </label>
          <select
            name="category"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none appearance-none"
          >
            <option value="utilities">Utilities (Diesel/Electricity)</option>
            <option value="maintenance">Maintenance & Repairs</option>
            <option value="salaries">Staff Salaries</option>
            <option value="stationery">Stationery & Office Supplies</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="e.g. Fuel for the school bus"
            className={`w-full p-3 bg-slate-50 border ${errors.description ? "border-red-500" : "border-slate-200"} rounded-2xl outline-none resize-none`}
          />
          {errors.description && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.description}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] py-4 bg-[#923CF9] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7c28e0] transition-all disabled:opacity-70"
          >
            {isSubmitting ? "Logging..." : "Save Expense"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
