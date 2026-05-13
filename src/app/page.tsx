import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import PublicPageShell from "@/components/public/public-page-shell";
import { Button } from "@/components/ui/button";
import {
  audienceCards,
  faqs,
  pricingPlans,
  publicFeatures,
  publicServices,
  publicStats,
  testimonials,
  workflowSteps,
} from "@/lib/public-content";

export default function Home() {
  return (
    <PublicPageShell>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid min-h-[66vh] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-sm font-semibold text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200">
              <Sparkles className="h-4 w-4" />
              Agency-backed sales management software
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Open your sales operation to smarter customer growth.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              M ITSales combines a public agency website, customer inquiry
              flows, subscription plans, and a private sales dashboard for
              inventory, staff, billing, and branch operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-xl bg-violet-600 px-5 text-white hover:bg-violet-700">
                <Link href="/contact">
                  Request demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-5">
                <Link href="/pricing">
                  <PlayCircle className="h-4 w-4" />
                  View pricing
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
            <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 text-white dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Live agency console</p>
                  <h2 className="text-xl font-black">Sales overview</h2>
                </div>
                <ShieldCheck className="h-8 w-8 text-emerald-300" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Revenue", "Stock", "Dues"].map((item, index) => (
                  <div key={item} className="rounded-xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      {item}
                    </p>
                    <p className="mt-2 text-2xl font-black">
                      {index === 0 ? "82%" : index === 1 ? "1.4k" : "24"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-44 rounded-xl bg-gradient-to-t from-violet-600/50 to-emerald-300/20 p-4">
                <div className="flex h-full items-end gap-3">
                  {[35, 58, 45, 76, 64, 88, 70].map((height) => (
                    <span
                      key={height}
                      className="flex-1 rounded-t-lg bg-white/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-3">
                {["Demo request received", "Stock warning resolved", "Invoice payment collected"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {publicStats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <p className="text-3xl font-black text-violet-600 dark:text-violet-300">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
              Features
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Everything an open sales agency platform needs.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {publicFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="flex min-h-56 flex-col rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-black">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
                Services
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Software plus agency support.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                The open website brings customers in, while the agency service
                layer helps them adopt the dashboard correctly.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {publicServices.map((service) => (
                <div key={service.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <h3 className="font-black">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {audienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
                  <Icon className="h-8 w-8 text-violet-600 dark:text-violet-300" />
                  <h3 className="mt-4 text-lg font-black">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-violet-300">
                Workflow
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                From public visitor to active customer.
              </h2>
            </div>
            <div className="grid gap-4">
              {workflowSteps.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500 font-black">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-black">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
                Pricing
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Plans for real sales teams.
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/pricing">Explore all plans</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricingPlans.map((plan) => (
              <article key={plan.id} className="flex min-h-[360px] flex-col rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-black">{plan.name}</h3>
                  {plan.popular ? (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>
                <p className="mt-5 text-3xl font-black">
                  Tk {plan.price.toLocaleString()}
                  <span className="text-sm font-semibold text-slate-500">
                    /mo
                  </span>
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                  {plan.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-auto rounded-xl bg-violet-600 text-white hover:bg-violet-700">
                  <Link href={`/pricing/${plan.id}`}>View Details</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <blockquote className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  &quot;{item.quote}&quot;
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-black">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BarChart3 className="mx-auto h-9 w-9 text-violet-600 dark:text-violet-300" />
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-8 grid gap-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
                <h3 className="font-black">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-violet-600 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Ready to open the platform to customers?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100">
              Start with the public website, collect inquiries, then bring
              qualified customers into the private sales dashboard.
            </p>
          </div>
          <Button asChild variant="secondary" className="h-12 rounded-xl px-5">
            <Link href="/contact">
              Talk to the agency
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicPageShell>
  );
}
