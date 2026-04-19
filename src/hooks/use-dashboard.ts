"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  getDashboardOverview,
  getLowStock,
  getSalesAnalytics,
  getTopProducts,
} from "@/modules/dashboard/dashboard.api";
import { dashboardKeys } from "@/modules/dashboard/dashboard.keys";
import {
  DashboardOverview,
  SalesAnalyticsItem,
  TopProductItem,
  LowStockItem,
} from "@/types/dashboard.types";

// Standardizing your API structure
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

type QueryOptions<T> = Partial<UseQueryOptions<ApiResponse<T>>>;

export function useDashboardOverview(
  options?: QueryOptions<DashboardOverview>,
) {
  return useQuery({
    queryKey: dashboardKeys.overview,
    queryFn: getDashboardOverview,
    ...options,
  });
}

export function useSalesAnalytics(
  period: "daily" | "monthly",
  options?: QueryOptions<SalesAnalyticsItem[]>,
) {
  return useQuery({
    queryKey: dashboardKeys.salesAnalytics(period),
    queryFn: () => getSalesAnalytics(period),
    ...options,
  });
}

export function useTopProducts(options?: QueryOptions<TopProductItem[]>) {
  return useQuery({
    queryKey: dashboardKeys.topProducts,
    queryFn: getTopProducts,
    ...options,
  });
}

export function useLowStock(options?: QueryOptions<LowStockItem[]>) {
  return useQuery({
    queryKey: dashboardKeys.lowStock,
    queryFn: getLowStock,
    ...options,
  });
}
