"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface RoleItem {
  id: string;
  title: string;
  description: string;
  isActive?: boolean;
}

interface HeroProps {
  badgeText: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  roles: RoleItem[];
}

export default function Hero({
  badgeText,
  title,
  description,
  buttonText,
  buttonLink,
  roles,
}: HeroProps) {
  return (
    <section className="w-full overflow-hidden">
      {/* 1. TOP SECTION: Hero Content & Images */}
      <div className="relative w-full pt-32 pb-20 bg-white">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="./hero-background.png"
            alt="hero-background"
            className="absolute bottom-0 left-0 w-full min-w-[1440px] h-auto opacity-90 text-[#923CF9]/10"
          />
        </div>

        <div className="max-w-7xl font-source-sans mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[#923CF9] text-xs font-bold uppercase tracking-wider block">
                {badgeText}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A1128] tracking-tight leading-[1.15]">
                {title}
              </h1>
              <p className="text-[13px] sm:text-[13px] text-[#5C6479] max-w-[420px] leading-relaxed">
                {description}
              </p>
              <div className="pt-2">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center justify-between bg-[#923CF9] text-white font-semibold px-6 py-3.5 rounded-3xl transition-all duration-200 hover:bg-[#7B2ED1] hover:shadow-lg hover:shadow-purple-200 group gap-3 text-sm"
                >
                  {buttonText}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 mt-12 lg:mt-0">
              <div className="">
                <Image
                  src="/heroFirstImg.png"
                  alt="Students studying in library"
                  priority
                  className="object-cover"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: Role Based Solutions Grid */}
      <div className="w-full bg-[#F8F4F5] py-20 border-t border-purple-100/30">
        <div className="max-w-7xl font-source-sans mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="space-y-3">
              <span className="bg-[#EFE8FC] text-[#923CF9] px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase inline-block">
                ROLE-BASED OVERVIEWS
              </span>
              <h2 className="font-epilogue text-3xl sm:text-4xl font-extrabold text-[#0A1128] max-w-2xl mx-auto leading-snug">
                Your Complete{" "}
                <span className="relative inline-block z-10 px-1">
                  Education
                  <img
                    src="/underline.svg"
                    alt="underline"
                    width={127}
                    height={49}
                    className="absolute left-0 bottom-0 object-contain text-[#923CF9]/40 -z-10"
                  />
                </span>{" "}
                Management Solution.
              </h2>
            </div>

            {/* Role Blocks Container with Hover Interactivity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {roles.map((role) => {
                return (
                  <div
                    key={role.id}
                    className="group relative p-8 rounded-3xl text-left flex flex-col justify-between min-h-[260px] bg-[#EFE8FC]/40 text-[#0A1128] border border-purple-100/50 transition-all duration-300 ease-in-out hover:bg-[#923CF9] hover:text-white hover:border-transparent hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1"
                  >
                    <div>
                      {/* Icon wrapper toggles colors on parent hover */}
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-[#EEDEFF] text-white transition-all duration-300 ease-in-out group-hover:bg-white group-hover:text-[#923CF9]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="14" width="8" height="8" rx="1" />
                          <rect x="14" y="14" width="8" height="8" rx="1" />
                          <rect x="8" y="2" width="8" height="8" rx="1" />
                          <path d="M6 17h1" />
                          <path d="M18 17h1" />
                          <path d="M12 5h1" />
                        </svg>
                      </div>

                      <h3 className="text-xs font-black tracking-widest mb-3 text-[#0A1128]/80 transition-colors duration-300 group-hover:text-purple-100">
                        {role.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#5C6479] transition-colors duration-300 group-hover:text-purple-50">
                        {role.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
