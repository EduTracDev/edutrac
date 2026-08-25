"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Check } from "lucide-react";

interface PillarItem {
  title: string;
  description: string;
}

interface JoinUsProps {
  topBanner: {
    title: string;
    joinLink: string;
    videoLink: string;
  };
  whyChooseUs: {
    badgeText: string;
    title: string;
    description: string;
    imageSrc: string;
    pillars: PillarItem[];
  };
}

export default function JoinUs({ topBanner, whyChooseUs }: JoinUsProps) {
  return (
    <section className="w-full bg-white text-left">

      {/* PART 1: Top Dark Hero Banner with Background Image Layer */}
      <div className="relative w-full overflow-hidden py-16 md:py-20 bg-[#0F1C3F]">

        {/* Next.js Background Image with Dark Color Blend Overlay Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/classroom-banner-bg.jpg" // 👈 Replace with your dark classroom texture asset path
            alt="Classroom overlay texture background"
            fill
            priority
            className="object-cover object-center opacity-20 mix-blend-luminosity"
          />
          {/* Linear gradient mask layer to achieve the deep indigo branding shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0A122C] via-[#0F1C3F]/90 to-[#1E2E5D]/80 mix-blend-multiply" />
          {/* Abstract structural grid lines overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

            {/* Left Box Title Content and CTA */}
            <div className="space-y-6 max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                {topBanner.title}
              </h2>
              <div>
                <Link
                  href={topBanner.joinLink}
                  className="inline-flex items-center justify-between bg-[#FCD34D] text-[#0F1C3F] font-extrabold px-5 py-3 rounded-full hover:bg-[#FBBF24] transition-all duration-200 shadow-md group text-sm gap-4"
                >
                  <span>Join Us</span>
                  <div className="w-6 h-6 rounded-full bg-[#0F1C3F] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Side Box: Watch Now Video Link Trigger Accent */}
            <div className="flex items-center gap-4 sm:mr-12">
              <Link
                href={topBanner.videoLink}
                className="group flex flex-col items-center gap-2 transition-transform active:scale-95 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-[#923CF9] relative transition-all duration-300 group-hover:shadow-purple-500/20 group-hover:scale-105">
                  {/* Pulse visual halo ring layers */}
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-70" />
                  <Play size={20} fill="currentColor" className="ml-1" />
                </div>
                <span className="text-xs font-bold tracking-wider text-gray-300 uppercase mt-1">
                  watch now
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* PART 2: Why Choose Us Comparison Content Matrix */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Block Content Metrics Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="bg-[#EFE8FC] text-[#923CF9] px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase inline-block">
              {whyChooseUs.badgeText}
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-[#0A1128] leading-[1.15] tracking-tight">
              Creating A Community Of <br className="hidden sm:inline" /> Life Long{" "}
              <span className="relative inline-block z-10 px-1">
                Learners
                {/* Visual Circle Line Trace Highlight Accent */}
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] w-[115%] h-[150%] text-[#923CF9] pointer-events-none -z-10"
                  viewBox="0 0 120 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5,22 C15,5 95,2 112,18 C125,32 55,42 22,40 C5,38 -2,25 25,12 C45,5 105,8 115,18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-80"
                  />
                </svg>
              </span>
              .
            </h3>

            <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-2xl">
              {whyChooseUs.description}
            </p>

            {/* Platform Pillars Quad Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {whyChooseUs.pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-[#EFE8FC]/40 border border-purple-100/40 p-5 rounded-2xl space-y-2 flex flex-col justify-start text-left transition-all duration-200 hover:bg-[#EFE8FC]/70"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#923CF9] text-white flex items-center justify-center flex-shrink-0">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <h4 className="text-xs font-extrabold text-[#0A1128] tracking-tight">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed text-gray-500">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="log-col-span-3 space-x-6"></div> */}
          {/* Right Image Frame Column */}
          <div className="lg:col-span-6 w-full relative h-[450px] sm:h-[520px]">
            <img
              src="./chooseUs.png"
              alt="Group of diverse local students collaborating and studying with folders"
              className="object-cover object-center w-full h-full"
            />
          </div>

        </div>
      </div>

    </section>
  );
}