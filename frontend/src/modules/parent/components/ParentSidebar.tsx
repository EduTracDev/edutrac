"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LucideIcon,
  LayoutDashboard,
  BookOpenCheck,
  BarChart3,
  CalendarCheck2,
  CalendarDays,
  Wallet,
  Megaphone,
  Settings,
} from "lucide-react";
import { ParentRoutes } from "@/routes/parent.routes";
import { usePathname } from "next/navigation";
import { WardSwitcher } from "./WardSwitcher";
import { useWard } from "@/modules//context/WardContext";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

type SidebarLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export default function ParentSidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { wards, activeWard, setActiveWardId } = useWard();
  const pathname = usePathname();
  const links: SidebarLink[] = [
    {
      name: "Dashboard",
      href: ParentRoutes.dashboard,
      icon: LayoutDashboard,
    },
    {
      name: "Learning",
      href: ParentRoutes.learning,
      icon: BookOpenCheck,
    },
    {
      name: "Results",
      href: ParentRoutes.results,
      icon: BarChart3,
    },
    {
      name: "Attendance",
      href: ParentRoutes.attendance,
      icon: CalendarCheck2,
    },
    {
      name: "Calendar",
      href: ParentRoutes.calendar,
      icon: CalendarDays,
    },
    {
      name: "Billing",
      href: ParentRoutes.billing,
      icon: Wallet,
    },
    {
      name: "Notices",
      href: ParentRoutes.notices,
      icon: Megaphone,
    },
    {
      name: "Settings",
      href: ParentRoutes.settings,
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
        aria-label="School admin navigation"
      >
        {/* Ward Switcher */}

        <WardSwitcher
          wards={wards}
          activeWardId={activeWard?.id || ""}
          onWardChange={setActiveWardId}
        />

        {/* Navigation */}

        <nav className="p-4 space-y-2" aria-label="Sidebar">
          {links.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href || pathname.startsWith(link.href);

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
