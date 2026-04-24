"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/platform/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Organizations",
    href: "/platform/organizations",
    icon: Building2,
  },
];

export default function PlatformLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-72 border-r bg-white p-5 shadow-sm md:block">
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-violet-100 bg-violet-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
              <ShieldCheck className="h-5 w-5 text-violet-600" />
            </div>

            <div>
              <h2 className="font-black text-slate-800">Platform Admin</h2>
              <p className="text-xs text-muted-foreground">
                SaaS Control Center
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition",
                  active
                    ? "bg-violet-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-violet-50 hover:text-violet-700",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom action */}
        <div className="mt-10 border-t pt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-muted hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tenant App
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
