"use client";
import { Menu, Bell, Search } from "lucide-react";
import { useGlobalSearch } from "@/utils/hooks/useGlobalSearch";
import { useEffect, useState, useRef } from "react";

export default function TeacherTopbar({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-50">
      <button onClick={() => setSidebarOpen(true)} className="md:hidden">
        <Menu />
      </button>

      {/* Search Container */}
      <div
        ref={containerRef}
        className="relative hidden md:flex items-center group"
      >
        <div className="absolute left-3 text-slate-400">
          <Search size={18} />
        </div>

        <input
          type="search"
          onFocus={() => setIsOpen(true)}
          placeholder="Search students, parents..."
          className="pl-10 pr-12 py-2.5 w-96 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#923CF9]/10 focus:border-[#923CF9] transition-all"
        />

        {/* Results Dropdown */}

        <div className="absolute right-3 hidden lg:flex items-center gap-1 px-1.5 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 pointer-events-none">
          <span className="text-xs">⌘</span> K
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-800">Teacher</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              Nexus Academy
            </p>
          </div>
          <div className="w-10 h-10 bg-[#923CF9] rounded-2xl flex items-center justify-center text-white font-black">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
