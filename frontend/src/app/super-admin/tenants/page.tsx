"use client";

import React, { useState } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import { ProvisionedTenant } from "@/modules/super-admin/types/provisioning.types";
import { TenantProvisioningWizard } from "@/modules/super-admin/components/TenantProvisioningWizard";

const MOCK_TENANTS: ProvisionedTenant[] = [
  {
    id: "sch_1",
    schoolName: "Greenwood High",
    domain: "greenwood.edutrac.io",
    planTier: "Professional",
    adminEmail: "admin@greenwood.edu",
    status: "Active",
    createdAt: "Aug 10, 2026",
  },
  {
    id: "sch_2",
    schoolName: "St. Jude Grammar",
    domain: "stjude.edutrac.io",
    planTier: "Enterprise",
    adminEmail: "principal@stjude.org",
    status: "Active",
    createdAt: "Jul 15, 2026",
  },
  {
    id: "sch_3",
    schoolName: "Lagos Prep Academy",
    domain: "lagosprep.edutrac.io",
    planTier: "Basic",
    adminEmail: "headmaster@lagosprep.com",
    status: "Active",
    createdAt: "Aug 01, 2026",
  },
];

export default function TenantProvisioningPage() {
  const [tenants, setTenants] = useState<ProvisionedTenant[]>(MOCK_TENANTS);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCompleteProvisioning = (newTenant: ProvisionedTenant) => {
    setTenants([newTenant, ...tenants]);
    setIsWizardOpen(false);
  };

  const filteredTenants = tenants.filter(
    (t) =>
      t.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.domain.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Tenant Workspace Provisioning
            </h1>
            <p className="text-sm text-slate-500">
              Onboard new school organizations, configure custom subdomains, and
              provision tenant database instances.
            </p>
          </div>
          <button
            onClick={() => setIsWizardOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
          >
            <span>+</span> Provision New Tenant
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by school name or subdomain..."
            className="text-xs p-2.5 border border-slate-300 rounded-lg w-full max-w-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <span className="text-xs font-bold text-slate-400">
            Total Tenants: {filteredTenants.length}
          </span>
        </div>

        {/* Tenants Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-3">School Name</th>
                  <th className="p-3">Domain URL</th>
                  <th className="p-3">Plan Tier</th>
                  <th className="p-3">Admin Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Provisioned Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTenants.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 font-bold text-slate-900">
                      {t.schoolName}
                    </td>
                    <td className="p-3 font-mono font-medium text-indigo-600">
                      {t.domain}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-700">
                        {t.planTier}
                      </span>
                    </td>
                    <td className="p-3">{t.adminEmail}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{t.createdAt}</td>
                    <td className="p-3 text-right space-x-2">
                      <button className="text-indigo-600 font-bold hover:underline">
                        Manage Tenant
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wizard Modal */}
        {isWizardOpen && (
          <TenantProvisioningWizard
            onClose={() => setIsWizardOpen(false)}
            onComplete={handleCompleteProvisioning}
          />
        )}
      </div>
    </SuperAdminLayout>
  );
}
