"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ChevronDown } from "lucide-react";
import { useSchoolProfile } from "@/modules/shared/lib/useSchoolProfile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type PortalRole = "admin" | "teacher" | "parent";

export default function PortalLoginPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const profile = useSchoolProfile(slug);

  const [role, setRole] = useState<PortalRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schoolName = profile?.name || slug;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-slate-900">{schoolName} Portal</h1>
          <p className="text-sm text-slate-500 font-medium">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Portal
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as PortalRole)}
                className="w-full appearance-none px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[var(--color-dynamic-brand)] transition-all pr-10"
              >
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[var(--color-dynamic-brand)] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[var(--color-dynamic-brand)] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[var(--color-dynamic-brand)] hover:bg-[var(--color-dynamic-brand-hover)] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}