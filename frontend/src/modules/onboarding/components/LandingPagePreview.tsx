"use client";

import React from "react";
import { School } from "@/modules/types/dashboard";
import { ArrowRight, CheckCircle, LayoutGrid } from "lucide-react";

export const LandingPagePreview = ({
  data,
  onFinalize,
}: {
  data: School;
  onFinalize: () => void;
}) => {
  // Safe helper to handle both URL strings and File uploads in preview state
  const resolveImage = (img: string | File | null | undefined, fallback: string): string => {
    if (!img) return fallback;
    if (img instanceof File) {
      try {
        return URL.createObjectURL(img);
      } catch (e) {
        return fallback;
      }
    }
    return img;
  };

  // Fallback calculations matching SchoolLandingPage logic
  const fallbackName = (data.slug || "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const schoolName = data.name || fallbackName || "Our School";
  const heroTitle = data.heroTitle || "Welcome to our Digital Campus";
  const heroSubtitle = data.heroSubtitle || "Building a better future through world-class education, innovation, and guidance.";
  const yourHistory = data.yourHistory || "Established with a vision to provide quality education and foster development.";
  const yourVision = data.yourVision || "To be a leading light in student success and academic excellence.";
  const yourMission = data.yourMission || "Empowering students through innovative programs and dedicated values.";

  const logoUrl = resolveImage(data.logo as unknown as string | File | null | undefined, "");
  const heroImageUrl = resolveImage(data.heroImageUrl as unknown as string | File | null | undefined, "./employees.png");

  const segmentImage = (key: "admin" | "teacher" | "parent" | "student", fallback: string) => {
    return resolveImage(data.segmentImages?.[key] as unknown as string | File | null | undefined, fallback);
  };

  // Dynamically scope colors strictly to this preview tree
  const primaryColor = data.themeColor || "#923CF9";
  const primaryColorHover = `${primaryColor}CC`;

  const phone = data.phone?.replace(/[^\d]/g, "") || "";
  const whatsappLink = phone ? `https://wa.me/${phone}` : null;

  return (
    <div 
      className="space-y-10 max-w-5xl mx-auto"
      style={{
        "--color-dynamic-brand": primaryColor,
        "--color-dynamic-brand-hover": primaryColorHover,
      } as React.CSSProperties}
    >
      {/* Browser Simulation Container */}
      <div className="bg-white rounded-[48px] border-8 border-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
        
        {/* Browser Top Bar */}
        <div className="bg-slate-900 px-8 py-4 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="bg-slate-800 px-6 py-1.5 rounded-full text-[10px] font-bold text-slate-400">
            edutrac.app/{data.slug || "your-school"}
          </div>
          <div className="w-10" />
        </div>

        {/* --- ACTUAL LANDING PAGE CONTENT START --- */}
        <div className="bg-white text-slate-900 selection:bg-purple-200 min-h-[600px] max-h-[70vh] overflow-y-auto scrollbar-thin">
          
          {/* 1. Nav Simulation */}
          <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${schoolName} logo`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--color-dynamic-brand)] bg-slate-50 font-black text-lg shadow-md shadow-purple-100">
                  {schoolName.charAt(0)}
                </div>
              )}
              <span className="font-black text-xl tracking-tight text-[var(--color-dynamic-brand)]">{schoolName}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-wider border border-transparent bg-[var(--color-dynamic-brand)] text-white pointer-events-none opacity-90"
              >
                <LayoutGrid size={15} />
                Portals
              </button>
            </div>
          </nav>

          {/* 2. Hero Section */}
          <section className="relative overflow-hidden pt-8 pb-16 px-6 bg-gradient-to-b from-purple-50/30 via-[#F8FAFC] to-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left space-y-6">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                  {heroTitle}
                </h1>
                <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto md:mx-0 font-medium">
                  {heroSubtitle}
                </p>
              </div>
              <img
                src={heroImageUrl}
                alt="Hero visual"
                className="w-full max-h-[250px] object-cover rounded-2xl"
              />
            </div>
          </section>

          {/* 3. About Section */}
          <section className="pt-8 pb-12 px-6 bg-[#F6F7F8]">
            <div className="text-center max-w-3xl mx-auto mb-7">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Choose {schoolName}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="p-6 bg-white border border-slate-100 rounded-[12px] shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-2">Our History</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{yourHistory}</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-[12px] shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-2">Our Vision</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{yourVision}</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-[12px] shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-2">Our Mission</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{yourMission}</p>
              </div>
            </div>
          </section>

          {/* 4. Gallery Segment */}
          <section className="pt-10 pb-14 px-6 bg-[#F6F7F8]">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Our School Gallery</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img
                  src={segmentImage("admin", "./soft1.png")}
                  alt="Admin Interface"
                  className="w-full aspect-square object-cover rounded-2xl border border-slate-100 shadow-sm"
                />
                <img
                  src={segmentImage("teacher", "./soft2.png")}
                  alt="Teacher Interface"
                  className="w-full aspect-square object-cover rounded-2xl border border-slate-100 shadow-sm"
                />
                <img
                  src={segmentImage("parent", "./soft3.png")}
                  alt="Parent Interface"
                  className="w-full aspect-square object-cover rounded-2xl border border-slate-100 shadow-sm"
                />
                <img
                  src={segmentImage("student", "./soft4.png")}
                  alt="Student Interface"
                  className="w-full aspect-square object-cover rounded-2xl border border-slate-100 shadow-sm"
                />
              </div>
            </div>
          </section>

          {/* 5. Support Section */}
          <section className="py-12 px-6 text-center space-y-4 max-w-4xl mx-auto">
            <div className="flex justify-center -space-x-3 overflow-hidden">
              {["./avatar1.png", "./avatar2.png", "./avatar3.png"].map((url, index) => (
                <div key={index} className="relative inline-block h-10 w-10 rounded-full overflow-hidden bg-slate-100 border-2 border-white">
                  <img src={url} alt={`Team member ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <h3 className="text-xl font-black text-[var(--color-dynamic-brand)]">Still have questions?</h3>
            <p className="text-xs text-slate-500 font-medium max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-3 bg-[var(--color-dynamic-brand)] text-white font-black text-[10px] tracking-widest pl-6 rounded-full shadow-lg pointer-events-none opacity-90"
              >
                Contact Us 
                <span className="p-3 bg-white rounded-full text-[var(--color-dynamic-brand)]">
                  <ArrowRight size={12} />
                </span>
              </button>
            </div>
          </section>

          {/* 6. Newsletter Area */}
          <section className="p-6 bg-[#F8F6F9]">
            <div className="bg-[var(--color-dynamic-brand)] max-w-5xl mx-auto rounded-[24px] p-8 text-center text-white space-y-4 relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight relative z-10">Subscribe to our newsletter</h3>
              <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
                <input
                  type="text"
                  placeholder="First name"
                  disabled
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 text-xs focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  disabled
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 text-xs focus:outline-none"
                />
                <button type="button" className="px-6 py-3 bg-slate-950 text-white text-xs font-bold rounded-xl pointer-events-none">
                  Subscribe Now
                </button>
              </div>
            </div>
          </section>

          {/* 7. Footer */}
          <footer className="bg-[#F8F6F9] pt-12 pb-8 px-6 border-t border-slate-100">
            <div className="max-w-6xl mx-auto text-center space-y-2">
              {data.address && (
                <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                  {data.address}
                </p>
              )}
              {data.footerTitle && (
                <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
                  {data.footerTitle}
                </p>
              )}
              <div className="text-[10px] text-slate-400 pt-4">
                © Copyright 2022, All Rights Reserved by {schoolName}.
              </div>
            </div>
          </footer>

        </div>
        {/* --- ACTUAL LANDING PAGE CONTENT END --- */}

      </div>

      {/* Action Area */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-emerald-600">
          <CheckCircle size={18} />
          <span className="text-xs font-black uppercase tracking-widest">
            Everything looks perfect
          </span>
        </div>

        <button
          onClick={onFinalize}
          className="px-12 py-5 bg-[var(--color-dynamic-brand)] text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:scale-[1.05] active:scale-95 transition-all"
        >
          Launch School Portal
        </button>
      </div>
    </div>
  );
};