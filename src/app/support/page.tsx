import ContactForm from "@/components/public/contact-form";
import PublicPageShell from "@/components/public/public-page-shell";
import { faqs } from "@/lib/public-content";

export default function SupportPage() {
  return (
    <PublicPageShell>
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
              Support
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Get help with onboarding and operations.
            </h1>
            <div className="mt-6 grid gap-3">
              {faqs.slice(0, 3).map((faq) => (
                <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <h2 className="font-black">{faq.question}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </PublicPageShell>
  );
}
