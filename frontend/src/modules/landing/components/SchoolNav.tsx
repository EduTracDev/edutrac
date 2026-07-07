"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, GraduationCap, UserCircle, Menu, X } from "lucide-react";
import Link from "next/link";

interface SchoolNavProps {
  slug: string;
  schoolName: string;
}

export const SchoolNav = ({ slug, schoolName }: SchoolNavProps) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const portals = [
    { id: "admin", label: "Admin Portal", icon: ShieldCheck, color: "text-slate-900", bg: "bg-slate-100" },
    { id: "teacher", label: "Teacher Portal", icon: GraduationCap, color: "text-[#923CF9]", bg: "bg-purple-50" },
    { id: "parent", label: "Parent Portal", icon: UserCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const handlePortalRedirect = (role: string) => {
    router.push(`/auth/login?role=${role}&school=${slug}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* School Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#923CF9] to-purple-400 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-100">
            {schoolName.charAt(0)}
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">{schoolName}</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="#features" className="hover:text-[#923CF9] transition-colors cursor-pointer">Product</Link>
          <Link href="#portals" className="hover:text-[#923CF9] transition-colors cursor-pointer">Portals</Link>
          <Link href="#workflow" className="hover:text-[#923CF9] transition-colors cursor-pointer">Workflow</Link>
        </div>

        {/* Desktop Portal Actions */}
        <div className="hidden md:flex items-center gap-3">
          {portals.map((portal) => (
            <button
              key={portal.id}
              onClick={() => handlePortalRedirect(portal.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all border cursor-pointer border-transparent hover:border-slate-200 hover:shadow-sm ${portal.bg} ${portal.color}`}
            >
              <portal.icon size={15} />
              {portal.label.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 md:hidden text-slate-700 hover:bg-slate-100 rounded-xl">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl p-6 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col gap-4 text-base font-bold text-slate-700">
            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#923CF9] cursor-pointer">Product</Link>
            <Link href="#portals" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#923CF9] cursor-pointer">Portals</Link>
            <Link href="#workflow" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#923CF9] cursor-pointer">Workflow</Link>
          </div>
          <hr className="border-slate-100" />
          <div className="flex flex-col gap-3">
            {portals.map((portal) => (
              <button
                key={portal.id}
                onClick={() => { setMobileMenuOpen(false); handlePortalRedirect(portal.id); }}
                className={`flex items-center gap-3 w-full p-4 rounded-2xl text-sm font-normal cursor-pointer  ${portal.bg} ${portal.color}`}
              >
                <portal.icon size={18} />
                {portal.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};