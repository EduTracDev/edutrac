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
import { TeacherRoutes } from "@/routes/teacher.routes";
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

export default function TeacherSidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const pathname = usePathname();
  const links: SidebarLink[] = [
    { name: "Dashboard", href: TeacherRoutes.dashboard, icon: Home },
    { name: "My Classes", href: TeacherRoutes.classes, icon: BookOpen },
    {
      name: "Result Entry",
      href: TeacherRoutes.results,
      icon: FileText,
    },
    {
      name: "Attendance",
      href: TeacherRoutes.attendance,
      icon: ClipboardCheck,
    },
    {
      name: "Assignments",
      href: TeacherRoutes.assignments,
      icon: BookOpen,
    },
    {
      name: "Announcements",
      href: TeacherRoutes.announcements,
      icon: Megaphone,
    },
    { name: "My Profile", href: TeacherRoutes.profile, icon: Users },
    { name: "Settings", href: TeacherRoutes.settings, icon: Settings },
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
        aria-label="Teacher navigation"
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
