"use client";

import Link from "next/link";
import { usePlatformDashboard } from "@/hooks/use-platform";
import {
  Building2,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  Loader2,
  AlertCircle,
  ArrowRight,
  ReceiptText,
  Package,
  Store,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function PlatformDashboardPage() {
  const { data, isLoading, isError } = usePlatformDashboard();

  const stats = data?.data?.summary ?? {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading platform dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
        <p className="text-sm font-medium text-destructive">
          Failed to load platform dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
            <LayoutDashboard className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">
              Platform Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor SaaS-wide organizations, subscriptions, and revenue.
            </p>
          </div>
        </div>

        <Button
          asChild
          className="h-12 rounded-2xl bg-violet-600 px-5 font-black uppercase shadow-lg hover:bg-violet-700"
        >
          <Link href="/platform/organizations">
            View Organizations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <PlatformStatCard
          title="Total Organizations"
          value={stats.totalOrganizations ?? 0}
          icon={<Building2 className="h-5 w-5 text-violet-600" />}
        />

        <PlatformStatCard
          title="Active Organizations"
          value={stats.activeOrganizations ?? 0}
          icon={<Building2 className="h-5 w-5 text-emerald-600" />}
        />

        <PlatformStatCard
          title="Suspended Organizations"
          value={stats.suspendedOrganizations ?? 0}
          icon={<Building2 className="h-5 w-5 text-rose-600" />}
        />

        <PlatformStatCard
          title="Total Users"
          value={stats.totalUsers ?? 0}
          icon={<Users className="h-5 w-5 text-violet-600" />}
        />

        <PlatformStatCard
          title="Total Shops"
          value={stats.totalShops ?? 0}
          icon={<Store className="h-5 w-5 text-violet-600" />}
        />

        <PlatformStatCard
          title="Total Products"
          value={stats.totalProducts ?? 0}
          icon={<Package className="h-5 w-5 text-violet-600" />}
        />

        <PlatformStatCard
          title="Total Sales"
          value={stats.totalSales ?? 0}
          icon={<ReceiptText className="h-5 w-5 text-violet-600" />}
        />

        <PlatformStatCard
          title="Total Revenue"
          value={formatCurrency(Number(stats.totalRevenue || 0))}
          icon={<DollarSign className="h-5 w-5 text-violet-600" />}
        />
      </div>
    </div>
  );
}

function PlatformStatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-muted/60 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
        {icon}
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-800">{value}</p>
    </div>
  );
}
