"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { AuthRoutes } from "@/routes/auth.routes";

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
  return (
    <section className="py-20 bg-white" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {/* <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-[#923CF9] bg-[#923CF9]/10 rounded-md">
            PRICING
          </span>
          <h2
            id="pricing-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-8"
          >
            Choose Your Plan
          </h2>

         
          <div className="inline-flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <span className="px-8 py-2.5 text-sm font-bold text-gray-400">
              Monthly
            </span>
            <span className="px-8 py-2.5 text-sm font-bold bg-[#923CF9] text-white rounded-xl shadow-lg">
              Yearly
            </span>
          </div>
        </div> */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-[#923CF9] bg-[#923CF9]/10 rounded-md">
            PRICING
          </span>
          <h2
            id="pricing-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4"
          >
            Choose Your Plan
          </h2>
          <p className="text-gray-500 font-medium">
            Transparent pricing for schools of all sizes.{" "}
            <span className="text-[#923CF9] font-bold">
              All plans are billed yearly.
            </span>
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {items.map((plan) => (
            <Link
              key={plan.id}
              href={`${AuthRoutes.register}?plan=${plan.id}`}
              className={`relative flex flex-col rounded-[40px] transition-all duration-500 hover:scale-[1.02] group ${
                plan.isPopular
                  ? "bg-[#923CF9] text-white py-16 shadow-2xl z-20 scale-105"
                  : "bg-white border border-gray-100 text-[#0F172A] py-12 shadow-sm z-10"
              }`}
            >
              <div className="px-8 text-center mb-8">
                <h3
                  className={`text-2xl font-black mb-4 ${plan.isPopular ? "text-white" : "text-[#0F172A]"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 px-4 ${plan.isPopular ? "text-white/80" : "text-gray-500"}`}
                >
                  {plan.description}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xl font-bold self-start mt-2">₦</span>
                  <span className="text-6xl font-black tracking-tighter">
                    {plan.price}
                  </span>
                </div>
                {plan.saveAmount && (
                  <div className="mt-4 inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-bold">
                    {plan.saveAmount}
                  </div>
                )}
              </div>

              {/* Features List */}
              <div
                className={`mt-auto px-8 py-10 rounded-b-[40px] ${plan.isPopular ? "bg-white text-[#0F172A]" : "bg-gray-50/50"}`}
              >
                <ul className="space-y-4" role="list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className={`mt-1 p-0.5 rounded-full ${plan.isPopular ? "bg-[#923CF9] text-white" : "bg-[#923CF9] text-white"}`}
                      >
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <span className="text-sm font-semibold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
