import Link from "next/link";
import { LandingRoutes } from "@/routes/landing.routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edutrac – Contact Us",
  description: "Contact us for any questions or feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-neutral-100)]">
      <nav className="flex gap-4 mb-8">
        <Link href={LandingRoutes.home} className="link underline">Home</Link>
        <Link href={LandingRoutes.about} className="link underline">About</Link>
        <Link href={LandingRoutes.pricing} className="link underline">Pricing</Link>
        <Link href={LandingRoutes.product} className="link underline">Product</Link>
        <Link href={LandingRoutes.contact} className="font-medium text-[var(--color-neutral-black)]">Contact</Link>
      </nav>
      <h1 className="text-3xl font-bold text-[var(--color-neutral-black)]">Contact Us</h1>
      <p className="mt-4 text-[var(--color-neutral-700)] max-w-2xl">
        Contact form and details can be added here. You can update this page as you go.
      </p>
    </div>
  );
}
