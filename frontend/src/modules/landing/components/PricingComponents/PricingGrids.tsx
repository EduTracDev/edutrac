"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { OnboardingRoutes } from "@/routes/onboardingRoutes";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  saveAmount?: string;
  period?: string;
}

interface ReasonItem {
  title: string;
  description: string;
  iconBg: string;
}

interface PricingGridsProps {
  badge: string;
  title: string;
  subtitle: string;
  items: Plan[];
  reasons: ReasonItem[];
}

export default function PricingGrids({
  badge,
  title,
  subtitle,
  items,
  reasons,
}: PricingGridsProps) {
  return (
    <section className="py-20 bg-[#FBF7FF]" aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Header Layout Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
          <h2
            id="pricing-title"
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
          >
            {title}
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            {subtitle}
          </p>
          <div className="pt-2">
            {/* <span className="inline-block text-sm font-medium text-slate-700 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100"> */}
              {badge}
            {/* </span> */}
          </div>
        </div>

        {/* Four Column Grids Layout Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-24">
          {items.map((plan: Plan, index: number) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative flex flex-col justify-between p-6 rounded-3xl border transition-all duration-200 ${
                plan.isPopular
                  ? "bg-purple-600 border-purple-600 text-white shadow-xl scale-105 z-10"
                  : "bg-white border-slate-100 text-slate-900 shadow-sm"
              }`}
            >
              <div>
                {/* Upper Details Block */}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold ${plan.isPopular ? "text-white" : "text-slate-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-2 text-xs line-clamp-3 leading-relaxed min-h-[48px] ${
                    plan.isPopular ? "text-purple-100" : "text-slate-400"
                  }`}>
                    {plan.description}
                  </p>
                  
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <p className={`text-[11px] font-medium tracking-wide ${plan.isPopular ? "text-purple-200" : "text-slate-400"}`}>
                      Starting from
                    </p>
                    <div className="flex items-start mt-1 justify-center relative">
                      <span className="text-sm font-semibold mt-1 mr-0.5">$</span>
                      <span className="text-4xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                    </div>
                    {plan.saveAmount && (
                      <span className="mt-2 inline-block bg-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                        {plan.saveAmount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List Group Element */}
                <ul className="space-y-3 mb-8 border-t pt-6 border-slate-100/10" role="list">
                  {plan.features.map((feature: string, fIndex: number) => (
                    <li key={fIndex} className="flex items-start gap-2.5 text-xs font-medium">
                      <div className={`p-0.5 rounded-full mt-0.5 flex-shrink-0 ${
                        plan.isPopular ? "bg-white text-purple-600" : "bg-purple-100 text-purple-600"
                      }`}>
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </div>
                      <span className={plan.isPopular ? "text-purple-50" : "text-slate-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Action Bottom Anchors */}
              <Link
                href={OnboardingRoutes.plan}
                className={`w-full py-3 rounded-2xl font-semibold text-xs text-center block transition-all duration-200 ${
                  plan.isPopular
                    ? "bg-white text-purple-600 hover:bg-purple-50 shadow-md"
                    : "bg-white border border-slate-200 text-purple-600 hover:bg-slate-50"
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Section Break Separator Line */}
        <hr className="border-slate-200/60 my-16" />

        {/* Lower Features Block section ("Why Choose Our Pricing Plans?") */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Why Choose Our Pricing Plans?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pb-12">
          {reasons.map((reason, rIdx) => (
            <div
              key={rIdx}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start"
            >
              <div className={`w-10 h-10 rounded-xl ${reason.iconBg} flex items-center justify-center mb-6`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}