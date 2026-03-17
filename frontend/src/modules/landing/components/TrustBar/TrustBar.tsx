"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface Partner {
  name: string;
  image: StaticImageData;
}

export default function TrustBar({
  title,
  logos,
}: {
  title: string;
  logos: Partner[];
}) {
  return (
    <section className="py-16 bg-[#122553] " aria-label="Our Partners">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="sr-only">{title}</h2>

        <p className="text-center text-slate-400 text-sm font-semibold uppercase tracking-[0.2em] mb-12">
          {title}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              // Grayscale is kept to maintain a unified look, but white logos stay white
              className="opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.image}
                alt={`${logo.name} logo`}
                width={160}
                height={50}
                className="h-10 w-auto object-contain"
                // Priority ensures logos load immediately for visual trust
                priority
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
