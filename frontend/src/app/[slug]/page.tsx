"use client";

import { use, useState } from "react";
import { 
  Layers, 
  Users, 
  BarChart3,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { SchoolFooter } from "@/modules/landing/components/SchoolFooter";
import { SchoolNav } from "@/modules/landing/components/SchoolNav";
import router from "next/router";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SchoolLandingPage({ params }: PageProps) {
  const { slug } = use(params);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const schoolName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handlePortalRedirect = (role: string) => {
    router.push(`/auth/login?role=${role}&school=${slug}`);
  };

  return (
    <div className="min-h-screen text-slate-900 --font-source-sans selection:bg-purple-200">
      
      {/* 1. Global Navigation Bar */}
      <SchoolNav slug={slug} schoolName={schoolName} />

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6 bg-gradient-to-b from-purple-50/30 via-[#F8FAFC] to-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-source-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Streamline education from classroom to district
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Connect your entire educational community with EduTrac's all-in-one platform for attendance, assessment, communication, and analytics.
          </p>
        </div>
        <img src="./employees.png" alt="employees" className="max-w-5xl mx-auto mt-16 shadow-2xl shadow-purple-100 border-purple-100/50 bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-medium" />
      </section>

      {/* 3. Why Educators Choose EduTrac */}
      <section id="features" className="pt-8 pb-12 px-6 bg-[#F6F7F8]">
        <div className="text-center max-w-3xl mx-auto mb-7 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Why educators choose EduTrac?</h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">Discover how our solution enhances productivity, simplifies workflows, and delivers exceptional value.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-8 bg-white border border-slate-100 rounded-[12px] shadow-sm hover:shadow-xl transition-all">
            <img src="./misc-icon1.png" alt="Simplified Workflow" className="w-10 h-10 mb-6" />
            <h3 className="text-xl font-black text-slate-900 mb-3">Simplified Workflow</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Attendance, grading, and parent communication all in one place saving you hours each week.</p>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-[12px] shadow-sm hover:shadow-xl transition-all">
            <img src="./misc-icon2.png" alt="Reach Everyone" className="w-12 h-12 mb-6" />
            <h3 className="text-xl font-black text-slate-900 mb-3">Reach Everyone</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Connect with students and Parents through their preferred devices and languages with 99% engagement rates.</p>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-[12px] shadow-sm hover:shadow-xl transition-all">
            <img src="./misc-icon3.png" alt="Actionable Insights" className="w-12 h-12 mb-6" />
            <h3 className="text-xl font-black text-slate-900 mb-3">Actionable Insights</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Track student progress and engagement with easy-to-understand analytics.</p>
          </div>
        </div>
      </section>

      {/* 4. Target Personas Segments (Ref: Includes Addition from Screenshot 2026-07-06 at 10.09.54.jpg) */}
      <section id="portals" className="pt-10 pb-14 px-6 bg-[#F6F7F8]">
        <div className="max-w-5xl mx-auto space-y-32">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">The Reliable Management software Designed for:</h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium">Discover how our solution enhances productivity, simplifies workflows, and delivers exceptional value.</p>
          </div>

          {/* Admin Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1 bg-white p-8 md:p-12 rounded-[22px] border border-slate-100">
              <h3 className="text-2xl font-normal text-slate-900">School Administrator</h3>
              <p className="text-sm text-slate-500 font-normal leading-relaxed">Edutrac provides a comprehensive management system that helps you efficiently streamline operations and reduce resources and costs within your school organization.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-1 gap-3 pt-2 text-sm text-slate-600 font-normal">
                {["Reporting/Analytics", "Fees management", "Messaging system", "Calendar event", "Computer based test (CBT)", "Report card builders"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5"><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <img src="./soft1.png" alt="Admin Interface" className=" order-1 md:order-2 flex items-center justify-center text-slate-400" />
          </div>

          {/* Teachers Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <img src="./teacher-interface.png" alt="Teacher Interface" className="w-full aspect-[4/3] rounded-[40px] order-1 md:order-2 flex items-center justify-center text-slate-400 text-sm font-medium shadow-inner" />
            <div className="space-y-6 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900">For teachers</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Edutrac provides a comprehensive management system that helps you efficiently streamline operations and reduce resources and costs within your school organization.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-600 font-semibold">
                {["Performance report", "Fees management", "Calendar events", "Attendance", "Assignment", "Lesson note"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#923CF9] shrink-0" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Parents Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900">For parents</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Edutrac provides a comprehensive management system that helps you efficiently streamline operations and reduce resources and costs within your school organization.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-600 font-semibold">
                {["Profile management", "Fees management", "Two-way communication", "Performance reports", "In-app support", "Calendar event"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-emerald-600 shrink-0" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="w-full aspect-[4/3] bg-slate-200 rounded-[40px] order-1 md:order-2 flex items-center justify-center text-slate-400 text-sm font-medium shadow-inner">[ Parent Interface View ]</div>
          </div>

          {/* Students Segment (Ref: Screenshot 2026-07-06 at 10.09.54.jpg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full aspect-[4/3] bg-slate-200 rounded-[40px] flex items-center justify-center text-slate-400 text-sm font-medium shadow-inner">[ Student Interface View ]</div>
            <div className="space-y-6 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900">For students</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Edutrac provides a comprehensive management system that helps you efficiently streamline operations and reduce resources and costs within your school organization.</p>
              <ul className="grid grid-cols-1 gap-3 pt-2 text-sm text-slate-600 font-semibold">
                {["Learning materials", "Assignment", "Performance charts"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-purple-600 shrink-0" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Custom Workflow Horizontal Diagram (Ref: Screenshot 2026-07-06 at 10.09.54.jpg) */}
      <section id="workflow" className="pb-15 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <img src="./school-iterate.png" alt="workflow diagram" />
        </div>
      </section>

      {/* 6. Support Invitation Section (Ref: Screenshot 2026-07-06 at 10.10.24.jpg) */}
      <section className="py-20 px-6 text-center space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-center -space-x-3 overflow-hidden">
          {[1, 2, 3].map((num) => (
            <div key={num} className="inline-block h-12 w-12 rounded-full ring-4 ring-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
              U{num}
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-black text-[#923CF9]">Still have questions?</h3>
        <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">Can't find the answer you're looking for? Please chat to our friendly team.</p>
        <div className="pt-2">
          <button onClick={() => handlePortalRedirect("admin")} className="inline-flex items-center gap-3 bg-[#923CF9] hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg shadow-purple-100 transition-all hover:scale-[1.02]">
            Get Started <span className="p-1 bg-white rounded-full text-[#923CF9]"><ArrowRight size={14} /></span>
          </button>
        </div>
      </section>

      {/* 7. Request Live Demo Visual Banner (Ref: Screenshot 2026-07-06 at 10.10.24.jpg) */}
      <section className="mx-6 my-12 max-w-7xl lg:mx-auto bg-gradient-to-br from-[#923CF9] to-purple-700 rounded-[48px] text-white overflow-hidden shadow-xl shadow-purple-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 md:p-16 lg:col-span-6 space-y-6">
            <p className="text-xs font-black uppercase tracking-widest text-purple-200">Get A Demo</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none">Manage Your School Data and Operations Today</h2>
            <p className="text-sm text-purple-100 leading-relaxed font-medium">
              Request a free, personalized demo, and discover how Edutrac empowers your school with tools that save time, improve communication, and drive success.
            </p>
            <div className="pt-4">
              <button className="px-6 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-2xl text-sm transition-all hover:bg-white hover:text-[#923CF9]">
                Request Live Demo
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 h-64 lg:h-full min-h-[350px] bg-white/10 flex items-center justify-center text-purple-200 text-sm font-medium">
            [ Interactive Workspace Concept Mockup Graphic ]
          </div>
        </div>
      </section>

      {/* 8. Integrated Newsletter Container Area (Ref: Screenshot 2026-07-06 at 10.10.46.png) */}
      <section className="px-6 mt-24 max-w-6xl mx-auto">
        <div className="bg-[#923CF9] rounded-[32px] p-8 md:p-12 text-center text-white space-y-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 -translate-y-12 border border-white/10" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-12 translate-y-12 border border-white/10" />
          
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight relative z-10">Subscribe to our newsletter</h3>
          
          <form onSubmit={(e) => e.preventDefault()} className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 relative z-10">
            <input 
              type="text" 
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 font-medium focus:outline-none focus:border-white transition-all text-sm"
            />
            <input 
              type="email" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 font-medium focus:outline-none focus:border-white transition-all text-sm"
            />
            <button type="submit" className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white text-sm font-bold rounded-2xl transition-all shadow-md shrink-0">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      {/* 9. Multi-Column Expanded Corporate Footer (Ref: Screenshot 2026-07-06 at 10.10.46.png) */}
      <SchoolFooter />

    </div>
  );
}