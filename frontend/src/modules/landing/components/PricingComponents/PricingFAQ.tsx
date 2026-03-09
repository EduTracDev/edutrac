"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PricingFAQ({ title, subtitle, questions }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] mb-4">
            {title}
          </h2>
          <p className="text-gray-500">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {questions.map((item: any, idx: number) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="font-bold text-[#0F172A]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={`faq-answer-${idx}`}
                className={`transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-40 p-6 pt-0 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
