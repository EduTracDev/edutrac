"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LucideIcon,
  LayoutDashboard,
  School,
  Users,
  ShieldCheck,
  Megaphone,
  CreditCard,
  DollarSign,
  TrendingUp,
  Headphones,
  ClipboardList,
  Settings,
} from "lucide-react";
import { SuperAdminRoutes } from "@/routes/superAdmin.routes";
import { usePathname } from "next/navigation";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

type SidebarLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export default function SuperAdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  const pathname = usePathname();
  const links: SidebarLink[] = [
    {
      name: "Dashboard",
      href: SuperAdminRoutes.dashboard,
      icon: LayoutDashboard,
    },
    {
      name: "School Management",
      href: SuperAdminRoutes.schools,
      icon: School,
    },
    { name: "User Management", href: SuperAdminRoutes.users, icon: Users },
    {
      name: "Roles & Permissions",
      href: SuperAdminRoutes.roles,
      icon: ShieldCheck,
    },
    {
      name: "Announcements",
      href: SuperAdminRoutes.announcements,
      icon: Megaphone,
    },
    {
      name: "Subscriptions",
      href: SuperAdminRoutes.subscriptions,
      icon: CreditCard,
    },
    {
      name: "Payments & Revenue",
      href: SuperAdminRoutes.payments,
      icon: DollarSign,
    },
    {
      name: "Reports & Analytics",
      href: SuperAdminRoutes.reports,
      icon: TrendingUp,
    },
    {
      name: "Support & Issues",
      href: SuperAdminRoutes.support,
      icon: Headphones,
    },
    {
      name: "Audit Logs",
      href: SuperAdminRoutes.auditLogs,
      icon: ClipboardList,
    },
    {
      name: "System Settings",
      href: SuperAdminRoutes.settings,
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
        bg-white w-64 fixed md:relative z-40
        h-full transform transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
        role="navigation"
        aria-label="Super Admin navigation"
      >
        {/* Logo section */}
        <div className="flex items-center gap-3 p-6">
          {/* <Image
            src="/school-logo.png"
            alt="EduTrac logo"
            width={42}
            height={42}
            className="rounded-lg"
          /> */}

          <div>
            <p className="font-semibold text-sm">EduTrac Platform</p>
            <span className="text-[10px] bg-brand/10 text-brand font-bold px-2 py-0.5 rounded border border-brand/20">
              Super Admin
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-100px)]"
          aria-label="Sidebar"
        >
          {links.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                flex items-center gap-3 px-4 py-3
                rounded-xl text-sm font-medium
                transition-all duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-brand
                ${
                  isActive
                    ? "bg-brand text-white shadow-md"
                    : `
                      text-gray-600
                      hover:bg-[#f4ebff]
                      hover:text-brand
                    `
                }
                `}
              >
                <Icon
                  size={18}
                  className={`
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-brand"
                  }
                  `}
                />

                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
