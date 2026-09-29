import Link from "next/link";
import Image from "next/image";
import { LandingRoutes } from "@/routes/landing.routes";

export default function SchoolNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-16 text-center">
      <div className="max-w-md space-y-6">
        <Link href={LandingRoutes.home} className="inline-block">
          <Image src="/logo.png" alt="Edutrac Logo" width={140} height={32} className="mx-auto" />
        </Link>
        <h1 className="text-3xl font-black text-slate-900">School not found</h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          We couldn&apos;t find a school at this address. Double-check the link, or if
          you&apos;re looking to set up your own school on Edutrac, get started below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href={LandingRoutes.plan}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#923CF9] hover:bg-[#7e2ed4] text-white font-bold rounded-xl text-sm transition-colors"
          >
            View plans & get started
          </Link>
          <Link
            href={LandingRoutes.home}
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-100 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
