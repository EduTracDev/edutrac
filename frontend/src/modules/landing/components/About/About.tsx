"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

interface AboutProps {
  badge: string;
  title: string;
  description: string[];
  buttonText: string;
  buttonLink: string;
  images: {
    teacher: string | StaticImageData;
    building: string | StaticImageData;
    students: string | StaticImageData;
  };
}

export default function AboutSection({
  badge,
  title,
  description,
  buttonText,
  buttonLink,
  images,
}: AboutProps) {
  const simpleFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="py-16 md:py-24 bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content Column */}
        <motion.div
          className="order-2 lg:order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={simpleFadeUp}
        >
          <span className="inline-block px-3 py-1 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#923CF6] bg-[#923CF6]/10 rounded">
            {badge}
          </span>

          <h2
            id="about-heading"
            className="text-[32px] md:text-[44px] lg:text-[48px] font-extrabold leading-tight text-[#0F172A] mb-6"
          >
            {title}
          </h2>

          <div className="space-y-4 text-[#475569] text-base md:text-lg leading-relaxed">
            {description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {/* Button with Brightness/Glow effect */}
          <Link
            href={buttonLink}
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-[#923CF6] text-white font-bold rounded-full transition-all group min-h-[44px] relative overflow-hidden"
          >
            <motion.span
              className="relative z-10"
              whileHover={{
                color: "#ffffff",
                textShadow: "0px 0px 8px rgba(255,255,255,0.6)",
              }}
            >
              {buttonText}
            </motion.span>
            <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform relative z-10">
              <MoveRight size={20} />
            </div>
            {/* Subtle inner glow on hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>

        {/* Right Image Grid Column: Visible on all screens, but stacked */}
        <motion.div
          className="order-1 lg:order-2 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={simpleFadeUp}
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <motion.div
              whileHover={{
                scale: 1.04,
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              }}
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg mt-4 md:mt-8 cursor-pointer bg-white"
            >
              <Image
                src={images.teacher}
                alt="Teacher"
                width={400}
                height={400}
                className="object-cover aspect-square"
              />
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.04,
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              }}
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg mb-8 md:mb-12 cursor-pointer bg-white"
            >
              <Image
                src={images.building}
                alt="Campus"
                width={300}
                height={400}
                className="object-cover aspect-square"
              />
            </motion.div>
          </div>

          <motion.div
            whileHover={{
              scale: 1.02,
              y: -8,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
            className="mt-2 md:mt-4 rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl cursor-pointer bg-white"
          >
            <Image
              src={images.students}
              alt="Students"
              width={800}
              height={500}
              className="object-cover w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
