import PublicPageShell from "@/components/public/public-page-shell";

export default function PrivacyPage() {
  return (
    <PublicPageShell>
      <section className="bg-white py-14 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <p>
              M ITSales collects account, organization, contact, billing, and
              operational data only to provide sales management, support,
              subscription, and customer communication services.
            </p>
            <p>
              Customer inquiry data is used for demo follow-up and support.
              Dashboard data remains connected to the organization that owns it
              and is protected by role-based access.
            </p>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
