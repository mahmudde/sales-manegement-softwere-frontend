import PublicPageShell from "@/components/public/public-page-shell";
import PricingListing from "@/components/public/pricing-listing";

export default function PricingPage() {
  return (
    <PublicPageShell>
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            Pricing
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Choose the right operating plan.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Compare customer-ready plans for retail teams, distributors,
            multi-shop operators, and managed agency onboarding.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingListing />
        </div>
      </section>
    </PublicPageShell>
  );
}
