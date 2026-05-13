"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pricingPlans } from "@/lib/public-content";
import { Skeleton } from "@/components/ui/skeleton";

type SortOption = "recommended" | "price-asc" | "price-desc";

export default function PricingListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [isFiltering, setIsFiltering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFiltering(false), 350);
    return () => clearTimeout(timer);
  }, [searchTerm, category, price, sort]);

  const filteredPlans = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return pricingPlans
      .filter((plan) => {
        const matchesSearch =
          !normalizedSearch ||
          plan.name.toLowerCase().includes(normalizedSearch) ||
          plan.description.toLowerCase().includes(normalizedSearch) ||
          plan.category.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
          category === "all" || plan.category === category;

        const matchesPrice =
          price === "all" ||
          (price === "under-5000" && plan.price < 5000) ||
          (price === "5000-10000" && plan.price >= 5000 && plan.price <= 10000) ||
          (price === "over-10000" && plan.price > 10000);

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return Number(b.popular) - Number(a.popular);
      });
  }, [category, price, searchTerm, sort]);

  const categories = ["all", ...Array.from(new Set(pricingPlans.map((plan) => plan.category)))];

  return (
    <div>
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50 lg:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search plans by name, team, or feature"
            className="h-11 rounded-xl pl-9"
          />
        </div>

        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 dark:border-slate-800">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 bg-transparent text-sm font-semibold outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All categories" : item}
              </option>
            ))}
          </select>
        </label>

        <select
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-transparent px-3 text-sm font-semibold outline-none dark:border-slate-800"
        >
          <option value="all">All prices</option>
          <option value="under-5000">Under Tk 5,000</option>
          <option value="5000-10000">Tk 5,000 to 10,000</option>
          <option value="over-10000">Over Tk 10,000</option>
        </select>

        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 dark:border-slate-800">
          <ArrowUpDown className="h-4 w-4 text-slate-400" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-11 bg-transparent text-sm font-semibold outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isFiltering
          ? Array.from({ length: 4 }).map((_, idx) => (
              <article
                key={`skeleton-${idx}`}
                className="flex min-h-[430px] flex-col rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <Skeleton className="aspect-[4/3] rounded-xl" />
                <Skeleton className="mt-4 h-5 w-2/3" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
                <Skeleton className="mt-4 h-4 w-1/2" />
                <Skeleton className="mt-auto h-10 w-full rounded-xl" />
              </article>
            ))
          : filteredPlans.map((plan) => (
              <article key={plan.id} className="flex min-h-[430px] flex-col rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="aspect-[4/3] rounded-xl bg-slate-950 p-4 text-white">
                  <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-violet-200">
                        {plan.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-black">{plan.name}</h3>
                    </div>
                    <p className="text-3xl font-black">Tk {plan.price.toLocaleString()}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>
                <div className="mt-4 text-sm font-semibold text-slate-500">
                  {plan.features.length} included capabilities
                </div>
                <Button asChild className="mt-auto rounded-xl bg-violet-600 text-white hover:bg-violet-700">
                  <Link href={`/pricing/${plan.id}`}>View Details</Link>
                </Button>
              </article>
            ))}
      </div>

      {filteredPlans.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <p className="font-bold">No plans match your filters.</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different category or price range.
          </p>
        </div>
      ) : null}
    </div>
  );
}
