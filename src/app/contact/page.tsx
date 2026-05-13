import { Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "@/components/public/contact-form";
import PublicPageShell from "@/components/public/public-page-shell";

export default function ContactPage() {
  return (
    <PublicPageShell>
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
              Contact
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Tell us how your sales team works.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Share your shop count, inventory pain points, billing needs, or
              onboarding goals. The next backend phase will store these as
              agency leads for admin follow-up.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-violet-600" /> support@mitsales.com</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-violet-600" /> +880 1700 000000</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-violet-600" /> Dhaka, Bangladesh</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </PublicPageShell>
  );
}
