import { apiClient } from "@/services/api-client";
import type {
  StockInPayload,
  StockOutPayload,
} from "@/modules/inventory/inventory.types";

const INVENTORY_BASE = "/inventory";

export async function getInventory(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  shopId?: string;
  storageId?: string;
  productId?: string;
}) {
  const res = await apiClient.get(INVENTORY_BASE, { params });
  return res.data;
}

export async function getInventoryTransactions(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  shopId?: string;
  storageId?: string;
  productId?: string;
  type?: string;
}) {
  const res = await apiClient.get(`${INVENTORY_BASE}/transactions`, {
    params,
  });
  return res.data;
}

export async function stockIn(payload: StockInPayload) {
  const res = await apiClient.post(`${INVENTORY_BASE}/stock-in`, payload);
  return res.data;
}

export async function stockOut(payload: StockOutPayload) {
  const res = await apiClient.post(`${INVENTORY_BASE}/stock-out`, payload);
  return res.data;
}
