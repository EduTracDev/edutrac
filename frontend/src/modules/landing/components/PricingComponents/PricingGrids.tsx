"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  saveAmount?: string;
}

interface PricingGridsProps {
  badge: string;
  title: string;
  items: Plan[];
}

export default function PricingGrids({
  badge,
  title,
  items,
}: PricingGridsProps) {
  return (
    <section className="py-24 bg-white" aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-6 pt-16 lg:pt-20">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-[#923CF9]/10 text-[#923CF9] text-xs font-bold uppercase tracking-widest rounded-full">
            {badge}
          </span>
          <h2
            id="pricing-title"
            className="text-4xl md:text-5xl font-extrabold text-slate-900"
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((plan: Plan, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-[32px] border ${
                plan.isPopular
                  ? "border-[#923CF9] shadow-xl"
                  : "border-slate-200"
              }`}
            >
              {plan.isPopular && (
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#923CF9] text-white px-4 py-1 rounded-full text-xs font-bold uppercase"
                  aria-label="Most popular plan"
                >
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-slate-900">
                      {plan.price === "Custom" ? "" : "₦"}
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="ml-1 text-slate-500 font-medium">
                        /year
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#923CF9] uppercase tracking-tighter mt-1 font-bold">
                    Billed annually
                  </p>
                </div>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8" role="list">
                {plan.features.map((feature: string, fIndex: number) => (
                  <li
                    key={fIndex}
                    className="flex items-start gap-3 text-slate-700 text-sm"
                  >
                    <Check
                      size={18}
                      className="text-[#923CF9] mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.isPopular
                    ? "bg-[#923CF9] text-white hover:bg-[#7a2dd4]"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.buttonText}
              </button> */}
              <Link
                href={`${AuthRoutes.register}?plan=${plan.id}`}
                className={`w-full py-4 rounded-xl font-bold transition-all text-center block ${
                  plan.isPopular
                    ? "bg-[#923CF9] text-white hover:bg-[#7a2dd4] shadow-lg shadow-[#923CF9]/20"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
