import Link from "next/link";
import { LandingRoutes } from "@/routes/landing.routes";

export default function PricingPage() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-neutral-100)]">
      <nav className="flex gap-4 mb-8">
        <Link href={LandingRoutes.home} className="link underline">Home</Link>
        <Link href={LandingRoutes.about} className="link underline">About</Link>
        <Link href={LandingRoutes.pricing} className="font-medium text-[var(--color-neutral-black)]">Pricing</Link>
        <Link href={LandingRoutes.contact} className="link underline">Contact</Link>
      </nav>
      <h1 className="text-3xl font-bold text-[var(--color-neutral-black)]">Pricing</h1>
      <p className="mt-4 text-[var(--color-neutral-700)] max-w-2xl">
        Pricing plans will be added here. You can update this page as you go.
      </p>
    </div>
  );
}
