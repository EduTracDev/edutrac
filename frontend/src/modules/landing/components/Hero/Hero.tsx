"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dashboardScreenshot from "@/modules/shared/assets/images/DASHBOARD.png";
interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function Hero({
  title,
  description,
  buttonText,
  buttonLink,
}: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-[#923CF9] overflow-hidden pt-40 pb-16 lg:pt-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="z-10 text-white space-y-6 lg:space-y-8 max-w-2xl">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-md border border-white/30">
              <span className="text-xs font-bold uppercase tracking-widest">
                Our Story
              </span>
            </div>

            <h1 className="text-4xl text-neutral-100 md:text-6xl font-extrabold leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-purple-50 leading-relaxed opacity-90">
              {description}
            </p>

            <div className="pt-4">
              <Link
                href={buttonLink}
                className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-bold transition-all hover:bg-gray-100 active:scale-95 shadow-xl"
              >
                {buttonText}
                <div className="flex items-center justify-center bg-white border border-gray-100 rounded-full p-1 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={20} className="text-[#923CF9]" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side: Tilted Image */}
          <div className="relative mt-12 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px]">
              {dashboardScreenshot && (
                <Image
                  src={dashboardScreenshot}
                  alt="Dashboard Preview"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
