"use client";

import React, { useState } from "react";
import { Invoice, PlanTier } from "../types/subscription.types";

interface CreateInvoiceDrawerProps {
  onClose: () => void;
  onCreate: (invoice: Invoice) => void;
}

export function CreateInvoiceDrawer({
  onClose,
  onCreate,
}: CreateInvoiceDrawerProps) {
  const [schoolName, setSchoolName] = useState("");
  const [planTier, setPlanTier] = useState<PlanTier>("Professional");
  const [amount, setAmount] = useState(350);
  const [dueDate, setDueDate] = useState("2026-09-01");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName) return;

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      schoolName,
      planTier,
      amount,
      issueDate: "Aug 19, 2026",
      dueDate,
      status: "Pending",
    };

    onCreate(newInvoice);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900">
            Issue Manual Invoice
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 text-xs flex-1 overflow-y-auto"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Tenant / School Name
            </label>
            <input
              type="text"
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. Apex International School"
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Plan Tier Reference
            </label>
            <select
              value={planTier}
              onChange={(e) => setPlanTier(e.target.value as PlanTier)}
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
            >
              <option value="Basic">Basic Plan</option>
              <option value="Professional">Professional Plan</option>
              <option value="Enterprise">Enterprise Plan</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Invoice Amount ($ USD)
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Payment Due Date
            </label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
            />
          </div>
        </form>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-lg text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs"
          >
            Generate & Send Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
