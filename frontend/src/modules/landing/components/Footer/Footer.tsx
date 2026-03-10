"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaChevronRight,
} from "react-icons/fa6";

import logo from "@/modules/shared/assets/images/white-logo.png";
import image1 from "@/modules/shared/assets/images/footer-gallery-1.png";
import image2 from "@/modules/shared/assets/images/footer-gallery-2.png";
import image3 from "@/modules/shared/assets/images/footer-gallery-3.png";
import image4 from "@/modules/shared/assets/images/footer-gallery-4.png";
import image5 from "@/modules/shared/assets/images/footer-gallery-5.png";
import image6 from "@/modules/shared/assets/images/footer-gallery-6.png";
import { LandingRoutes } from "@/routes/landing.routes";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "About", href: LandingRoutes.about },
    { name: "Pricing", href: LandingRoutes.pricing },
    // { name: "Product", href: LandingRoutes.product },
    { name: "Contact", href: LandingRoutes.contact },
  ];

  const quickLinks = [
    { name: "Admin Page", href: "/admin" },
    { name: "Privacy & Policy", href: "/privacy" },
  ];

  const galleryImages = [image1, image2, image3, image4, image5, image6];

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <Link href="/" aria-label="Edutrac Home">
              <Image
                src={logo}
                alt="Edutrac Logo"
                width={150}
                height={40}
                className="transition-transform hover:scale-105"
              />
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Interdum velit laoreet id donec ultrices tincidunt arcu. Tincidunt
              tortor aliquam nulla facilisi cras fermentum odio eu.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                href="#"
                icon={<FaFacebookF size={18} />}
                label="Facebook"
              />
              <SocialIcon
                href="#"
                icon={<FaLinkedin size={18} />}
                label="Instagram"
              />
              <SocialIcon
                href="#"
                icon={<FaXTwitter size={18} />}
                label="Twitter"
              />
              <SocialIcon
                href="#"
                icon={<FaInstagram size={18} />}
                label="Twitter"
              />
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Services:</h3>
            <ul className="space-y-4">
              {services.map((link) => (
                <FooterLink key={link.name} href={link.href} text={link.name} />
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links:</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <FooterLink key={link.name} href={link.href} text={link.name} />
              ))}
            </ul>
          </div>

          {/* Column 4: Gallery */}
          <div>
            <h3 className="text-lg font-bold mb-6">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-md overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="100px"
                    placeholder="blur"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            Copyright © {currentYear}{" "}
            <span className="text-[#923CF9] font-semibold">EduTrac</span> || All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm"
      >
        <FaChevronRight
          size={14}
          className="mr-2 text-white group-hover:translate-x-1 transition-transform"
        />
        {text}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#923CF9] hover:text-white transition-all duration-300 text-purple-200"
    >
      {icon}
    </Link>
  );
}
