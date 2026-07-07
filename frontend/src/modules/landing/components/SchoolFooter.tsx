"use client";

import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/modules/shared/assets/images/logo.png";

export const SchoolFooter = () => {
    return (
        <footer className="bg-[#F8F6F9] pt-20 pb-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 mb-16">
                <div className="md:col-span-4 space-y-4">
                    <div className="flex items-center">
                        <Image
                            src={logo}
                            alt="EduTrac Logo"
                            width={140}
                            height={40}
                            priority
                        />
                    </div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">
                        Clarity gives you the blocks and components you need to create a truly professional website.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <a href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Twitter size={18} /></a>
                        <a href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Facebook size={18} /></a>
                        <a href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Instagram size={18} /></a>
                        <a href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Github size={18} /></a>
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
                © Copyright 2022, All Rights Reserved by Edutrac
            </div>
        </footer>
    );
};