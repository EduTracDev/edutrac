"use client";

import React, { useState } from "react";

type SaaSPlan = {
  name: string;
  isPopular: boolean;
  priceMonthly: number;
  priceAnnual: number;
  maxStudents: number;
  maxTeachers: number;
  maxStorageGB: number;
  features: string[];
};

interface PlanCardProps {
  plan: SaaSPlan;
  onUpdatePlan: (updatedPlan: SaaSPlan) => void;
}

export function PlanCard({ plan, onUpdatePlan }: PlanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<SaaSPlan>(plan);

  const handleSave = () => {
    onUpdatePlan(formData);
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-xl border p-6 flex flex-col justify-between relative shadow-sm ${
        plan.isPopular ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200"
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-extrabold uppercase bg-indigo-600 text-white rounded-full tracking-wider shadow-sm">
          Most Popular
        </span>
      )}

      {isEditing ? (
        /* Edit Mode Form */
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500">Plan Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full text-sm font-bold p-2 border border-slate-300 rounded-lg mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500">Monthly ($)</label>
              <input
                type="number"
                value={formData.priceMonthly}
                onChange={(e) => setFormData({ ...formData, priceMonthly: Number(e.target.value) })}
                className="w-full text-sm p-2 border border-slate-300 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500">Annual ($)</label>
              <input
                type="number"
                value={formData.priceAnnual}
                onChange={(e) => setFormData({ ...formData, priceAnnual: Number(e.target.value) })}
                className="w-full text-sm p-2 border border-slate-300 rounded-lg mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500">Max Students</label>
              <input
                type="number"
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: Number(e.target.value) })}
                className="w-full text-sm p-2 border border-slate-300 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500">Storage (GB)</label>
              <input
                type="number"
                value={formData.maxStorageGB}
                onChange={(e) => setFormData({ ...formData, maxStorageGB: Number(e.target.value) })}
                className="w-full text-sm p-2 border border-slate-300 rounded-lg mt-1"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              Save Tier
            </button>
            <button
              onClick={() => {
                setFormData(plan);
                setIsEditing(false);
              }}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Read Mode Display */
        <>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500">Cap: {plan.maxStudents.toLocaleString()} Students</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Edit Tier
              </button>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900">${plan.priceMonthly}</span>
              <span className="text-xs font-medium text-slate-500">/ month</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1 text-xs text-slate-600 border border-slate-100">
              <p className="flex justify-between">
                <span>Annual Billing:</span>
                <strong className="text-slate-800">${plan.priceAnnual}/yr</strong>
              </p>
              <p className="flex justify-between">
                <span>Max Teachers:</span>
                <strong className="text-slate-800">{plan.maxTeachers}</strong>
              </p>
              <p className="flex justify-between">
                <span>Storage Limit:</span>
                <strong className="text-slate-800">{plan.maxStorageGB} GB</strong>
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Included Features</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}