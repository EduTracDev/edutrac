"use client";

import React, { useState } from "react";
import {
  TenantSubscription,
  PlanTier,
  BillingCycle,
} from "../types/subscription.types";

interface SubscriptionPlanModalProps {
  subscription: TenantSubscription;
  onClose: () => void;
  onSave: (updated: TenantSubscription) => void;
}

export function SubscriptionPlanModal({
  subscription,
  onClose,
  onSave,
}: SubscriptionPlanModalProps) {
  const [tier, setTier] = useState<PlanTier>(subscription.planTier);
  const [cycle, setCycle] = useState<BillingCycle>(subscription.billingCycle);
  const [autoRenew, setAutoRenew] = useState<boolean>(subscription.autoRenew);

  const calculateAmount = (
    selectedTier: PlanTier,
    selectedCycle: BillingCycle,
  ) => {
    const baseMonthly =
      selectedTier === "Basic"
        ? 150
        : selectedTier === "Professional"
          ? 350
          : 600;
    return selectedCycle === "Annual" ? baseMonthly * 10 : baseMonthly; // 2 months discount on annual
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...subscription,
      planTier: tier,
      billingCycle: cycle,
      amount: calculateAmount(tier, cycle),
      autoRenew,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Manage Plan & Billing
            </h3>
            <p className="text-xs text-slate-500">{subscription.schoolName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Subscription Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as PlanTier)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg outline-none font-semibold text-slate-800"
            >
              <option value="Basic">Basic (Up to 500 Students)</option>
              <option value="Professional">
                Professional (Up to 2,000 Students)
              </option>
              <option value="Enterprise">
                Enterprise (Unlimited + Dedicated SLA)
              </option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Billing Cycle
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCycle("Monthly")}
                className={`py-2 px-3 font-bold rounded-lg border transition-colors ${
                  cycle === "Monthly"
                    ? "bg-indigo-50 border-indigo-600 text-indigo-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setCycle("Annual")}
                className={`py-2 px-3 font-bold rounded-lg border transition-colors ${
                  cycle === "Annual"
                    ? "bg-indigo-50 border-indigo-600 text-indigo-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                Annual (Save ~16%)
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
            <span className="font-semibold text-slate-600">
              Calculated Recurring Price:
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              ${calculateAmount(tier, cycle).toLocaleString()} /{" "}
              {cycle === "Annual" ? "yr" : "mo"}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="autoRenewToggle"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="autoRenewToggle"
              className="font-medium text-slate-700"
            >
              Enable Auto-Renewal on next billing date
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
