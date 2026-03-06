"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100 rounded-md">
            FAQs
          </span>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-extrabold text-gray-900"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-300 ${
                openIndex === index
                  ? "border-purple-200 shadow-sm"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left group outline-none"
              >
                <span
                  className={`text-lg font-bold ${
                    openIndex === index ? "text-purple-600" : "text-gray-900"
                  }`}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-180 text-purple-600"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-6 md:px-6 md:pb-7 text-gray-500">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
