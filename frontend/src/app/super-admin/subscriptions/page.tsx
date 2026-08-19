"use client";

import React, { useState } from "react";
import { INITIAL_PLANS, MOCK_SUBSCRIPTIONS, SaaSPlan, SchoolSubscription } from "@/modules/super-admin/types/subscription.types";
import { PlanCard } from "@/modules/super-admin/components/PlanCard";
import { SubscriptionsTable } from "@/modules/super-admin/components/SubscriptionsTable";

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<SaaSPlan[]>(INITIAL_PLANS);
  const [subscriptions, setSubscriptions] = useState<SchoolSubscription[]>(MOCK_SUBSCRIPTIONS);
  const [selectedSub, setSelectedSub] = useState<SchoolSubscription | null>(null);

  const handleUpdatePlan = (updatedPlan: SaaSPlan) => {
    setPlans((prev) => prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
  };

  const handleOverrideSubscriptionTier = (planId: string) => {
    if (!selectedSub) return;
    const targetPlan = plans.find((p) => p.id === planId);
    if (!targetPlan) return;

    setSubscriptions((prev) =>
      prev.map((s) =>
        s.id === selectedSub.id
          ? {
              ...s,
              planId: targetPlan.id,
              planName: targetPlan.name,
              maxStudents: targetPlan.maxStudents,
            }
          : s
      )
    );
    setSelectedSub(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SaaS Plans & School Subscriptions</h1>
        <p className="text-sm text-slate-500">
          Configure tier limits, pricing models, and override active school subscriptions.
        </p>
      </div>

      {/* Plan Tiers Configuration Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Configured Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onUpdatePlan={handleUpdatePlan} />
          ))}
        </div>
      </div>

      {/* School Subscriptions Usage Table */}
      <SubscriptionsTable
        subscriptions={subscriptions}
        onChangePlanClick={(sub) => setSelectedSub(sub)}
      />

      {/* Override Plan Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Override Plan for {selectedSub.schoolName}
            </h3>
            <p className="text-xs text-slate-500">
              Select a new SaaS tier to manually upgrade or downgrade this institution.
            </p>

            <div className="space-y-2">
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleOverrideSubscriptionTier(p.id)}
                  className={`w-full p-3 rounded-lg border text-left flex justify-between items-center transition-colors ${
                    selectedSub.planId === p.id
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800">{p.name}</p>
                    <p className="text-[10px] text-slate-500">Up to {p.maxStudents} Students</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">${p.priceMonthly}/mo</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}