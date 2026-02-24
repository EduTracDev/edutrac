import Link from "next/link";
import { LandingRoutes } from "@/routes/landing.routes";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-neutral-100)]">
      <nav className="flex gap-4 mb-8">
        <Link href={LandingRoutes.home} className="link underline">Home</Link>
        <Link href={LandingRoutes.about} className="font-medium text-[var(--color-neutral-black)]">About</Link>
        <Link href={LandingRoutes.pricing} className="link underline">Pricing</Link>
        <Link href={LandingRoutes.contact} className="link underline">Contact</Link>
      </nav>
      <h1 className="text-3xl font-bold text-[var(--color-neutral-black)]">About Edutrac</h1>
      <p className="mt-4 text-[var(--color-neutral-700)] max-w-2xl">
        Edutrac is a school learning management system designed to connect super admins, school owners, teachers, parents, and students in one platform.
      </p>
    </div>
  );
}
