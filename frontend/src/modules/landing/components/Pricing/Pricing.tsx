// Pricing.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { OnboardingRoutes } from "@/routes/onboardingRoutes";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  isPopular?: boolean;
  saveAmount?: string;
  features: string[];
}

export default function Pricing({ items }: { items: PricingPlan[] }) {
  // Toggle switch billing system state hook
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

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

        {/* Core Pricing Plan Cards Structural Responsive Flex Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {items.map((plan) => {
            const isFeatured = plan.isPopular;
            
            // Adjust calculation dynamically if user switches state configurations
            const displayedPrice = billingCycle === "monthly" 
              ? String(parseFloat(plan.price) * 1.2) // Mock buffer variable addition
              : plan.price;

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
                    {isFeatured && (
                      <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider block">
                        Starting from
                      </span>
                    )}
                    <div className="flex items-start justify-center text-[#0A1128]">
                      <span className={`text-sm font-bold mt-2 ${isFeatured ? "text-purple-200" : "text-gray-400"}`}>$</span>
                      <span className={`text-6xl font-black tracking-tight ${isFeatured ? "text-white" : "text-[#0A1128]"}`}>
                        {displayedPrice}
                      </span>
                    </div>
                  </div>

                  {/* Savings Pill Accent Element */}
                  {plan.saveAmount && billingCycle === "yearly" && (
                    <div className="pt-2">
                      <span className="inline-block bg-white/15 text-white font-bold text-[10px] px-4 py-1 rounded-md tracking-wide">
                        {plan.saveAmount}
                      </span>
                    </div>
                  )}
                </div>

                {/* Lower Module Container: Feature Checklist Matrix block */}
                <div className={`mt-8 px-5 sm:px-6 relative z-10 flex-1 flex flex-col`}>
                  <div className={`p-6 rounded-[32px] flex-1 ${isFeatured ? "bg-white text-[#0A1128]" : "bg-[#FAF9FC]"}`}>
                    <ul className="space-y-4" role="list">
                      {plan.features.map((feature, idx) => (
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
                      <Link
                        href={OnboardingRoutes.plan}
                        className={`w-full py-3.5 rounded-2xl text-xs font-black tracking-wide block text-center transition-all ${
                          isFeatured
                            ? "bg-[#923CF9] text-white shadow-lg shadow-purple-200 hover:bg-[#7B2ED1]"
                            : "bg-white text-[#0A1128] border border-gray-200 hover:bg-gray-50 shadow-sm"
                        }`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}