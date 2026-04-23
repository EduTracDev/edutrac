"use client";

import { useWard } from "@/modules/context/WardContext";
import { BillingOverview } from "@/modules/parent/components/billing/BillingOverview";
import { PaymentHistory } from "@/modules/parent/components/billing/PaymentHistory";
import { SchoolBankDetails } from "@/modules/parent/components/billing/SchoolBankDetails";

export default function BillingPage() {
  const { activeWard } = useWard();

  if (!activeWard) return null;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-black text-slate-800">Billing & Fees</h1>
        <p className="text-slate-400 font-medium text-sm italic">
          Financial records for{" "}
          <span className="text-[#923CF9] font-bold">{activeWard.name}</span>.
        </p>
      </header>

      <BillingOverview />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PaymentHistory />
        </div>

        {/* Payment Tools Sidebar */}
        <div className="space-y-6">
          <SchoolBankDetails />

          <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              Note
            </h4>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
              Online payments are instant. Bank transfers may take up to 24
              hours to reflect in your history after verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
