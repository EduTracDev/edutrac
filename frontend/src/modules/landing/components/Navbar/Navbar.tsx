"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LandingRoutes } from "@/routes/landing.routes";
import { AuthRoutes } from "@/routes/auth.routes";
import logo from "@/modules/shared/assets/images/logo.png";

export default function Navbar({
  buttonText,
  buttonLink,
}: {
  buttonText: string;
  buttonLink: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: LandingRoutes.home },
    { name: "About", href: LandingRoutes.about },
    { name: "Pricing", href: LandingRoutes.pricing },
    // { name: "Product", href: LandingRoutes.product },
    { name: "Contact", href: LandingRoutes.contact },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="transition-transform hover:scale-105 shrink-0"
          >
            <Image
              src={logo}
              alt="EduTrac Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[16px] font-medium transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-[#923CF9]"
                      : "text-gray-600 hover:text-[#923CF9]"
                  }`}
                >
                  {link.name}

                  {/* Active Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#923CF9] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={AuthRoutes.login}
              className="text-[16px] font-medium text-gray-600 hover:text-[#923CF9] transition-colors"
            >
              Login
            </Link>
            <Link
              href={buttonLink}
              className="px-6 py-2.5 bg-brand text-white rounded-lg font-semibold transition-all hover:bg-[#7b2dd1] active:scale-95 shadow-md shadow-purple-200"
            >
              {buttonText}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-brand transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        className="lg:hidden bg-white overflow-hidden border-t border-gray-100"
      >
        <div className="p-6 space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-[18px] font-semibold ${
                  isActive
                    ? "text-[#923CF9]"
                    : "text-gray-800 hover:text-[#923CF9]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
            <Link
              href={AuthRoutes.login}
              className="text-center font-medium text-gray-600 py-2"
            >
              Login
            </Link>
            <Link
              href={buttonLink}
              className="block w-full text-center bg-[#923CF9] text-white py-3 rounded-xl font-bold shadow-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
