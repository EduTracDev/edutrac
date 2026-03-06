"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthRoutes } from "@/routes/auth.routes";
import backgroundImage from "@/modules/shared/assets/images/Background.jpg";

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
      className="relative w-full py-24 lg:py-36 flex items-center justify-center overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
        <h2
          id="cta-heading"
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
        >
          {title}
        </h2>

        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
          {description}
        </p>

        <div className="flex justify-center">
          <Link
            href={AuthRoutes.register}
            className="bg-[#FFC107] text-gray-900 px-12 py-4 rounded-full font-bold text-lg 
                       transition-all duration-300 hover:bg-[#e6ae06] hover:scale-105 
                       focus:ring-4 focus:ring-yellow-400 outline-none active:scale-95 shadow-2xl"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
