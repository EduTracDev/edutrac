"use client";

import { Menu, Bell, Search } from "lucide-react";

export default function AdminTopbar({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <header
      className="bg-white px-6 py-4 flex items-center justify-between"
      role="banner"
    >
      {/* Mobile menu */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu />
      </button>

      {/* Search */}
      <div className="relative hidden md:flex items-center group">
        <div className="absolute left-3 text-slate-400 group-focus-within:text-brand transition-colors">
          <Search size={18} />
        </div>

        <input
          type="search"
          placeholder="Search for students, teachers, parents..."
          aria-label="Search dashboard"
          className="pl-10 pr-12 py-2.5 w-80 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#923CF9]/20 focus:border-brand transition-all"
        />

        <div className="absolute right-3 hidden lg:flex items-center gap-1 px-1.5 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 pointer-events-none">
          <span className="text-xs">⌘</span> K
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-6">
        <button aria-label="Notifications">
          <Bell />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>
    </header>
  );
}
