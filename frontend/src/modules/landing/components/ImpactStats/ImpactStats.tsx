"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: string; // e.g., "50k+" or "95%"
}
interface StatItem {
  label: string;
  value: string;
}

interface ImpactStatsProps {
  title: string;
  stats: StatItem[];
}

function Counter({ value }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  // Changing once to false makes it run every time it comes into view
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const isSpecialCase = value === "24/7";
  // Extract the number from the string (e.g., "50" from "50k+")
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView && !isSpecialCase) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    } else if (!isInView) {
      // Reset the value when it leaves the screen
      setDisplayValue(0);
    }
  }, [isInView, numericValue, isSpecialCase]);

  return (
    <span ref={ref} aria-live="polite">
      {isSpecialCase ? value : `${displayValue}${suffix}`}
    </span>
  );
}

export default function ImpactStats({ title, stats }: ImpactStatsProps) {
  return (
    <section
      className="py-24 bg-[#923CF9]/5 border-y border-[#923CF9]/10"
      aria-labelledby="impact-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 id="impact-title" className="sr-only">
          {title}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => {
            const isAlwaysOn = stat.value === "24/7";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }} // Re-triggers on scroll
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group text-center"
                role="group"
                aria-label={`${stat.value} ${stat.label}`}
              >
                <div className="relative z-10">
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-[#923CF9] mb-3 tracking-tight"
                    // Pulse animation for 24/7
                    animate={
                      isAlwaysOn
                        ? {
                            scale: [1, 1.05, 1],
                            opacity: [1, 0.8, 1],
                          }
                        : {}
                    }
                    transition={
                      isAlwaysOn
                        ? {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                        : {}
                    }
                  >
                    <Counter value={stat.value} />
                  </motion.div>

                  <div className="h-1 w-12 bg-[#923CF9]/20 mx-auto mb-4 rounded-full" />

                  <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
