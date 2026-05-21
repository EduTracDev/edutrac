"use client";
import Link from "next/link";

interface FinalCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export default function FinalCTA({
  title,
  subtitle,
  buttonText,
  buttonLink,
}: FinalCTAProps) {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto bg-[#923CF9] rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32" />

        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black">{title}</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{subtitle}</p>
          <Link
            href={buttonLink}
            className="inline-block bg-white text-[#923CF9] px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-lg"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
