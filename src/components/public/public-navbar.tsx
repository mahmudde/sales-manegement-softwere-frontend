"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PackageCheck, X, ChevronDown, LayoutDashboard } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import ThemeToggle from "./theme-toggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const customerLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/inventory", label: "Inventory" },
  { href: "/sales", label: "Sales" },
  { href: "/billing", label: "Billing" },
  { href: "/support", label: "Support" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useCurrentUser();
  const user = data?.data;
  const links = user ? customerLinks : publicLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
            <PackageCheck className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
            M ITSales
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
                pathname === link.href &&
                  "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
              )}
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 rounded-xl">
                Resources
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>Learn More</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/blog">Agency insights</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/support">Help and support</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/privacy">Privacy policy</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {user ? (
            <Button asChild className="h-10 rounded-xl bg-violet-600 px-4 text-white hover:bg-violet-700">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="h-10 rounded-xl">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="h-10 rounded-xl bg-violet-600 px-4 text-white hover:bg-violet-700">
                <Link href="/register">Start free</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((value) => !value)}
            className="h-10 w-10 rounded-xl"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/blog" onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900">
              Blog
            </Link>
            <Link href="/support" onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900">
              Support
            </Link>
            {!user ? (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-xl bg-violet-600 text-white hover:bg-violet-700">
                  <Link href="/register">Start free</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
