"use client";

import Link from "next/link";
import { AuthRoutes } from "@/routes/auth.routes";

export function SuperAdminTopbar() {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search schools, users, transactions..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          aria-label="System notifications"
          className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
            SA
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 leading-tight">Super Admin</p>
            <p className="text-xs text-slate-500">admin@edutrac.io</p>
          </div>
        </div>

        <Link
          href={AuthRoutes.selectRole}
          className="ml-2 text-xs font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Switch Role
        </Link>
      </div>
    </header>
  );
}