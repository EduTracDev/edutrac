"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LucideIcon,
  Home,
  Users,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  Settings,
  FileText,
} from "lucide-react";
import { SchoolAdminRoutes } from "@/routes/schoolAdmin.routes";
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

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const pathname = usePathname();
  const links: SidebarLink[] = [
    { name: "Dashboard", href: SchoolAdminRoutes.dashboard, icon: Home },
    { name: "Teachers", href: SchoolAdminRoutes.teachers, icon: Users },
    { name: "Parents", href: SchoolAdminRoutes.parents, icon: Users },
    { name: "Students", href: SchoolAdminRoutes.students, icon: Users },
    { name: "Classes", href: SchoolAdminRoutes.classes, icon: BookOpen },
    {
      name: "Results",
      href: SchoolAdminRoutes.results,
      icon: FileText,
    },
    { name: "Profile", href: SchoolAdminRoutes.profile, icon: Users },
    {
      name: "Attendance",
      href: SchoolAdminRoutes.attendance,
      icon: ClipboardCheck,
    },
    {
      name: "Announcements",
      href: SchoolAdminRoutes.announcements,
      icon: Megaphone,
    },
    {
      name: "Fee Management",
      href: SchoolAdminRoutes.feeManagement,
      icon: FileText,
    },
    { name: "Settings", href: SchoolAdminRoutes.settings, icon: Settings },
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
        {/* Logo section */}

        <div className="flex items-center gap-3 p-6">
          <Image
            src="/school-logo.png"
            alt="School logo"
            width={42}
            height={42}
            className="rounded-lg"
          />

          <div>
            <p className="font-semibold text-sm">Lincoln High School</p>
          </div>
        </div>

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
