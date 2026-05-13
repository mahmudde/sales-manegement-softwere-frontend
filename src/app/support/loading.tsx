import { Skeleton } from "@/components/ui/skeleton";

export default function SupportLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-80 rounded" />
      <Skeleton className="mt-3 h-4 w-full rounded" />
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-11 rounded-xl" />
          <Skeleton className="h-11 rounded-xl" />
          <Skeleton className="h-11 rounded-xl" />
          <Skeleton className="h-11 rounded-xl" />
        </div>
        <Skeleton className="mt-4 h-36 rounded-xl" />
        <Skeleton className="mt-5 h-11 w-48 rounded-xl" />
      </div>
    </div>
  );
}
