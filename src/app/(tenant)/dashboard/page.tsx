"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  ArrowRight,
  Loader2,
  Package,
  AlertTriangle,
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

type DashboardRole =
  | "ORG_SUPER_ADMIN"
  | "ORG_ADMIN"
  | "SHOP_ADMIN"
  | "STAFF"
  | "PLATFORM_SUPER_ADMIN";

type QuickAction = {
  title: string;
  description: string;
  href: string;
};

type DashboardItem = {
  id: string;
  name?: string;
  productName?: string;
  shopName?: string;
  storageName?: string;
  quantity?: number;
  stock?: number;
  availableQuantity?: number;
  totalSold?: number;
  product?: {
    name?: string;
  };
  shop?: {
    name?: string;
  };
  storage?: {
    name?: string;
  };
};

const platformActions: QuickAction[] = [
  {
    title: "Platform Dashboard",
    description: "View full system overview and platform metrics.",
    href: "/platform/dashboard",
  },
  {
    title: "Organizations",
    description: "Manage organizations across the whole system.",
    href: "/platform/organizations",
  },
];

const adminActions: QuickAction[] = [
  {
    title: "Manage Staff",
    description: "Create users, assign roles, and control staff access.",
    href: "/staff",
  },
  {
    title: "Manage Shops",
    description: "Add and update organization shops.",
    href: "/shops",
  },
  {
    title: "Manage Storages",
    description: "Control stock locations and shop-wise storage.",
    href: "/storages",
  },
  {
    title: "Stock Management",
    description: "Perform stock in/out and monitor inventory.",
    href: "/inventory",
  },
  {
    title: "Billing",
    description: "Manage subscription plan and Stripe payments.",
    href: "/billing",
  },
  {
    title: "Create Sale",
    description: "Create a new sales transaction.",
    href: "/sales/create",
  },
];

const shopAdminActions: QuickAction[] = [
  {
    title: "Create Sale",
    description: "Process customer sales transactions.",
    href: "/sales/create",
  },
  {
    title: "View Sales",
    description: "Track shop sales and payments.",
    href: "/sales",
  },
  {
    title: "Inventory",
    description: "Monitor product stock availability.",
    href: "/inventory",
  },
  {
    title: "Products",
    description: "View and manage product catalog.",
    href: "/products",
  },
];

const staffActions: QuickAction[] = [
  {
    title: "Create Sale",
    description: "Process a new sale quickly.",
    href: "/sales/create",
  },
  {
    title: "View Products",
    description: "Check product catalog and pricing.",
    href: "/products",
  },
  {
    title: "View Inventory",
    description: "Check available stock.",
    href: "/inventory",
  },
];

function getRole(
  userData: ReturnType<typeof useCurrentUser>["data"],
): DashboardRole | undefined {
  const user = userData?.data;

  return (user?.role ||
    user?.platformRole ||
    user?.organizationMembers?.[0]?.role) as DashboardRole | undefined;
}

function getActionsByRole(role?: DashboardRole): QuickAction[] {
  if (role === "PLATFORM_SUPER_ADMIN") {
    return platformActions;
  }

  if (role === "ORG_SUPER_ADMIN" || role === "ORG_ADMIN") {
    return adminActions;
  }

  if (role === "SHOP_ADMIN") {
    return shopAdminActions;
  }

  return staffActions;
}

function getDashboardSubtitle(role?: DashboardRole) {
  if (role === "PLATFORM_SUPER_ADMIN") {
    return "Platform super admin overview with access to system-wide organizations and platform controls.";
  }

  if (role === "ORG_SUPER_ADMIN") {
    return "Organization owner overview with access to staff, billing, shops, inventory, products, and sales.";
  }

  if (role === "ORG_ADMIN") {
    return "Organization admin overview for managing business operations and team resources.";
  }

  if (role === "SHOP_ADMIN") {
    return "Shop-focused overview for sales, product visibility, and inventory monitoring.";
  }

  return "Staff overview for sales and operational tasks.";
}

function getProductName(item: DashboardItem) {
  return item.product?.name || item.productName || item.name || "Unknown";
}

function getItemLocation(item: DashboardItem) {
  return (
    item.shop?.name ||
    item.shopName ||
    item.storage?.name ||
    item.storageName ||
    "Inventory item"
  );
}

function getStockQuantity(item: DashboardItem) {
  return item.quantity ?? item.stock ?? item.availableQuantity ?? 0;
}

function getSoldQuantity(item: DashboardItem) {
  return item.totalSold ?? item.quantity ?? 0;
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<"daily" | "monthly">("daily");

  const { data: userData } = useCurrentUser();
  const role = getRole(userData);
  const isPlatformAdmin = role === "PLATFORM_SUPER_ADMIN";

  const { data: overviewData, isLoading: overviewLoading } =
    useDashboardOverview();

  const { data: analyticsData, isLoading: analyticsLoading } =
    useSalesAnalytics(period);

  const { data: topProductsData, isLoading: topProductsLoading } =
    useTopProducts();

  const { data: lowStockData, isLoading: lowStockLoading } = useLowStock();

  const overview = overviewData?.data ?? {};
  const analytics = Array.isArray(analyticsData?.data)
    ? analyticsData.data
    : [];

  const topProducts: DashboardItem[] = Array.isArray(topProductsData?.data)
    ? topProductsData.data
    : [];

  const lowStock: DashboardItem[] = Array.isArray(lowStockData?.data)
    ? lowStockData.data
    : [];

  const quickActions = getActionsByRole(role);
  const userName = userData?.data?.name || "there";

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
            <LayoutDashboard className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">
              Welcome back, {userName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {getDashboardSubtitle(role)}
            </p>
          </div>
        </div>
      </div>

      {isPlatformAdmin ? (
        <section className="space-y-4">
          <div className="rounded-2xl border border-muted/60 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-800">
              Platform Quick Actions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You are signed in as the system-wide platform super admin.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black text-slate-800">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-violet-500 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Sales"
              value={
                overviewLoading ? "Loading..." : (overview.totalSales ?? 0)
              }
            />
            <StatCard
              title="Total Revenue"
              value={
                overviewLoading ? "Loading..." : (overview.totalRevenue ?? 0)
              }
            />
            <StatCard
              title="Total Due"
              value={overviewLoading ? "Loading..." : (overview.totalDue ?? 0)}
            />
            <StatCard
              title="Total Products"
              value={
                overviewLoading ? "Loading..." : (overview.totalProducts ?? 0)
              }
            />
          </section>

          <section className="space-y-4">
            <div className="rounded-2xl border border-muted/60 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-800">
                Quick Actions
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Actions are shown based on your organization role.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black text-slate-800">
                        {action.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 text-violet-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <div className="rounded-3xl border border-muted/60 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-black text-slate-800">
                      Sales Analytics
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Track sales performance by period.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={period === "daily" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPeriod("daily")}
                      className="rounded-xl"
                    >
                      Daily
                    </Button>
                    <Button
                      type="button"
                      variant={period === "monthly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPeriod("monthly")}
                      className="rounded-xl"
                    >
                      Monthly
                    </Button>
                  </div>
                </div>

                {analyticsLoading ? (
                  <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-violet-500" />
                    Loading analytics...
                  </div>
                ) : (
                  <SalesAnalyticsChart data={analytics} />
                )}
              </div>
            </div>

            <SimpleListCard title="Low Stock Alerts">
              {lowStockLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading low stock...
                </p>
              ) : lowStock.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No low stock items found.
                </p>
              ) : (
                <div className="space-y-3">
                  {lowStock.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="font-medium">{getProductName(item)}</p>
                          <p className="text-xs text-muted-foreground">
                            {getItemLocation(item)}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                        {getStockQuantity(item)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </SimpleListCard>
          </section>

          <SimpleListCard title="Top Products">
            {topProductsLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading top products...
              </p>
            ) : topProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No top products data found.
              </p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-violet-500" />
                      <div>
                        <p className="font-medium">{getProductName(item)}</p>
                        <p className="text-xs text-muted-foreground">
                          Best-selling product
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                      {getSoldQuantity(item)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </SimpleListCard>
        </>
      )}
    </div>
  );
}
