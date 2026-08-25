"use client";

import React, { useState } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import {
  MOCK_SUBSCRIPTIONS,
  MOCK_INVOICES,
  TenantSubscription,
  Invoice,
} from "@/modules/super-admin/types/subscription.types";
import { SubscriptionPlanModal } from "@/modules/super-admin/components/SubscriptionPlanModal";
import { CreateInvoiceDrawer } from "@/modules/super-admin/components/CreateInvoiceDrawer";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] =
    useState<TenantSubscription[]>(MOCK_SUBSCRIPTIONS);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [activeTab, setActiveTab] = useState<"subscriptions" | "invoices">(
    "subscriptions",
  );
  const [editingSub, setEditingSub] = useState<TenantSubscription | null>(null);
  const [isInvoiceDrawerOpen, setIsInvoiceDrawerOpen] = useState(false);

  const handleUpdateSubscription = (updated: TenantSubscription) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s)),
    );
    setEditingSub(null);
  };

  const handleCreateInvoice = (newInv: Invoice) => {
    setInvoices([newInv, ...invoices]);
    setIsInvoiceDrawerOpen(false);
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Subscriptions & SaaS Invoicing
            </h1>
            <p className="text-sm text-slate-500">
              Monitor tenant licensing, process tier upgrades, and track revenue
              collection across all schools.
            </p>
          </div>
          {activeTab === "invoices" && (
            <button
              onClick={() => setIsInvoiceDrawerOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors"
            >
              + Create Manual Invoice
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 flex gap-6">
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === "subscriptions"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Active Subscriptions ({subscriptions.length})
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === "invoices"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Invoices & Billing History ({invoices.length})
          </button>
        </div>

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3">School Name</th>
                    <th className="p-3">Current Plan</th>
                    <th className="p-3">Cycle</th>
                    <th className="p-3">Recurring Rate</th>
                    <th className="p-3">Next Renewal</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {subscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-3 font-bold text-slate-900">
                        {sub.schoolName}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {sub.planTier}
                        </span>
                      </td>
                      <td className="p-3">{sub.billingCycle}</td>
                      <td className="p-3 font-semibold text-slate-900">
                        ${sub.amount.toLocaleString()}
                      </td>
                      <td className="p-3 text-slate-500">
                        {sub.nextBillingDate}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            sub.status === "Active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setEditingSub(sub)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded transition-colors"
                        >
                          Adjust Plan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">School Name</th>
                    <th className="p-3">Plan Tier</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Issue Date</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-slate-900">
                        {inv.invoiceNumber}
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {inv.schoolName}
                      </td>
                      <td className="p-3">{inv.planTier}</td>
                      <td className="p-3 font-semibold text-slate-900">
                        ${inv.amount.toLocaleString()}
                      </td>
                      <td className="p-3 text-slate-500">{inv.issueDate}</td>
                      <td className="p-3 text-slate-500">{inv.dueDate}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            inv.status === "Paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : inv.status === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modals & Drawers */}
        {editingSub && (
          <SubscriptionPlanModal
            subscription={editingSub}
            onClose={() => setEditingSub(null)}
            onSave={handleUpdateSubscription}
          />
        )}

        {isInvoiceDrawerOpen && (
          <CreateInvoiceDrawer
            onClose={() => setIsInvoiceDrawerOpen(false)}
            onCreate={handleCreateInvoice}
          />
        )}
      </div>
    </SuperAdminLayout>
  );
}
