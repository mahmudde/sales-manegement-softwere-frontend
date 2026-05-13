import PublicPageShell from "@/components/public/public-page-shell";
import { publicServices } from "@/lib/public-content";

export default function ServicesPage() {
  return (
    <PublicPageShell>
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            Services
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Agency services around your sales platform.
          </h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {publicServices.map((service) => (
              <article key={service.title} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-lg font-black">{service.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
