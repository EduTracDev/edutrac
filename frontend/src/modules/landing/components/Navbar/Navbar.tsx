import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingRoutes } from "@/routes/landing.routes";
import { AuthRoutes } from "@/routes/auth.routes";
import logo from "@/modules/shared/assets/logo.png";

interface NavbarProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function Navbar({
  title,
  description,
  buttonText,
  buttonLink,
}: NavbarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center space-x-2">
        <Image src={logo} alt="Edutrac Logo" className="h-8 w-8" />
      </div>
      <nav className="flex flex-wrap gap-4 justify-center">
        <Link href={LandingRoutes.about} className=" text-gray-900">
          About
        </Link>
        <Link href={LandingRoutes.pricing} className=" text-gray-900">
          Pricing
        </Link>
        <Link href={LandingRoutes.product} className=" text-gray-900">
          Product
        </Link>
        <Link href={LandingRoutes.contact} className=" text-gray-900">
          Contact
        </Link>
      </nav>
      <div>
        <Link href={AuthRoutes.login} className=" text-sm text-[#923CF9]">
          Login
        </Link>
        <Link
          href={AuthRoutes.register}
          className="bg-[#923CF9] px-4 py-2 rounded-lg font-medium"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
