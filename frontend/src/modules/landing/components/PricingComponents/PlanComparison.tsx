"use client";

import React from "react";
import { Check, Minus } from "lucide-react";

interface Feature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface Category {
  name: string;
  features: Feature[];
}

interface PlanComparisonProps {
  title: string;
  subtitle: string;
  categories: Category[];
}

export default function PlanComparison({
  title,
  subtitle,
  categories,
}: PlanComparisonProps) {
  const renderValue = (val: boolean | string) => {
    if (val === true)
      return (
        <Check className="text-[#923CF9] mx-auto" size={20} strokeWidth={3} />
      );
    if (val === false)
      return <Minus className="text-gray-300 mx-auto" size={20} />;
    return <span className="text-sm font-semibold text-gray-700">{val}</span>;
  };

  return (
    <section
      className="py-24 bg-gray-50/50"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="comparison-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4"
          >
            {title}
          </h2>
          <p className="text-gray-500 font-medium">{subtitle}</p>
        </div>

        <div className="overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-sm">
          {/* Desktop Table View */}
          <div className="hidden md:block max-h-[800px] overflow-y-auto overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse text-center">
              <thead className="sticky top-0 z-30 shadow-sm">
                <tr className="bg-white border-b border-gray-100">
                  <th className="py-8 px-6 text-left text-lg font-bold text-gray-400 bg-white">
                    Features
                  </th>
                  <th className="py-8 px-6 text-xl font-black text-gray-900 bg-white">
                    Pro
                  </th>
                  <th className="py-8 px-6 text-xl font-black text-[#923CF9] bg-[#923CF9]/5 relative">
                    Basic
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#923CF9]" />
                  </th>
                  <th className="py-8 px-6 text-xl font-black text-gray-900 bg-white">
                    Enterprise
                  </th>
                </tr>
              </thead>

              {/* Correctly Typed Maps */}
              {categories.map((category: Category, catIdx: number) => (
                <tbody key={catIdx}>
                  <tr className="bg-gray-50/50 sticky top-[92px] z-20">
                    {/* Sub-headers can also be sticky if the list is very long */}
                    <td
                      colSpan={4}
                      className="py-4 px-6 text-left font-bold text-xs uppercase tracking-[0.2em] text-[#923CF9] bg-gray-50/80 backdrop-blur-sm"
                    >
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature: Feature, fIdx: number) => (
                    <tr
                      key={fIdx}
                      className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="py-5 px-6 text-left text-sm font-semibold text-gray-600">
                        {feature.name}
                      </td>
                      <td className="py-5 px-6">{renderValue(feature.pro)}</td>
                      <td className="py-5 px-6 bg-[#923CF9]/5">
                        {renderValue(feature.basic)}
                      </td>
                      <td className="py-5 px-6">
                        {renderValue(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>

          {/* Mobile Feature List View */}
          <div className="md:hidden divide-y divide-gray-100">
            {categories.map((category: Category, catIdx: number) => (
              <div key={catIdx} className="p-6">
                <h3 className="text-[#923CF9] font-bold text-xs uppercase tracking-widest mb-4">
                  {category.name}
                </h3>
                <div className="space-y-6">
                  {category.features.map((feature: Feature, fIdx: number) => (
                    <div key={fIdx} className="space-y-2">
                      <p className="text-sm font-bold text-gray-900">
                        {feature.name}
                      </p>
                      <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-2xl">
                        <div className="text-center border-r border-gray-200">
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                            Pro
                          </p>
                          {renderValue(feature.pro)}
                        </div>
                        <div className="text-center border-r border-gray-200 bg-[#923CF9]/10 rounded-lg py-1">
                          <p className="text-[10px] text-[#923CF9] font-bold uppercase mb-1">
                            Basic
                          </p>
                          {renderValue(feature.basic)}
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                            Ent.
                          </p>
                          {renderValue(feature.enterprise)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
