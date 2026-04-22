import { apiClient } from "@/services/api-client";

const STORAGES_BASE = "/storages";

export async function getStorages(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  shopId?: string;
}) {
  const res = await apiClient.get(STORAGES_BASE, { params });
  return res.data;
}
