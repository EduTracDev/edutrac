"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

interface ReasonItem {
  title: string;
  description: string;
  iconBg: string;
}

interface PricingGridsProps {
  badge: string;
  title: string;
  subtitle: string;
  reasons: ReasonItem[];
}

export default function PricingGrids({
  badge,
  title,
  subtitle,
  reasons,
}: PricingGridsProps) {
  const router = useRouter();
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
            <span className="inline-block text-xs font-semibold text-purple-700 bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
              {badge}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 mb-24">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
            <p className="text-slate-500 text-sm font-medium">
              Loading pricing plans...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 max-w-md mx-auto mb-24">
            <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-xl hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* 3-Column Grid Layout */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24 max-w-6xl mx-auto">
            {plans.map((plan: PricingPlan, index: number) => {
              const isPopular = plan.name.toLowerCase().includes("pro");

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 ${
                    isPopular
                      ? "bg-purple-600 border-purple-600 text-white shadow-2xl scale-105 z-10"
                      : "bg-white border-slate-100 text-slate-900 shadow-sm hover:shadow-md"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Upper Details Block */}
                    <div className="text-center mb-6">
                      <h3
                        className={`text-2xl font-bold ${
                          isPopular ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`mt-2 text-xs line-clamp-3 leading-relaxed min-h-[48px] ${
                          isPopular ? "text-purple-100" : "text-slate-400"
                        }`}
                      >
                        {plan.description}
                      </p>

                      <div className="mt-6 flex flex-col items-center justify-center">
                        <p
                          className={`text-[11px] font-medium tracking-wide ${
                            isPopular ? "text-purple-200" : "text-slate-400"
                          }`}
                        >
                          Starting from
                        </p>
                        <div className="flex items-baseline mt-1 justify-center gap-1">
                          <span className="text-4xl font-extrabold tracking-tight">
                            {formatPrice(plan.actual_price)}
                          </span>
                          {plan.actual_price > 0 && (
                            <span
                              className={`text-xs font-semibold ${
                                isPopular ? "text-purple-200" : "text-slate-400"
                              }`}
                            >
                              /term
                            </span>
                          )}
                        </div>
                        {plan.discount > 0 && (
                          <span className="mt-2 inline-block bg-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                            Save {plan.discount}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features List */}
                    <ul
                      className="space-y-3 mb-8 border-t pt-6 border-slate-100/10"
                      role="list"
                    >
                      {plan.features?.map((feature: string, fIndex: number) => (
                        <li
                          key={fIndex}
                          className="flex items-start gap-2.5 text-xs font-medium"
                        >
                          <div
                            className={`p-0.5 rounded-full mt-0.5 flex-shrink-0 ${
                              isPopular
                                ? "bg-white text-purple-600"
                                : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            <Check size={12} strokeWidth={3} aria-hidden="true" />
                          </div>
                          <span
                            className={
                              isPopular ? "text-purple-50" : "text-slate-600"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Select Action Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs text-center cursor-pointer transition-all duration-200 ${
                      isPopular
                        ? "bg-white text-purple-600 hover:bg-purple-50 shadow-md"
                        : "bg-purple-600 text-white hover:bg-purple-700 shadow-sm"
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

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
              <div
                className={`w-10 h-10 rounded-xl ${reason.iconBg} flex items-center justify-center mb-6`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3"
                  />
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