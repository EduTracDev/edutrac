"use client";
import { Check, Zap, Shield, Crown } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    tagline: "For small home-schools",
    features: [
      "Up to 50 Students",
      "Attendance Tracking",
      "Basic Report Cards",
      "Email Support",
    ],
    icon: Shield,
    color: "text-slate-400",
    border: "border-slate-100",
  },
  {
    id: "pro",
    name: "Pro",
    price: "₦25,000",
    period: "/term",
    tagline: "Perfect for growing schools",
    features: [
      "Unlimited Students",
      "Billing & Fees Management",
      "Parent Portal Access",
      "Result Analytics",
      "Priority Support",
    ],
    icon: Zap,
    color: "text-[#923CF9]",
    border: "border-[#923CF9]",
    popular: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "₦50,000",
    period: "/term",
    tagline: "Full-scale enterprise power",
    features: [
      "Everything in Pro",
      "Custom Domain",
      "Biometric Integration",
      "Inventory Management",
      "Dedicated Account Manager",
    ],
    icon: Crown,
    color: "text-amber-500",
    border: "border-amber-100",
  },
];

export const PlanSelection = ({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) => {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => setSelectedPlan(plan.id)}
          className={`relative p-8 rounded-[48px] border-2 cursor-pointer transition-all duration-300 ${
            selectedPlan === plan.id
              ? `${plan.border} bg-white shadow-2xl shadow-purple-100 scale-[1.02]`
              : "border-transparent bg-slate-50 hover:bg-white hover:border-slate-100"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#923CF9] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              Most Popular
            </div>
          )}

          <div className="flex flex-col h-full">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                selectedPlan === plan.id
                  ? "bg-slate-900 text-white"
                  : `bg-white ${plan.color}`
              }`}
            >
              <plan.icon size={24} />
            </div>

            <h3 className="text-xl font-black text-slate-800">{plan.name}</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">
              {plan.tagline}
            </p>

            <div className="my-8">
              <span className="text-4xl font-black text-slate-800">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm font-bold text-slate-400">
                  {plan.period}
                </span>
              )}
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      selectedPlan === plan.id
                        ? "bg-[#923CF9] text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 leading-tight">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelect(plan.id)}
              className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedPlan === plan.id
                  ? "bg-slate-900 text-white shadow-xl"
                  : "bg-white border border-slate-200 text-slate-400 hover:border-[#923CF9] hover:text-[#923CF9]"
              }`}
            >
              Select {plan.name}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
