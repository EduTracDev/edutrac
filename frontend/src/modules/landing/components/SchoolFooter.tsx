"use client";

import { Twitter, Facebook, Instagram, Github } from "lucide-react";

export const SchoolFooter = () => {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 mt-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 mb-16">
        
        {/* Brand Info */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-xl tracking-tight">
            <span className="p-1.5 bg-[#923CF9] text-white rounded-lg text-xs">ET</span>
            EDUTRAC
          </div>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">
            Clarity gives you the blocks and components you need to create a truly professional website.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 text-slate-400 hover:text-[#923CF9] hover:bg-purple-50 rounded-lg transition-colors"><Twitter size={18} /></a>
            <a href="#" className="p-2 text-white bg-[#923CF9] rounded-full shadow-sm"><Facebook size={18} /></a>
            <a href="#" className="p-2 text-slate-400 hover:text-[#923CF9] hover:bg-purple-50 rounded-lg transition-colors"><Instagram size={18} /></a>
            <a href="#" className="p-2 text-slate-400 hover:text-[#923CF9] hover:bg-purple-50 rounded-lg transition-colors"><Github size={18} /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-[#923CF9]">Company</h4>
          <ul className="space-y-3 text-sm font-semibold text-slate-500">
            <li><a href="#" className="hover:text-slate-900">About</a></li>
            <li><a href="#" className="hover:text-slate-900">Features</a></li>
            <li><a href="#" className="hover:text-slate-900">Works</a></li>
            <li><a href="#" className="hover:text-slate-900">Career</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-[#923CF9]">Help</h4>
          <ul className="space-y-3 text-sm font-semibold text-slate-500">
            <li><a href="#" className="hover:text-slate-900">Customer Support</a></li>
            <li><a href="#" className="hover:text-slate-900">Delivery Details</a></li>
            <li><a href="#" className="hover:text-slate-900">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-[#923CF9]">Resources</h4>
          <ul className="space-y-3 text-sm font-semibold text-slate-500">
            <li><a href="#" className="hover:text-slate-900">Free eBooks</a></li>
            <li><a href="#" className="hover:text-slate-900">Development Tutorial</a></li>
            <li><a href="#" className="hover:text-slate-900">How to - Blog</a></li>
            <li><a href="#" className="hover:text-slate-900">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 text-center text-xs font-semibold text-slate-400">
        © Copyright 2026, All Rights Reserved by Edutrac
      </div>
    </footer>
  );
};