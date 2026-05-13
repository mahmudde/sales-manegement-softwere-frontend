import PublicPageShell from "@/components/public/public-page-shell";

export default function AboutPage() {
  return (
    <PublicPageShell>
      <section className="bg-white py-14 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            About
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            We connect customer acquisition with sales operations.
          </h1>
          <div className="mt-6 grid gap-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <p>
              M ITSales started as a private sales management dashboard for
              products, inventory, staff, shops, billing, and sales. The agency
              conversion adds a public website, inquiry flows, support pages,
              and pricing pages so new customers can discover the service
              before entering the dashboard.
            </p>
            <p>
              The platform is designed for retailers, distributors, and
              multi-branch businesses that need operational clarity without
              managing separate spreadsheets for stock, payments, and staff
              activity.
            </p>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
