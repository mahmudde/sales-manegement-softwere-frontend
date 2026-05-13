import PublicPageShell from "@/components/public/public-page-shell";
import { publicFeatures } from "@/lib/public-content";

export default function FeaturesPage() {
  return (
    <PublicPageShell>
      <section className="bg-white py-14 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            Features
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Built for public acquisition and private operations.
          </h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {publicFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="min-h-56 rounded-xl border border-slate-200 p-6 dark:border-slate-800">
                  <Icon className="h-8 w-8 text-violet-600 dark:text-violet-300" />
                  <h2 className="mt-4 text-lg font-black">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
