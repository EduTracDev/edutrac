"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

interface MissionVisionProps {
  mission: string;
  vision: string;
}

export default function MissionVision({ mission, vision }: MissionVisionProps) {
  const cards = [
    {
      title: "Mission Statement",
      text: mission,
      icon: <Target className="text-[#923CF9]" size={32} />,
      color: "bg-[#923CF9]/10",
    },
    {
      title: "Vision Statement",
      text: vision,
      icon: <Eye className="text-[#923CF9]" size={32} />,
      color: "bg-blue-50",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all group"
            >
              <div
                className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
              >
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {card.title}
              </h3>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed italic font-medium">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
