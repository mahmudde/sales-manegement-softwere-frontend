import { Skeleton } from "@/components/ui/skeleton";

export default function PricingDetailsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-40 rounded-xl" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="mt-3 h-10 w-80 rounded" />
          <Skeleton className="mt-4 h-4 w-full rounded" />
          <Skeleton className="mt-2 h-4 w-5/6 rounded" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="mt-3 h-10 w-40 rounded" />
          <Skeleton className="mt-6 h-11 w-full rounded-xl" />
          <Skeleton className="mt-3 h-11 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
