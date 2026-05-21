"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

import backgroundMap from "@/modules/shared/assets/images/BackgroundMap.jpeg";

interface TestimonialProps {
  items: {
    quote: string;
    author: string;
    role: string;
  }[];
}

export default function Testimonial({ items }: TestimonialProps) {
  // Simplified Embla hook without the complex progress state logic
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <section
      className="relative py-20 overflow-hidden"
      aria-labelledby="testimonial-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 hidden lg:block">
        <Image
          src={backgroundMap}
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-[#923CF9] bg-[#923CF9]/10 rounded-md">
            TESTIMONIALS
          </span>
          <h2
            id="testimonial-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight max-w-3xl mx-auto"
          >
            Creating A Community Of Life Long Learners.
          </h2>
        </div>

        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex" role="list">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-4"
                  role="listitem"
                >
                  <figure className="h-full relative p-8 bg-white border border-[#17254E] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="absolute -top-4 left-6 text-gray-200">
                      <Quote
                        size={48}
                        fill="currentColor"
                        className="opacity-50"
                      />
                    </div>
                    <blockquote className="relative z-10 mb-6">
                      <p className="text-gray-600 italic leading-relaxed font-medium line-clamp-4">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </blockquote>
                    <figcaption className="border-t border-gray-50 pt-6">
                      <div className="font-black text-[#0F172A] text-lg uppercase tracking-tight">
                        {item.author}
                      </div>
                      <div className="text-[#923CF9] text-sm font-bold mt-1">
                        {item.role}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 rounded-full bg-white border border-gray-200 text-[#923CF9] shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 rounded-full bg-white border border-gray-200 text-[#923CF9] shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Controls: Simple and Reliable */}
        <div className="flex justify-center gap-4 mt-10 md:hidden">
          <button
            onClick={scrollPrev}
            className="p-4 rounded-full border border-[#923CF9] text-[#923CF9] active:bg-[#923CF9] active:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="p-4 rounded-full border border-[#923CF9] text-[#923CF9] active:bg-[#923CF9] active:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
