"use client";

import React, { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import client, { ApiMethods } from "@/utils/client";
import { AuthRoutes } from "@/routes/auth.routes";

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

export default function Pricing() {
  const router = useRouter();
  // Toggle switch billing system state hook (Commented out per requirement)
  // const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        } else {
          setError("Failed to fetch pricing plans.");
        }
      } catch (err: any) {
        console.error("Error fetching pricing:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load pricing plans."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const handleSelectPlan = (planId: number) => {
    const registerUrl = `${AuthRoutes.register || "/auth/register"}?packagePlanId=${planId}`;
    router.push(registerUrl);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `₦${price.toLocaleString()}`;
  };

  return (
    <section className="py-24 bg-white text-left" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header elements block wrapper */}
        <div className="text-center mb-12 space-y-4">
          <span className="bg-[#EFE8FC] text-[#923CF9] px-3 py-1 rounded-md text-[10px] font-bold tracking-widest inline-block">
            PRICING
          </span>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-black text-[#0A1128] tracking-tight">
            Creating A Community Of <br /> Life Long Learners.
          </h2>
        </div>

        {/* Dynamic Billing Switcher Selector Bar Element Frame */}
        {/*
        <div className="flex justify-center mb-16">
          <div className="bg-[#FAF9FC] p-1.5 rounded-2xl flex items-center shadow-inner border border-gray-100/50">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-white text-[#0A1128] shadow-md"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-[#923CF9] text-white shadow-md"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        */}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#923CF9] animate-spin mb-4" />
            <p className="text-gray-500 text-sm font-medium">
              Loading pricing plans...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 max-w-md mx-auto">
            <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#923CF9] text-white text-xs font-bold rounded-xl hover:bg-[#7B2ED1] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Core Pricing Plan Cards Structural Responsive Flex Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {plans.map((plan) => {
              const isFeatured = plan.name.toLowerCase().includes("pro");

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-[40px] flex flex-col justify-between transition-all duration-300 border ${
                    isFeatured
                      ? "bg-[#923CF9] text-white border-transparent shadow-2xl shadow-purple-200/60 lg:-translate-y-4 pt-12 pb-8"
                      : "bg-white text-[#0A1128] border-gray-100 shadow-xl shadow-gray-100/40 py-12"
                  }`}
                >
                  {/* Visual Curvature Wave Mask Overlay backing structure (Only for featured component cards) */}
                  {isFeatured && (
                    <div className="absolute inset-x-0 top-[22%] h-[120px] overflow-hidden pointer-events-none z-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 C30,20 70,80 100,50 L100,100 L0,100 Z" fill="currentColor" />
                      </svg>
                    </div>
                  )}

                  {/* Upper Module Container: Meta & Pricing data */}
                  <div className="px-6 sm:px-8 text-center space-y-4 relative z-10">
                    <h3 className={`text-3xl font-black ${isFeatured ? "text-white" : "text-[#0A1128]"}`}>
                      {plan.name}
                    </h3>
                    
                    <p className={`text-xs leading-relaxed font-semibold max-w-xs mx-auto ${
                      isFeatured ? "text-purple-100/90" : "text-gray-400"
                    }`}>
                      {plan.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isFeatured ? "text-purple-200" : "text-gray-400"
                      }`}>
                        Starting from
                      </span>
                      <div className="flex items-baseline justify-center text-[#0A1128] gap-1">
                        <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isFeatured ? "text-white" : "text-[#0A1128]"}`}>
                          {formatPrice(plan.actual_price)}
                        </span>
                        {plan.actual_price > 0 && (
                          <span className={`text-xs font-semibold ${isFeatured ? "text-purple-200" : "text-gray-400"}`}>
                            /term
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Savings Pill Accent Element */}
                    {plan.discount > 0 && (
                      <div className="pt-2">
                        <span className="inline-block bg-white/15 text-white font-bold text-[10px] px-4 py-1 rounded-md tracking-wide">
                          Save {plan.discount}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Lower Module Container: Feature Checklist Matrix block */}
                  <div className="mt-8 px-5 sm:px-6 relative z-10 flex-1 flex flex-col">
                    <div className={`p-6 rounded-[32px] flex-1 flex flex-col justify-between ${isFeatured ? "bg-white text-[#0A1128]" : "bg-[#FAF9FC]"}`}>
                      <ul className="space-y-4" role="list">
                        {plan.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#923CF9] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-purple-200">
                              <Check size={11} strokeWidth={3} />
                            </div>
                            <span className="text-xs font-bold text-gray-700 leading-snug">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Click CTA Button Layer */}
                      <div className="mt-8">
                        <button
                          type="button"
                          onClick={() => handleSelectPlan(plan.id)}
                          className={`w-full py-3.5 rounded-2xl text-xs font-black tracking-wide block text-center cursor-pointer transition-all ${
                            isFeatured
                              ? "bg-[#923CF9] text-white shadow-lg shadow-purple-200 hover:bg-[#7B2ED1]"
                              : "bg-white text-[#0A1128] border border-gray-200 hover:bg-gray-50 shadow-sm"
                          }`}
                        >
                          Choose {plan.name}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}