import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export async function getDashboardOverview() {
  const res = await apiClient.get(ENDPOINTS.DASHBOARD.OVERVIEW);
  return res.data;
}

export async function getSalesAnalytics(period: "daily" | "monthly") {
  const res = await apiClient.get(ENDPOINTS.DASHBOARD.SALES_ANALYTICS, {
    params: { period },
  });
  return res.data;
}

export async function getTopProducts() {
  const res = await apiClient.get(ENDPOINTS.DASHBOARD.TOP_PRODUCTS);
  return res.data;
}

export async function getLowStock() {
  const res = await apiClient.get(ENDPOINTS.DASHBOARD.LOW_STOCK);
  return res.data;
}
