"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthRoutes } from "@/routes/auth.routes";
import backgroundImage from "@/modules/shared/assets/images/Background.png";

interface FreeTrialProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function FreeTrial({
  title,
  description,
  buttonText,
}: FreeTrialProps) {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden py-10 lg:py-16 bg-[#923CF9]"
      aria-labelledby="cta-heading"
    >
      {/* 1. Ensure this div has a higher z-index than the section bg but lower than content 
         2. Added 'inset-0' to make sure it fills the space
      */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority // Added priority to ensure it loads immediately on desktop
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Content Container: Increased z-index to stay above the image */}
      <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
        <h2
          id="cta-heading"
          className="text-xl md:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight leading-tight"
        >
          {title}
        </h2>

        <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium">
          {description}
        </p>

        <div className="flex justify-center">
          <Link
            href={AuthRoutes.register}
            className="bg-[#FFC107] text-gray-900 px-10 py-3.5 rounded-full font-bold text-lg 
                       transition-all duration-300 hover:bg-[#e6ae06] hover:scale-105 
                       focus:ring-4 focus:ring-yellow-400 outline-none active:scale-95 shadow-xl"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
