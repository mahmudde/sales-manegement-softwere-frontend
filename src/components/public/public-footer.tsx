import Link from "next/link";
import { Code2, Globe2, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { href: "/features", label: "Features" },
      { href: "/services", label: "Services" },
      { href: "/pricing", label: "Pricing" },
      { href: "/support", label: "Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white dark:border-slate-800">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="text-xl font-black">M ITSales</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            An agency-backed sales management platform for growing retailers,
            distributors, and multi-branch teams that need clean inventory,
            billing, staff, and sales operations in one place.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-violet-300" />
              support@mitsales.com
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-violet-300" />
              +880 1700 000000
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-violet-300" />
              Dhaka, Bangladesh
            </span>
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
              {group.title}
            </h3>
            <div className="mt-4 grid gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright 2026 M ITSales. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="https://github.com/mahmudde" aria-label="GitHub" className="rounded-lg p-2 hover:bg-white/10">
              <Code2 className="h-4 w-4" />
            </Link>
            <Link href="mailto:support@mitsales.com" aria-label="Email Support" className="rounded-lg p-2 hover:bg-white/10">
              <Mail className="h-4 w-4" />
            </Link>
            <Link href="/support" aria-label="Support Page" className="rounded-lg p-2 hover:bg-white/10">
              <Globe2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
