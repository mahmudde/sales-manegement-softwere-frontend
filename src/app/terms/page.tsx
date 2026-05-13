import PublicPageShell from "@/components/public/public-page-shell";

export default function TermsPage() {
  return (
    <PublicPageShell>
      <section className="bg-white py-14 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <p>
              M ITSales provides sales management software and optional agency
              onboarding support. Organizations are responsible for maintaining
              accurate product, stock, staff, and billing information inside
              their own workspace.
            </p>
            <p>
              Access to private dashboard features depends on account status,
              role permissions, and subscription state.
            </p>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
