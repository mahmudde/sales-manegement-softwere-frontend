"use client";

import { useState } from "react";
import {
  BadgeDollarSign,
  ShoppingCart,
  Wallet,
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Users,
  Store,
} from "lucide-react";

import {
  useDashboardOverview,
  useLowStock,
  useSalesAnalytics,
  useTopProducts,
} from "@/hooks/use-dashboard";
import { useCurrentUser } from "@/hooks/use-current-user";

// Import your formatters

import StatCard from "@/components/charts/stat-card";
import SalesAnalyticsChart from "@/components/charts/sales-analytics-chart";
import SimpleListCard from "@/components/common/simple-list-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  DashboardOverview,
  LowStockItem,
  TopProductItem,
  SalesAnalyticsItem,
} from "@/types/dashboard.types";
import { formatCurrency, formatNumber } from "@/lib/format";

export default function DashboardPage() {
  const [period, setPeriod] = useState<"daily" | "monthly">("daily");
  const { data: userData } = useCurrentUser();

  const {
    data: overviewData,
    isLoading: overviewLoading,
    isFetching: overviewFetching,
  } = useDashboardOverview({
    refetchInterval: 1000 * 60,
  });

  const { data: analyticsData, isLoading: analyticsLoading } =
    useSalesAnalytics(period);
  const { data: topProductsData, isLoading: topProductsLoading } =
    useTopProducts();
  const { data: lowStockData, isLoading: lowStockLoading } = useLowStock();

  const overview: DashboardOverview = overviewData?.data ?? {};
  const analytics: SalesAnalyticsItem[] = analyticsData?.data ?? [];
  const topProducts: TopProductItem[] = topProductsData?.data ?? [];
  const lowStock: LowStockItem[] = lowStockData?.data ?? [];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              Nexus <span className="text-violet-600">Sales</span>
            </h1>
            <div
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 transition-opacity duration-500",
                overviewFetching && !overviewLoading
                  ? "opacity-100"
                  : "opacity-0",
              )}
            >
              <RefreshCw className="h-3 w-3 text-emerald-600 animate-spin" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                Live Sync
              </span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, {userData?.data.name}. Here is what&apos;s happening
            today.
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg transition-all active:scale-95 group">
          <TrendingUp className="mr-2 h-4 w-4 group-hover:translate-y-[-1px] transition-transform" />
          Analytics Report
        </Button>
      </div>

      {/* Financial Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={
            overviewLoading ? "..." : formatCurrency(overview.totalRevenue ?? 0)
          }
          icon={<BadgeDollarSign className="h-5 w-5" />}
          description="Gross earnings (BDT)"
        />
        <StatCard
          title="Outstanding Due"
          value={
            overviewLoading ? "..." : formatCurrency(overview.totalDue ?? 0)
          }
          icon={<Wallet className="h-5 w-5" />}
          className="border-l-4 border-l-rose-500"
          description="Pending collection"
        />
        <StatCard
          title="Total Sales"
          value={
            overviewLoading ? "..." : formatNumber(overview.totalSales ?? 0)
          }
          icon={<ShoppingCart className="h-5 w-5" />}
          description="Successful orders"
        />
        <StatCard
          title="Active Products"
          value={
            overviewLoading ? "..." : formatNumber(overview.totalProducts ?? 0)
          }
          icon={<Package className="h-5 w-5" />}
          description="Items in catalog"
        />
      </div>

      {/* Secondary Stats Grid (Customers/Shops/Staff) */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              Total Customers
            </p>
            <p className="text-xl font-black">
              {overviewLoading
                ? "..."
                : formatNumber(overview.totalCustomers ?? 0)}
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              Shop Outlets
            </p>
            <p className="text-xl font-black">
              {overviewLoading ? "..." : formatNumber(overview.totalShops ?? 0)}
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-500/10 text-violet-600">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              Active Staff
            </p>
            <p className="text-xl font-black">
              {overviewLoading ? "..." : formatNumber(overview.totalStaff ?? 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-bold tracking-tight">
                Sales Analytics
              </h2>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {(["daily", "monthly"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={cn(
                      "px-5 py-1.5 text-xs font-bold rounded-lg transition-all capitalize",
                      period === p
                        ? "bg-white dark:bg-slate-700 text-violet-600 shadow-sm"
                        : "text-slate-500",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            {analyticsLoading ? (
              <Skeleton className="h-[320px] w-full rounded-2xl" />
            ) : (
              <SalesAnalyticsChart data={analytics} />
            )}
          </div>
        </div>

        {/* Low Stock Alerts List */}
        <SimpleListCard
          title="Stock Alerts"
          headerAction={<AlertTriangle className="h-4 w-4 text-amber-500" />}
        >
          {lowStockLoading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {lowStock.map((item) => (
                <div
                  key={item.id}
                  className="group px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                      {item.shopName || item.storageName || "Warehouse"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-rose-500">
                      {formatNumber(item.stock)}
                    </span>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">
                      Qty Left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SimpleListCard>
      </div>

      {/* Top Products Grid */}
      <SimpleListCard
        title="Best Selling Items"
        headerAction={
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-violet-600 group/btn"
          >
            Full Inventory{" "}
            <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        }
      >
        {topProductsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y md:divide-y-0 border-t border-slate-50 dark:border-slate-800">
            {topProducts.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                    <Package className="h-6 w-6 text-slate-400 group-hover:text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900 dark:text-slate-100">
                      {formatNumber(item.totalSold)}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Units Sold
                    </p>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-slate-700 dark:text-slate-300 group-hover:text-violet-600 transition-colors">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </SimpleListCard>
    </div>
  );
}
