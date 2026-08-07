"use client";

import { useRegisterPlan } from "../hooks/useRegisterPlan";

export default function RegisterForm() {
  const { selectedPlan, setSelectedPlan } = useRegisterPlan();

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-[32px] shadow-xl border border-slate-100">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Create School Account
      </h1>

      <form className="space-y-4">
        {/* Plan Selection UI */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {["basic", "pro", "enterprise"].map((planId) => (
            <button
              key={planId}
              type="button"
              onClick={() => setSelectedPlan(planId)}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                selectedPlan === planId
                  ? "border-[#923CF9] bg-[#923CF9] text-white"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {planId.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Other form fields like School Name, Email, etc. */}
        <input
          type="text"
          placeholder="School Name"
          className="w-full p-4 rounded-xl border border-slate-200 focus:outline-[#923CF9]"
        />

        <button className="w-full py-4 bg-[#923CF9] text-white rounded-xl font-bold hover:bg-[#7a2dd4] transition-all">
          Register for {selectedPlan.toUpperCase()}
        </button>
      </form>
    </div>
  );
}
