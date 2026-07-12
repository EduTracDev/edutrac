"use client";

import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import staticLogo from "@/modules/shared/assets/images/logo.png";

interface SchoolFooterProps {
    logoUrl?: string | null;
    schoolName: string;
    address?: string | null;
    footerTitle?: string | null;
}

const FOOTER_TITLE = "";

export const SchoolFooter = ({ logoUrl, schoolName, address, footerTitle }: SchoolFooterProps) => {
    return (
        <footer className="bg-[#F8F6F9] pt-20 pb-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 mb-16">
                <div className="md:col-span-4 space-y-4">
                    <div className="flex items-center">
                        {logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logoUrl} alt="School Logo" width={140} height={40} className="object-contain" />
                        ) : (
                            <Image
                                src={staticLogo}
                                alt="EduTrac Logo"
                                width={140}
                                height={40}
                                priority
                            />
                        )}
                    </div>
                    {address && (
                        <p className="text-sm text-slate-500 font-semibold leading-relaxed max-w-xs">
                            {address}
                        </p>
                    )}
                    {footerTitle && (
                        <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">
                            {footerTitle}
                        </p>
                    )}
                    {/* <div className="flex items-center gap-3 pt-2">
                        <Link href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Twitter size={18} /></Link>
                        <Link href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Facebook size={18} /></Link>
                        <Link href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Instagram size={18} /></Link>
                        <Link href="#" className="p-2 text-slate-400 border border-slate-400 rounded-full hover:bg-[#923CF9] hover:text-white"><Github size={18} /></Link>
                    </div> */}
                </div>

                {/* Links Column 1 */}
                <div className="md:col-span-2 space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--color-dynamic-brand)]">Company</h4>
                    {/* <ul className="space-y-3 text-sm font-normal text-slate-500">
                        <li><Link href="#" className="hover:text-slate-900">About</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Features</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Works</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Career</Link></li>
                    </ul> */}
                </div>

                {/* Links Column 2 */}
                <div className="md:col-span-3 space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--color-dynamic-brand)]">Help</h4>
                    {/* <ul className="space-y-3 text-sm font-normal text-slate-500">
                        <li><Link href="#" className="hover:text-slate-900">Customer Support</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Delivery Details</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Terms & Conditions</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Privacy Policy</Link></li>
                    </ul> */}
                </div>

                {/* Links Column 3 */}
                <div className="md:col-span-3 space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--color-dynamic-brand)]">Resources</h4>
                    {/* <ul className="space-y-3 text-sm font-normal text-slate-500">
                        <li><Link href="#" className="hover:text-slate-900">Free eBooks</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Development Tutorial</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">How to - Blog</Link></li>
                        <li><Link href="#" className="hover:text-slate-900">Youtube Playlist</Link></li>
                    </ul> */}
                </div>
            </div>

            <div className="max-w-6xl mx-auto pt-8 border-t border-[#DCDCDC] text-center text-xs font-normal text-slate-400">
                © Copyright 2022, All Rights Reserved by {schoolName}.
            </div>
        </footer>
    );
};