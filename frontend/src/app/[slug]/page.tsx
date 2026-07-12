"use client";

import { use, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SchoolFooter } from "@/modules/landing/components/SchoolFooter";
import { SchoolNav } from "@/modules/landing/components/SchoolNav";
import { useSchoolProfile } from "@/modules/shared/lib/useSchoolProfile";
import router from "next/router";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DEFAULT_HERO_TITLE = "Streamline education from classroom to district";
const DEFAULT_HERO_SUBTITLE =
  "Connect your entire educational community with EduTrac's all-in-one platform for attendance, assessment, communication, and analytics.";

export default function SchoolLandingPage({ params }: PageProps) {
  const { slug } = use(params);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const profile = useSchoolProfile(slug);

  useEffect(() => {
    const primary = profile?.themeColor || "#923CF9";
    document.documentElement.style.setProperty("--color-dynamic-brand", primary);
    document.documentElement.style.setProperty("--color-dynamic-brand-hover", primary + "CC");
  }, [profile?.themeColor]);

  const fallbackName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const schoolName = profile?.name || fallbackName;
  const heroTitle = profile?.heroTitle || DEFAULT_HERO_TITLE;
  const heroSubtitle = profile?.heroSubtitle || DEFAULT_HERO_SUBTITLE;

  const segmentImage = (key: "admin" | "teacher" | "parent" | "student", fallback: string) =>
    profile?.segmentImages?.[key] || fallback;

  const handlePortalRedirect = (role: string) => {
    router.push(`/auth/login?role=${role}&school=${slug}`);
  };

  const heroImageUrl = profile?.heroImageUrl || "./employees.png";

  return (
    <div className="min-h-screen text-slate-900 --font-source-sans selection:bg-purple-200">
      <SchoolNav slug={slug} schoolName={schoolName} logoUrl={profile?.logoUrl ?? null} />
      <section className="relative overflow-hidden pt-20 pb-16 px-6 bg-gradient-to-b from-purple-50/30 via-[#F8FAFC] to-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="font-source-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              {heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0 font-medium">
              {heroSubtitle}
            </p>
          </div>
          <img
            src={heroImageUrl}
            alt="employees"
            className="w-full rounded-3xl shadow-2xl shadow-purple-100 border border-purple-100/50 bg-slate-100 object-cover"
          />
        </div>
      </section>

      {/* 3. Why Educators Choose EduTrac */}
      <section id="features" className="pt-8 pb-12 px-6 bg-[#F6F7F8]">
        <div className="text-center max-w-3xl mx-auto mb-7 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Why Choose {schoolName}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-8 bg-white border border-slate-100 rounded-[12px] shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-xl font-black text-slate-900 mb-3">Our History</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Attendance, grading, and parent communication all in one place saving you hours each week.</p>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-[12px] shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-xl font-black text-slate-900 mb-3">Our Vision</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Connect with students and Parents through their preferred devices and languages with 99% engagement rates.</p>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-[12px] shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-xl font-black text-slate-900 mb-3">Our Mission</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Track student progress and engagement with easy-to-understand analytics.</p>
          </div>
        </div>
      </section>

      {/* 4. Target Personas Segments */}
      <section id="portals" className="pt-10 pb-14 px-6 bg-[#F6F7F8]">
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Our School Gallery</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* 5. Custom Workflow Horizontal Diagram */}
      {/* <section id="workflow" className="pb-15 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <img src="./school-iterate.png" alt="workflow diagram" />
        </div>
      </section> */}

      {/* 6. Support Invitation Section */}
      <section className="pt-15 pb-15 px-6 text-center space-y-4 max-w-4xl mx-auto">
        {/* Overlapping Team Avatars */}
        <div className="flex justify-center -space-x-3 overflow-hidden">
          {[
            "./avatar1.png",
            "./avatar2.png",
            "./avatar3.png"
          ].map((url, index) => (
            <div
              key={index}
              className="relative inline-block h-12 w-12 rounded-full overflow-hidden bg-slate-100"
            >
              <img
                src={url}
                alt={`Support team member ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-[var(--color-dynamic-brand)]">Still have questions?</h3>
        <p className="text-sm text-slate-500 font-medium max-w-4xl mx-auto">
          Can't find the answer you're looking for? Please chat to our friendly team.
        </p>

        <div className="pt-2">
          <button onClick={() => handlePortalRedirect("admin")} className="inline-flex items-center gap-3 bg-[var(--color-dynamic-brand)] hover:bg-[var(--color-dynamic-brand-hover)] text-white font-black text-xs tracking-widest pl-8 rounded-full shadow-lg shadow-purple-100 transition-all hover:scale-[1.02]">
            Get Started <span className="p-4 bg-white rounded-full text-[var(--color-dynamic-brand)]"><ArrowRight size={14} /></span>
          </button>

        </div>
      </section>


      {/* 8. Integrated Newsletter Container Area */}
      <section className="p-8 bg-[#F8F6F9]">
        <div className="bg-[var(--color-dynamic-brand)] mt-12 max-w-6xl mx-auto rounded-[32px] p-8 md:p-12 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 -translate-y-12 border border-white/10" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-12 translate-y-12 border border-white/10" />

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight relative z-10">Subscribe to our newsletter</h3>

          <form onSubmit={(e) => e.preventDefault()} className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 relative z-10">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 px-5 py-4 border border-white rounded-2xl text-white placeholder-white font-medium focus:outline-none focus:border-white transition-all text-sm"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 border border-white rounded-2xl text-white placeholder-white font-medium focus:outline-none focus:border-white transition-all text-sm"
            />
            <button type="submit" className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white text-sm font-bold rounded-2xl transition-all shadow-md shrink-0">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
      <SchoolFooter schoolName={schoolName} logoUrl={profile?.logoUrl ?? null} />
    </div>
  );
}