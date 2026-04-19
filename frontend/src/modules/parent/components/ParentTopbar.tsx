"use client";
import { Menu, Bell, Search, User, GraduationCap, Users } from "lucide-react";
import { useGlobalSearch } from "@/utils/hooks/useGlobalSearch";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function ParentTopbar({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const { query, setQuery, results, inputRef } = useGlobalSearch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape or Clicking Outside
  useEffect(() => {
    const handleEvents = () => {};

    window.addEventListener("keydown", handleEvents);
    window.addEventListener("mousedown", handleEvents);
    return () => {
      window.removeEventListener("keydown", handleEvents);
      window.removeEventListener("mousedown", handleEvents);
    };
  }, []);

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
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search students, parents..."
          className="pl-10 pr-12 py-2.5 w-96 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#923CF9]/10 focus:border-[#923CF9] transition-all"
        />

        {/* Results Dropdown */}
        {isOpen && query.length >= 2 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-slate-100 rounded-[24px] shadow-2xl z-50 overflow-hidden p-2 animate-in fade-in zoom-in-95 duration-200">
            {results.length > 0 ? (
              results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors group"
                >
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-[#923CF9] group-hover:bg-white transition-colors">
                    {/* Add conditional icons based on type */}
                    {result.type === "Student" && <GraduationCap size={16} />}
                    {result.type === "Parent" && <Users size={16} />}
                    {result.type === "Teacher" && <User size={16} />}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">
                      {result.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      {result.subtitle}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-slate-400 text-xs italic">
                No results found for &quot;{query}&quot;
              </div>
            )}
          </div>
        )}

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
            <p className="text-xs font-black text-slate-800">Admin User</p>
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
