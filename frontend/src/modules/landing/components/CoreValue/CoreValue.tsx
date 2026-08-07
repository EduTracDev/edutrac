"use client";

import React from "react";
import { motion } from "framer-motion";

interface ValueItem {
  title: string;
  description: string;
}

interface CoreValuesProps {
  badge: string;
  title: string;
  values: ValueItem[];
}

export default function CoreValues({ badge, title, values }: CoreValuesProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto bg-[#923CF9] rounded-[48px] p-12 md:p-20 text-center">
        <div className="mb-16 space-y-6">
          <div className="inline-block px-8 py-2 border border-white/40 rounded-full">
            <span className="text-white text-sm font-semibold uppercase tracking-widest">
              {badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            {title}
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-10 rounded-[32px] text-left shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
