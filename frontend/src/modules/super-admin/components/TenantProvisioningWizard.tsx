/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  ProvisioningStep1Data,
  ProvisioningStep2Data,
  ProvisioningStep3Data,
  ProvisionedTenant,
} from "../types/provisioning.types";

interface TenantProvisioningWizardProps {
  onClose: () => void;
  onComplete: (tenant: ProvisionedTenant) => void;
}

export function TenantProvisioningWizard({
  onClose,
  onComplete,
}: TenantProvisioningWizardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isDeploying, setIsDeploying] = useState(false);

  // Form State
  const [step1, setStep1] = useState<ProvisioningStep1Data>({
    schoolName: "",
    subdomain: "",
    contactEmail: "",
    contactPhone: "",
    country: "Nigeria",
  });

  const [step2, setStep2] = useState<ProvisioningStep2Data>({
    planTier: "Professional",
    billingCycle: "Annual",
  });

  const [step3, setStep3] = useState<ProvisioningStep3Data>({
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    sendWelcomeEmail: true,
  });

  // Auto-generate subdomain from school name
  const handleSchoolNameChange = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]/g, "");
    setStep1((prev) => ({
      ...prev,
      schoolName: val,
      subdomain: slug,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as 2 | 3);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as 1 | 2);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);

    // Simulate backend workspace provisioning pipeline
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newTenant: ProvisionedTenant = {
      id: `sch_${Date.now()}`,
      schoolName: step1.schoolName,
      domain: `${step1.subdomain}.edutrac.io`,
      planTier: step2.planTier,
      adminEmail: step3.adminEmail,
      status: "Active",
      createdAt: "Just now",
    };

    setIsDeploying(false);
    onComplete(newTenant);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Provision New School Tenant
            </h2>
            <p className="text-xs text-slate-500">
              Set up multi-tenant workspace, subdomains, and primary admin
              access.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 bg-slate-100/60 border-b border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
          <div
            className={`py-2 rounded-lg font-bold transition-colors ${currentStep === 1 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"}`}
          >
            1. School Identity
          </div>
          <div
            className={`py-2 rounded-lg font-bold transition-colors ${currentStep === 2 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"}`}
          >
            2. Resource Tier
          </div>
          <div
            className={`py-2 rounded-lg font-bold transition-colors ${currentStep === 3 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"}`}
          >
            3. Primary Admin
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 text-xs">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  School / Organization Name
                </label>
                <input
                  type="text"
                  value={step1.schoolName}
                  onChange={(e) => handleSchoolNameChange(e.target.value)}
                  placeholder="e.g. Lagos International Academy"
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Workspace Subdomain URL
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={step1.subdomain}
                    onChange={(e) =>
                      setStep1({
                        ...step1,
                        subdomain: e.target.value.toLowerCase(),
                      })
                    }
                    placeholder="lagosprep"
                    className="flex-1 p-2.5 border border-r-0 border-slate-300 rounded-l-lg outline-none font-mono"
                  />
                  <span className="p-2.5 bg-slate-100 border border-slate-300 rounded-r-lg font-mono text-slate-500 font-bold">
                    .edutrac.io
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Official Contact Email
                  </label>
                  <input
                    type="email"
                    value={step1.contactEmail}
                    onChange={(e) =>
                      setStep1({ ...step1, contactEmail: e.target.value })
                    }
                    placeholder="info@school.edu"
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={step1.contactPhone}
                    onChange={(e) =>
                      setStep1({ ...step1, contactPhone: e.target.value })
                    }
                    placeholder="+234 800 000 0000"
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  Select Subscription Tier
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      tier: "Basic",
                      desc: "Up to 500 Students",
                      price: "$150/mo",
                    },
                    {
                      tier: "Professional",
                      desc: "Up to 2,000 Students",
                      price: "$350/mo",
                    },
                    {
                      tier: "Enterprise",
                      desc: "Unlimited + Dedicated SLA",
                      price: "$600/mo",
                    },
                  ].map((item) => (
                    <div
                      key={item.tier}
                      onClick={() =>
                        setStep2({ ...step2, planTier: item.tier as any })
                      }
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        step2.planTier === item.tier
                          ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <p className="font-bold text-slate-900">{item.tier}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {item.desc}
                      </p>
                      <p className="text-xs font-extrabold text-indigo-600 mt-3">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Billing Cycle
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="cycle"
                      checked={step2.billingCycle === "Annual"}
                      onChange={() =>
                        setStep2({ ...step2, billingCycle: "Annual" })
                      }
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    Annual Billing (Discounted)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="cycle"
                      checked={step2.billingCycle === "Monthly"}
                      onChange={() =>
                        setStep2({ ...step2, billingCycle: "Monthly" })
                      }
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    Monthly Billing
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Admin First Name
                  </label>
                  <input
                    type="text"
                    value={step3.adminFirstName}
                    onChange={(e) =>
                      setStep3({ ...step3, adminFirstName: e.target.value })
                    }
                    placeholder="David"
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Admin Last Name
                  </label>
                  <input
                    type="text"
                    value={step3.adminLastName}
                    onChange={(e) =>
                      setStep3({ ...step3, adminLastName: e.target.value })
                    }
                    placeholder="Miller"
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  value={step3.adminEmail}
                  onChange={(e) =>
                    setStep3({ ...step3, adminEmail: e.target.value })
                  }
                  placeholder="d.miller@school.edu"
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <label className="flex items-center gap-2 font-bold text-amber-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={step3.sendWelcomeEmail}
                    onChange={(e) =>
                      setStep3({ ...step3, sendWelcomeEmail: e.target.checked })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  Send Activation & Password Setup Email
                </label>
                <p className="text-[11px] text-amber-800">
                  An automated setup link will be emailed to the primary admin
                  to finalize their password setup and onboarding steps.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1 || isDeploying}
            className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-lg text-xs disabled:opacity-40"
          >
            Back
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={!step1.schoolName || !step1.subdomain}
              className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleDeploy}
              disabled={isDeploying || !step3.adminEmail}
              className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg text-xs flex items-center gap-2 disabled:opacity-50"
            >
              {isDeploying && (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {isDeploying
                ? "Provisioning Tenant..."
                : "Deploy School Workspace"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
