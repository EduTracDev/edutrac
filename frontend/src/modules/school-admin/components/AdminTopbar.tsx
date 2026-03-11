"use client";

import { Menu, Bell } from "lucide-react";

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
      <input
        type="search"
        placeholder="Search..."
        aria-label="Search dashboard"
        className="hidden md:block border rounded-lg px-4 py-2 w-72"
      />

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
