"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SuperAdminRoutes } from "@/routes/superAdmin.routes";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: SuperAdminRoutes.dashboard, icon: "📊" },
  { label: "School Management", href: SuperAdminRoutes.schools, icon: "🏫" },
  { label: "User Management", href: SuperAdminRoutes.users, icon: "👥" },
  { label: "Roles & Permissions", href: SuperAdminRoutes.roles, icon: "🛡️" },
  { label: "Announcements", href: SuperAdminRoutes.announcements, icon: "📢" },
  { label: "Subscriptions", href: SuperAdminRoutes.subscriptions, icon: "💳" },
  { label: "Payments & Revenue", href: SuperAdminRoutes.payments, icon: "💰" },
  { label: "Reports & Analytics", href: SuperAdminRoutes.reports, icon: "📈" },
  { label: "Support & Issues", href: SuperAdminRoutes.support, icon: "🎫" },
  { label: "Audit Logs", href: SuperAdminRoutes.auditLogs, icon: "📋" },
  { label: "System Settings", href: SuperAdminRoutes.settings, icon: "⚙️" },
];

export function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-indigo-500">EduTrac</span>
          <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30">
            Super Admin
          </span>
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 text-xs text-slate-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Normal v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}