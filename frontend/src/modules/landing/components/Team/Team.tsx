// TeamSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string | StaticImageData;
}

interface TeamProps {
  badge: string;
  title: string;
  description?: string;
  members: TeamMember[];
}

export default function TeamSection({ badge, title, description, members }: TeamProps) {
  return (
    <section className="py-20 md:py-16 bg-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        
        {/* Header Stack */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="inline-block bg-[#923CF6]/10 text-[#923CF6] text-[10px] md:text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md">
            {badge}
          </span>
          <h2
            id="team-heading"
            className="text-4xl md:text-5xl font-extrabold text-[#0F172A] uppercase tracking-tight"
          >
            {title}
          </h2>
          {description && (
            <p className="text-[13px] md:text-[13px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* 5-Member Circular Flex Grid Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6 pt-6 items-start justify-center">
          {members?.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-2 group">
              
              {/* Circular Wrapper Frame with Peach/Warm Tint Underlay */}
              <div className="relative w-full aspect-square max-w-[190px] rounded-full overflow-hidden bg-[#F2D0B6] shadow-sm transition-transform duration-300 group-hover:scale-105">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center pt-4"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
              </div>

              {/* Identity Descriptions Text Stack */}
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0F172A] tracking-tight">
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-[#6A82A4]">
                  {member.role}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}