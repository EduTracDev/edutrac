"use client";

import React, { useState } from "react";
import {
  OnboardingWizardData,
  OnboardingErrors,
  INITIAL_ONBOARDING_DATA,
  validateStep,
} from "../types/onboarding.types";
import { FormField } from "./FormField";

interface WizardProps {
  onCancel: () => void;
  onComplete: (data: OnboardingWizardData) => Promise<void>;
  plans: { id: string; name: string; priceMonthly: number; maxStudents: number }[];
}

const STEPS = [
  { id: 1, title: "School Details", desc: "Basic institution metadata" },
  { id: 2, title: "Primary Admin", desc: "First administrator account" },
  { id: 3, title: "SaaS Subscription", desc: "Plan selection & capacity" },
  { id: 4, title: "Review & Confirm", desc: "Verify configuration" },
];

export function SchoolOnboardingWizard({ onCancel, onComplete, plans }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingWizardData>(INITIAL_ONBOARDING_DATA);
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "estimatedStudents" ? Number(value) : value,
    }));
    if (errors[name as keyof OnboardingWizardData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onComplete(formData);
    } catch (err) {
      console.error("Failed to onboard school:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPlan = plans.find((p) => p.id === formData.planId) || plans[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl w-full mx-auto flex flex-col">
      {/* Header & Step Tracker */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Onboard New School</h2>
            <p className="text-xs text-slate-500">
              Provision a new school workspace, configure its domain, and set up primary access.
            </p>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((s) => {
            const isActive = s.id === currentStep;
            const isDone = s.id < currentStep;

            return (
              <div key={s.id} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    isDone
                      ? "bg-emerald-500"
                      : isActive
                      ? "bg-indigo-600"
                      : "bg-slate-200"
                  }`}
                />
                <div className="hidden sm:block">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? "text-indigo-600" : isDone ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    Step {s.id}
                  </p>
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">{s.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Area */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        {/* Step 1: School Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              1. Institution Metadata
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="School Name"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                error={errors.schoolName}
                placeholder="e.g., Apex International Academy"
                required
              />

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Subdomain Prefix *
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="subdomain"
                    value={formData.subdomain}
                    onChange={handleChange}
                    placeholder="apex"
                    className={`w-full text-xs font-semibold p-2.5 border rounded-l-lg focus:outline-none ${
                      errors.subdomain ? "border-red-500" : "border-slate-300 focus:border-indigo-500"
                    }`}
                  />
                  <span className="bg-slate-100 text-slate-500 border border-l-0 border-slate-300 text-xs px-3 py-2.5 rounded-r-lg font-mono">
                    .edutrac.app
                  </span>
                </div>
                {errors.subdomain && <p className="text-xs text-red-600 mt-1">{errors.subdomain}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Country"
                name="country"
                isSelect
                value={formData.country}
                onChange={handleChange}
                options={[
                  { label: "Nigeria", value: "Nigeria" },
                  { label: "Ghana", value: "Ghana" },
                  { label: "Kenya", value: "Kenya" },
                  { label: "South Africa", value: "South Africa" },
                  { label: "United Kingdom", value: "United Kingdom" },
                ]}
              />
              <FormField
                label="City / Region"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Lagos"
              />
            </div>

            <FormField
              label="Street Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              placeholder="e.g., 12 Academic Boulevard, Victoria Island"
              required
            />
          </div>
        )}

        {/* Step 2: Primary Administrator Contact */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              2. First School Administrator
            </h3>
            <p className="text-xs text-slate-500">
              An account will be automatically provisioned for this user with full School Admin credentials.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="First Name"
                name="adminFirstName"
                value={formData.adminFirstName}
                onChange={handleChange}
                error={errors.adminFirstName}
                placeholder="Jane"
                required
              />
              <FormField
                label="Last Name"
                name="adminLastName"
                value={formData.adminLastName}
                onChange={handleChange}
                error={errors.adminLastName}
                placeholder="Doe"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Admin Work Email"
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                error={errors.adminEmail}
                placeholder="j.doe@apex.edu"
                required
              />
              <FormField
                label="Phone Number"
                name="adminPhone"
                value={formData.adminPhone}
                onChange={handleChange}
                error={errors.adminPhone}
                placeholder="+234 801 234 5678"
                required
              />
            </div>
          </div>
        )}

        {/* Step 3: Subscription Plan Selection */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              3. Initial Subscription Tier
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((p) => {
                const isSelected = formData.planId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setFormData({ ...formData, planId: p.id })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-sm text-slate-900">{p.name}</p>
                      {isSelected && <span className="text-indigo-600 font-bold text-xs">✓</span>}
                    </div>
                    <p className="text-xl font-extrabold text-slate-900 mb-1">${p.priceMonthly}<span className="text-xs font-normal text-slate-500">/mo</span></p>
                    <p className="text-[11px] text-slate-500">Up to {p.maxStudents.toLocaleString()} Students</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <FormField
                label="Billing Cycle"
                name="billingCycle"
                isSelect
                value={formData.billingCycle}
                onChange={handleChange}
                options={[
                  { label: "Annual (10% Discount)", value: "Annual" },
                  { label: "Monthly", value: "Monthly" },
                ]}
              />
              <FormField
                label="Initial Estimated Students"
                type="number"
                name="estimatedStudents"
                value={formData.estimatedStudents}
                onChange={handleChange}
                error={errors.estimatedStudents}
                required
              />
            </div>
          </div>
        )}

        {/* Step 4: Summary & Confirmation */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              4. Review School Configuration
            </h3>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 divide-y divide-slate-200 text-xs">
              <div className="pb-3 grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold text-slate-400">School Name</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{formData.schoolName}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Workspace URL</p>
                  <p className="font-bold text-indigo-600 text-sm mt-0.5">
                    https://{formData.subdomain}.edutrac.app
                  </p>
                </div>
              </div>

              <div className="py-3 grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold text-slate-400">Primary Administrator</p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {formData.adminFirstName} {formData.adminLastName}
                  </p>
                  <p className="text-slate-500">{formData.adminEmail}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Location</p>
                  <p className="font-bold text-slate-800 mt-0.5">{formData.city}, {formData.country}</p>
                  <p className="text-slate-500">{formData.address}</p>
                </div>
              </div>

              <div className="pt-3 grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold text-slate-400">Selected SaaS Plan</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedPlan.name} ({formData.billingCycle})</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Student Capacity</p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {formData.estimatedStudents} Students allocated
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs">
              ⚠️ Completing onboarding will provision a new database tenant and send an invitation email to <strong>{formData.adminEmail}</strong> with one-time setup credentials.
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1 || isSubmitting}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-600"
        >
          ← Back
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              Provision & Launch School
            </button>
          )}
        </div>
      </div>
    </div>
  );
}