import Link from "next/link";

import PublicPageShell from "@/components/public/public-page-shell";

const posts = [
  {
    title: "How open agency pages improve SaaS customer onboarding",
    description:
      "A public website gives customers pricing, support, and demo paths before they enter the private dashboard.",
  },
  {
    title: "Why inventory movement should be connected to every sale",
    description:
      "Sales, returns, and stock movements need one shared record so managers can trust dashboard metrics.",
  },
  {
    title: "Role-based dashboards for multi-branch retail teams",
    description:
      "Organization admins, shop admins, and staff need different views of the same operational system.",
  },
];

export default function BlogPage() {
  return (
    <PublicPageShell>
      <section className="bg-white py-14 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            Blog
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Practical sales operations notes.
          </h1>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.title} className="flex min-h-56 flex-col rounded-xl border border-slate-200 p-6 dark:border-slate-800">
                <h2 className="text-lg font-black">{post.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {post.description}
                </p>
                <Link href="/contact" className="mt-auto text-sm font-bold text-violet-600 dark:text-violet-300">
                  Discuss this with the agency
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
