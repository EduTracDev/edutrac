/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Check, Zap, Shield, Crown, Loader2 } from "lucide-react";
import client, { ApiMethods } from "@/utils/client";

export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  features: string[];
  actual_price: number;
  discount: number;
  maxUsers: number;
  maxRoles: number;
  maxStorageMb: number;
  allowsAdvancedAnalytics: boolean;
}

interface PricingApiResponse {
  success: boolean | string;
  message: string;
  data: PricingPlan[];
}

export const PlanSelection = ({
  onSelect,
}: {
  onSelect: (planId: number) => void;
}) => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await client.request<undefined, PricingApiResponse>({
          path: "/api/v1/pricing",
          method: ApiMethods.GET,
        });

        if (response && response.data && Array.isArray(response.data)) {
          setPlans(response.data);
          // Set default selected plan (e.g. Pro or the second item)
          if (response.data.length > 0) {
            const defaultPlan =
              response.data.find((p) => p.name.toLowerCase() === "pro") ||
              response.data[0];
            setSelectedPlanId(defaultPlan.id);
          }
        } else {
          setError("Failed to fetch pricing plans.");
        }
      } catch (err: any) {
        console.error("Error fetching pricing:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load pricing plans.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  // Visual helper mapping based on plan name
  const getPlanVisuals = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("basic")) {
      return {
        icon: Shield,
        color: "text-slate-400",
        border: "border-slate-100",
        popular: false,
      };
    }
    if (lowerName.includes("pro")) {
      return {
        icon: Zap,
        color: "text-[#923CF9]",
        border: "border-[#923CF9]",
        popular: true,
      };
    }
    if (lowerName.includes("ultra")) {
      return {
        icon: Crown,
        color: "text-amber-500",
        border: "border-amber-100",
        popular: false,
      };
    }
    return {
      icon: Shield,
      color: "text-slate-400",
      border: "border-slate-100",
      popular: false,
    };
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `₦${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-[#923CF9] animate-spin mb-4" />
        <p className="text-slate-500 text-sm font-medium">
          Loading pricing plans...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-[#923CF9] text-white text-xs font-bold rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {plans.map((plan) => {
        const visuals = getPlanVisuals(plan.name);
        const Icon = visuals.icon;
        const isSelected = selectedPlanId === plan.id;

        return (
          <div
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={`relative p-8 rounded-[48px] border-2 cursor-pointer transition-all duration-300 ${
              isSelected
                ? `${visuals.border} bg-white shadow-2xl shadow-purple-100 scale-[1.02]`
                : "border-transparent bg-slate-50 hover:bg-white hover:border-slate-100"
            }`}
          >
            {visuals.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#923CF9] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                Most Popular
              </div>
            )}

            <div className="flex flex-col h-full">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  isSelected
                    ? "bg-slate-900 text-white"
                    : `bg-white ${visuals.color}`
                }`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-xl font-black text-slate-800">{plan.name}</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">
                {plan.description}
              </p>

              <div className="my-8">
                <span className="text-4xl font-black text-slate-800">
                  {formatPrice(plan.actual_price)}
                </span>
                {plan.actual_price > 0 && (
                  <span className="text-sm font-bold text-slate-400">
                    /term
                  </span>
                )}
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
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
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(plan.id);
                }}
                className={`w-full py-4 cursor-pointer rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xl"
                    : "bg-white border border-slate-200 text-slate-400 hover:border-[#923CF9] hover:text-[#923CF9]"
                }`}
              >
                Select {plan.name}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
