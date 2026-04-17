"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardOverview,
  getLowStock,
  getSalesAnalytics,
  getTopProducts,
} from "@/modules/dashboard/dashboard.api";
import { dashboardKeys } from "@/modules/dashboard/dashboard.keys";

export function useDashboardOverview() {
  return useQuery({
    queryKey: dashboardKeys.overview,
    queryFn: getDashboardOverview,
  });
}

export function useSalesAnalytics(period: "daily" | "monthly") {
  return useQuery({
    queryKey: dashboardKeys.salesAnalytics(period),
    queryFn: () => getSalesAnalytics(period),
  });
}

export function useTopProducts() {
  return useQuery({
    queryKey: dashboardKeys.topProducts,
    queryFn: getTopProducts,
  });
}

export function useLowStock() {
  return useQuery({
    queryKey: dashboardKeys.lowStock,
    queryFn: getLowStock,
  });
}
