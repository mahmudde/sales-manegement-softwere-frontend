import { apiClient } from "@/services/api-client";

const INVENTORY_BASE = "/inventory";

export async function getInventory(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  shopId?: string;
  storageId?: string;
}) {
  const res = await apiClient.get(INVENTORY_BASE, { params });
  return res.data;
}
