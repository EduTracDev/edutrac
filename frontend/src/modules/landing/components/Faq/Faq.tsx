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
  // First card open by default to mirror screenshot layout
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="w-full bg-gradient-to-b from-[#FAF8FF] via-[#FAF8FF] to-white pt-16 pb-24 text-left" 
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Badge Header Block */}
        <div className=" mb-16 space-y-3">
          <span className="text-center inline-block px-5 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#EFE8FC] text-[#923CF9] rounded-md">
            FAQS
          </span>
          <h2
            id="faq-heading"
            className="text-left text-3xl sm:text-4xl font-black text-[#0A1128] tracking-tight"
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordions Stack Grid Column container */}
        <div className="space-y-4 max-w-4xl mx-auto relative z-10">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className="bg-white border border-gray-200/90 rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm shadow-purple-100/10"
              >
                {/* Trigger Row Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none group"
                >
                  <span className="text-base font-bold text-[#0A1128] transition-colors duration-200 group-hover:text-[#923CF9]">
                    {item.question}
                  </span>
                  <div className={`p-1 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Collapsible content pane wrapper */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm leading-relaxed text-[#717D96] font-medium max-w-3xl">
                    {item.answer}
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