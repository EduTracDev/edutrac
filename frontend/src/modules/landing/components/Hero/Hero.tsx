"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // Optional: adds a smooth entrance
import dashboardScreenshot from "@/modules/shared/assets/images/DASHBOARD.png";
import { OnboardingRoutes } from "@/routes/onboardingRoutes";

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
    <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden pt-32 pb-16 lg:pt-20">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#923CF9]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6 lg:mt-12">
          {/* Left Side: Content */}
          <div className="space-y-6 lg:space-y-8 max-w-2xl text-center lg:text-left">
            {/* <div className="inline-block px-4 py-1.5 bg-[#923CF9]/10 border border-[#923CF9]/20 rounded-full">
              <span className="text-[#923CF9] text-xs font-bold uppercase tracking-widest">
                Our Story
              </span>
            </div> */}

            <h1 className="text-4xl text-slate-900 md:text-6xl font-extrabold leading-[1.1]">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {description}
            </p>

            <div className="pt-4">
              <Link
                href={OnboardingRoutes.plan}
                className="group inline-flex items-center gap-3 bg-[#923CF9] text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-[#7b2dd1] hover:shadow-xl hover:shadow-purple-200 active:scale-95 shadow-lg"
              >
                {buttonText}
                <div className="flex items-center justify-center bg-white/20 rounded-full p-1 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={20} className="text-white" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side: Tilted/Floating Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mt-12 lg:mt-0 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[650px] group">
              {/* Subtle shadow glow behind the image */}
              <div className="absolute inset-0 bg-purple-200 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />

              {dashboardScreenshot && (
                <Image
                  src={dashboardScreenshot}
                  alt="EduTrac Dashboard Preview"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-slate-100 transform lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                  priority
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
