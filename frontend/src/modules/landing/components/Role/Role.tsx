"use client";

import React, { useState } from "react";
import { BookOpen, GraduationCap, Users, ShieldCheck } from "lucide-react";

interface RoleProps {
  items: {
    id: string;
    title: string;
    description: string;
  }[];
}

export default function Role({ items }: RoleProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const defaultId = "teacher";

  const getIcon = (id: string) => {
    switch (id) {
      case "admin":
        return <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />;
      case "teacher":
        return <BookOpen className="w-8 h-8 md:w-10 md:h-10" />;
      case "student":
        return <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />;
      case "parent":
        return <Users className="w-8 h-8 md:w-10 md:h-10" />;
      default:
        return <ShieldCheck className="w-8 h-8" />;
    }
  };

  return (
    <section
      className="py-16 md:py-24 bg-[#F8F9FA]"
      aria-labelledby="role-section-title"
    >
      {/* Adding custom keyframes for the pulse and draw effect */}
      <style jsx>{`
        @keyframes subtlePulse {
          0% {
            transform: scale(1) rotate(-2deg);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05) rotate(-1deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(-2deg);
            opacity: 0.7;
          }
        }
        .animate-oval {
          animation: subtlePulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#923CF9] bg-[#923CF9]/10 rounded">
            ROLE-BASED OVERVIEWS
          </span>
          <h2
            id="role-section-title"
            className="text-2xl md:text-4xl font-extrabold text-[#0F172A] leading-tight max-w-2xl mx-auto"
          >
            Your Complete{" "}
            <span className="relative inline-block px-2">
              Learning
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                strokeDasharray="250"
                className="absolute -inset-x-2 -inset-y-4 w-[110%] h-[140%] text-[#923CF9] pointer-events-none animate-oval"
              >
                <ellipse
                  cx="50"
                  cy="50"
                  rx="48"
                  ry="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Management Solution.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((role) => {
            const isHighlighted = hoveredId
              ? hoveredId === role.id
              : defaultId === role.id;

            return (
              <div
                key={role.id}
                onMouseEnter={() => setHoveredId(role.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`text-left relative flex flex-col p-8 rounded-4xl transition-all duration-500 ease-out cursor-default 
                  ${
                    isHighlighted
                      ? "bg-[#923CF9] text-white shadow-2xl scale-105 z-20 -translate-y-4"
                      : "bg-[#EBE4FF] text-[#0F172A] z-10 translate-y-0"
                  }`}
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-8 transition-colors duration-500 ${
                    isHighlighted
                      ? "bg-white text-[#923CF9]"
                      : "bg-[#923CF9] text-white"
                  }`}
                >
                  {getIcon(role.id)}
                </div>

                <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-tight">
                  {role.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed opacity-90 font-medium">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
