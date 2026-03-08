"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: LandingRoutes.about },
    { name: "Pricing", href: LandingRoutes.pricing },
    { name: "Product", href: LandingRoutes.product },
    { name: "Contact", href: LandingRoutes.contact },
  ];

  const linkStyle = isScrolled
    ? "text-[16px] text-gray-700 hover:text-[#923CF9]"
    : "text-[16px] text-white hover:text-purple-200";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Visibility Fix */}
          <Link href="/" className="transition-transform hover:scale-105">
            <Image
              src={logo}
              alt="Logo"
              width={140}
              height={40}
              priority
              className={`transition-all duration-300 ${
                !isScrolled ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors ${linkStyle}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={AuthRoutes.login}
              className={`text-[16px] transition-colors ${linkStyle}`}
            >
              Login
            </Link>
            <Link
              href={buttonLink}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all active:scale-95 shadow-lg ${
                isScrolled
                  ? "bg-[#923CF9] text-white hover:bg-[#7b2dd1]"
                  : "bg-white text-[#923CF9] hover:bg-purple-50"
              }`}
            >
              {buttonText}
            </Link>
          </div>

          {/* Mobile Toggle (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${isScrolled ? "text-gray-900" : "text-white"}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <div
        className={`lg:hidden bg-white transition-all duration-300 overflow-hidden ${isOpen ? "max-h-screen border-t" : "max-h-0"}`}
      >
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-800 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
