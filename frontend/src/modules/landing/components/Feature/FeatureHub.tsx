"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface FeatureDetail {
  title: string;
  description: string;
  image: string;
  benefits: string[];
  isReversed?: boolean;
}

interface FeatureHubProps {
  mainTitle: string;
  badge: string;
  features: FeatureDetail[];
}

export default function FeatureHub({
  features,
  badge,
  mainTitle,
}: FeatureHubProps) {
  return (
    <section
      className="py-24 bg-white space-y-32"
      aria-label="Product Features"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-[#923CF9]/10 text-[#923CF9] rounded-full">
            {badge}
          </span>
          <h2
            id="features-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight"
          >
            {mainTitle}
          </h2>
        </div>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32 last:mb-0 ${
              feature.isReversed ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: feature.isReversed ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {feature.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-3" role="list">
                {feature.benefits.map((benefit, bIndex) => (
                  <li
                    key={bIndex}
                    className="flex items-center gap-3 text-slate-700 font-medium"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-[#923CF9]"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visual Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="relative rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 bg-slate-50 aspect-video flex items-center justify-center">
                <span className="text-slate-400 font-bold italic text-center px-4">
                  [Screenshot: {feature.title}]
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
