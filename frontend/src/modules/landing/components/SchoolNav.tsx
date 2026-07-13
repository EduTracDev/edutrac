"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Menu, X } from "lucide-react";

interface SchoolNavProps {
  slug: string;
  schoolName: string;
  logoUrl?: string | null;
}

export const SchoolNav = ({ slug, schoolName, logoUrl }: SchoolNavProps) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handlePortalsClick = () => {
    router.push(`/${slug}/login`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* School Identity */}
        <div className="flex items-center gap-3">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={`${schoolName} logo`}
              className="w-10 h-10"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--color-dynamic-brand)] font-black text-lg shadow-md shadow-purple-100">
              {schoolName.charAt(0)}
            </div>
          )}
          <span className="font-black text-xl tracking-tight text-[var(--color-dynamic-brand)]">{schoolName}</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {/* <Link href="#features" className="hover:text-[var(--color-dynamic-brand)] transition-colors cursor-pointer">Product</Link>
          <Link href="#portals" className="hover:text-[var(--color-dynamic-brand)] transition-colors cursor-pointer">Portals</Link>
          <Link href="#workflow" className="hover:text-[var(--color-dynamic-brand)] transition-colors cursor-pointer">Workflow</Link> */}
        </div>

        {/* Desktop Portal Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handlePortalsClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all border cursor-pointer border-transparent bg-[var(--color-dynamic-brand)] hover:bg-[var(--color-dynamic-brand-hover)] text-white"
          >
            <LayoutGrid size={15} />
            Portals
          </button>
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
            {/* <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-dynamic-brand)] cursor-pointer">Product</Link>
            <Link href="#portals" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-dynamic-brand)] cursor-pointer">Portals</Link>
            <Link href="#workflow" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-dynamic-brand)] cursor-pointer">Workflow</Link> */}
          </div>
          <hr className="border-slate-100" />
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); handlePortalsClick(); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all border cursor-pointer border-transparent bg-[var(--color-dynamic-brand)] hover:bg-[var(--color-dynamic-brand-hover)] text-white"
            >
              <LayoutGrid size={15} />
              Portals
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};