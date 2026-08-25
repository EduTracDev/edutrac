"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlockItem {
  badge: string;
  title: string;
  description: string[];
  buttonText: string;
  buttonLink: string;
}

interface AboutProps {
  hero: BlockItem & { dashboardImage: string | StaticImageData };
  growth: BlockItem & {
    images: {
      students: string | StaticImageData;
    };
  };
  vision: {
    badge: string;
    title: string;
    physicalSchools: { title: string; description: string };
    onlineSchools: { title: string; description: string };
    mainDescription: string;
    buttonText: string;
    buttonLink: string;
  };
}

export default function AboutSection({ hero, growth, vision }: AboutProps) {
  return (
    <div className="w-full bg-white font-sans antialiased">

      {/* ----------------- SECTION 1: HERO CONTAINER ----------------- */}
      <section className="bg-[#923CF6] text-white pt-24 pb-16 lg:pt-32 lg:pb-8 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block bg-white/20 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md">
              {hero?.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              {hero?.title}
            </h1>
            <div className="text-white/80 text-sm md:text-base leading-relaxed space-y-4 max-w-xl">
              {hero?.description?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            
            {/* Safe Guarded Link Wrapping Execution */}
            {hero?.buttonLink && (
              <div className="pt-4">
                <Link
                  href={hero.buttonLink}
                  className="inline-flex items-center gap-2 bg-white text-[#923CF6] hover:bg-opacity-90 font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md group"
                >
                  {hero?.buttonText}
                  <div className="bg-[#923CF6]/10 p-1 rounded-full group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={14} className="text-[#923CF6]" />
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Right Dashboard Mockup Graphic */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out drop-shadow-2xl">
              {hero?.dashboardImage ? (
                <Image
                  src={hero.dashboardImage}
                  alt="EduTrac Dashboard Preview"
                  width={700}
                  height={500}
                  className="rounded-xl object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-80 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-white/40">
                  Dashboard Graphic Mockup Placeholder
                </div>
              )}
            </div>
          </div>

        </div>
      </section>


      {/* ----------------- SECTION 2: PERSONAL GROWTH ----------------- */}
      <section className="bg-white py-16 md:py-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side Content */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <span className="inline-block bg-[#923CF6]/10 text-[#923CF6] text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md">
              {growth?.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight">
              {growth?.title}
            </h2>
            <div className="text-[#475569] text-sm md:text-base leading-relaxed space-y-4">
              {growth?.description?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            
            {/* Safe Guarded Link Wrapping Execution */}
            {growth?.buttonLink && (
              <div className="pt-4">
                <Link
                  href={growth.buttonLink}
                  className="inline-flex items-center gap-2 bg-[#923CF6] text-white hover:bg-[#7c2fe0] font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md group"
                >
                  {growth?.buttonText}
                  <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Right Layout Image Collage */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="w-full">
              {growth?.images?.students && (
                <Image
                  src={growth.images.students}
                  alt="Students studying inside building"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

        </div>
      </section>


      {/* ----------------- SECTION 3: VISION AND MISSION ----------------- */}
      <section className="bg-white pt-10 pb-10 md:pb-8 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Heading Row Column */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <span className="inline-block bg-[#923CF6]/10 text-[#923CF6] text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md">
              {vision?.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight">
              {vision?.title}
            </h2>
          </div>
          <div className="lg:col-span-3 "></div>
          
          {/* Right Dual Column Structural Blocks */}
          <div className="lg:col-span-5 space-y-10 lg:pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Physical Schools */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  {vision?.physicalSchools?.title}
                </h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {vision?.physicalSchools?.description}
                </p>
              </div>

              {/* Online Schools */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  {vision?.onlineSchools?.title}
                </h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {vision?.onlineSchools?.description}
                </p>
              </div>
            </div>

            {/* Bottom block layout detail */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <p className="text-sm text-[#475569] leading-relaxed max-w-xl">
                {vision?.mainDescription}
              </p>
              
              {/* Safe Guarded Link Wrapping Execution */}
              {vision?.buttonLink && (
                <div>
                  <Link
                    href={vision.buttonLink}
                    className="inline-flex items-center gap-2 bg-[#923CF6] text-white hover:bg-[#7c2fe0] font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md group"
                  >
                    {vision?.buttonText}
                    <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}