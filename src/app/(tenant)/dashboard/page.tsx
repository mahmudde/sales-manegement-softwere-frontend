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
} from "lucide-react";

import {
  useDashboardOverview,
  useLowStock,
  useSalesAnalytics,
  useTopProducts,
} from "@/hooks/use-dashboard";
import { useCurrentUser } from "@/hooks/use-current-user";

import StatCard from "@/components/charts/stat-card";
import SalesAnalyticsChart from "@/components/charts/sales-analytics-chart";
import SimpleListCard from "@/components/common/simple-list-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LowStockItem, TopProductItem } from "@/types/dashboard.types";

export default function DashboardPage() {
  const [period, setPeriod] = useState<"daily" | "monthly">("daily");

  const { data: userData } = useCurrentUser();
  const { data: overviewData, isLoading: overviewLoading } =
    useDashboardOverview();
  const { data: analyticsData, isLoading: analyticsLoading } =
    useSalesAnalytics(period);
  const { data: topProductsData, isLoading: topProductsLoading } =
    useTopProducts();
  const { data: lowStockData, isLoading: lowStockLoading } = useLowStock();

  const overview = overviewData?.data ?? {};
  const analytics = analyticsData?.data ?? [];
  const topProducts = topProductsData?.data ?? [];
  const lowStock = lowStockData?.data ?? [];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            Welcome back,{" "}
            <span className="text-violet-600">{userData?.data.name}</span>
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Here is what&apos;s happening with your organization today.
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-95">
          <TrendingUp className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Top Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Sales"
          value={overviewLoading ? "..." : (overview.totalSales ?? 0)}
          icon={<ShoppingCart className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
          description="Volume of orders"
        />
        <StatCard
          title="Total Revenue"
          value={
            overviewLoading
              ? "..."
              : `$${(overview.totalRevenue ?? 0).toLocaleString()}`
          }
          icon={<BadgeDollarSign className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
          description="Gross earnings"
        />
        <StatCard
          title="Total Due"
          value={
            overviewLoading
              ? "..."
              : `$${(overview.totalDue ?? 0).toLocaleString()}`
          }
          icon={<Wallet className="h-5 w-5" />}
          className="border-l-4 border-l-rose-500"
          description="Outstanding payments"
        />
        <StatCard
          title="Total Products"
          value={overviewLoading ? "..." : (overview.totalProducts ?? 0)}
          icon={<Package className="h-5 w-5" />}
          description="Active inventory items"
        />
      </div>

      {/* Main Analytics & Low Stock Grid */}
      <div className="grid gap-8 xl:grid-cols-3">
        {/* Sales Chart Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Sales Performance
                </h2>
                <p className="text-sm font-medium text-slate-500 italic">
                  Revenue vs Sales Volume
                </p>
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setPeriod("daily")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    period === "daily"
                      ? "bg-white dark:bg-slate-700 shadow-sm text-violet-600"
                      : "text-slate-500"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setPeriod("monthly")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    period === "monthly"
                      ? "bg-white dark:bg-slate-700 shadow-sm text-violet-600"
                      : "text-slate-500"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {analyticsLoading ? (
              <div className="h-[320px] w-full bg-slate-50 dark:bg-slate-800/20 rounded-2xl animate-pulse flex items-center justify-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Generating Chart...
                </p>
              </div>
            ) : (
              <SalesAnalyticsChart data={analytics} />
            )}
          </div>
        </div>

        {/* Low Stock List */}
        <SimpleListCard
          title="Low Stock Alerts"
          headerAction={<AlertTriangle className="h-4 w-4 text-amber-500" />}
        >
          {lowStockLoading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ) : lowStock.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm font-medium text-slate-400">
                All items are well stocked.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {lowStock.map((item: LowStockItem) => (
                <div
                  key={item.id}
                  className="group px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {item.shopName || item.storageName || "Main Warehouse"}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-rose-500">
                      {item.stock}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SimpleListCard>
      </div>

      {/* Top Products Section */}
      <SimpleListCard
        title="Top Performing Products"
        headerAction={
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-violet-600 hover:bg-violet-50"
          >
            View Inventory <ArrowRight className="ml-2 h-3 w-3" />
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
            {topProducts.map((item: TopProductItem) => (
              <div
                key={item.id}
                className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-600 transition-colors duration-300">
                    <Package className="h-6 w-6 text-slate-400 group-hover:text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900 dark:text-slate-100">
                      {item.totalSold}
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
