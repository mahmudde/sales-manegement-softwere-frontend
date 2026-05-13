import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import PublicPageShell from "@/components/public/public-page-shell";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/public-content";

export default async function PricingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = pricingPlans.find((item) => item.id === id);

  if (!plan) notFound();

  const relatedPlans = pricingPlans.filter((item) => item.id !== plan.id).slice(0, 3);

  return (
    <PublicPageShell>
      <section className="bg-slate-50 py-12 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button asChild variant="outline" className="mb-6 rounded-xl">
            <Link href="/pricing">
              <ArrowLeft className="h-4 w-4" />
              Back to pricing
            </Link>
          </Button>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
                {plan.category}
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                {plan.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                {plan.description}
              </p>
            </div>
            <aside className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-500">Starting at</p>
              <p className="mt-2 text-4xl font-black">
                Tk {plan.price.toLocaleString()}
                <span className="text-sm font-semibold text-slate-500">/mo</span>
              </p>
              <Button asChild className="mt-6 h-11 w-full rounded-xl bg-violet-600 text-white hover:bg-violet-700">
                <Link href="/contact">Request demo</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 h-11 w-full rounded-xl">
                <Link href="/register">Start account</Link>
              </Button>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-black">Overview</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              This plan is designed for teams that want a clean path from
              customer inquiry to operational delivery. The public website
              attracts prospects, while the private dashboard handles daily
              sales, stock, billing, and team activity.
            </p>
          </div>
          <div className="grid gap-3">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-semibold">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black">Related plans</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPlans.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="font-black">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
                <Button asChild variant="outline" className="mt-4 rounded-xl">
                  <Link href={`/pricing/${item.id}`}>View Details</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
