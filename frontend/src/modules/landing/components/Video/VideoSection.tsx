"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Play } from "lucide-react";

interface VideoSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  thumbnail?: string | StaticImageData;
  videoUrl?: string;
}

export default function VideoSection({
  badge = "TESTIMONIAL",
  title = "Watch Our Story",
  description,
  thumbnail,
  videoUrl = "#",
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoUrl && videoUrl !== "#") {
      setIsPlaying(true);
    } else {
      alert("Video player interaction triggered! Wire up your video stream link here.");
    }
  };

  return (
    <section className="bg-white pt-16 md:pt-8 pb-16 md:pb-22 px-6 md:px-12 lg:px-20 text-center">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Elements */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="inline-block bg-[#923CF6]/10 text-[#923CF6] text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm md:text-xs text-[#475569] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Video Player Display Screen Frame */}
        <div className="pt-6">
          <div 
            onClick={handlePlayClick}
            className="relative aspect-[16/10] md:aspect-[16/9] w-full bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl cursor-pointer group border border-slate-100"
          >
            {isPlaying ? (
              <iframe
                src={`${videoUrl}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* Background Poster Thumbnail Image */}
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt="Story Video Thumbnail Image"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center" />
                )}

                {/* Subtle Overlay Shadow */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Floating Central Play Button Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-hover:scale-110 active:scale-95 relative z-10">
                    <Play className="text-[#923CF6] fill-[#923CF6] ml-1 w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  
                  {/* Ripple Pulse Wave Visual Effect */}
                  <div className="absolute w-20 h-20 md:w-24 md:h-24 bg-white/30 rounded-full animate-ping pointer-events-none" />
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}