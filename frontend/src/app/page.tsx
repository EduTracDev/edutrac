import Link from "next/link";
import { LandingRoutes } from "@/routes/landing.routes";
import { AuthRoutes } from "@/routes/auth.routes";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--color-neutral-100)]">
      <main className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-[var(--color-neutral-black)]">
          Edutrac
        </h1>
        <p className="text-lg text-[var(--color-neutral-700)]">
          School Learning Management System
        </p>
        <nav className="flex flex-wrap gap-4 justify-center">
          <Link href={LandingRoutes.about} className="link underline">
            About
          </Link>
          <Link href={LandingRoutes.pricing} className="link underline">
            Pricing
          </Link>
          <Link href={LandingRoutes.product} className="link underline">
            Product
          </Link>
          <Link href={LandingRoutes.contact} className="link underline">
            Contact
          </Link>
          <Link
            href={AuthRoutes.login}
            className="btn-primary px-4 py-2 rounded-lg font-medium"
          >
            Sign in
          </Link>
        </nav>
      </main>
    </div>
  );
}
