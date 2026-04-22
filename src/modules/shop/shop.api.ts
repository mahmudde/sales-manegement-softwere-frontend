import { apiClient } from "@/services/api-client";

const SHOPS_BASE = "/shops";

export async function getShops(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}) {
  const res = await apiClient.get(SHOPS_BASE, { params });
  return res.data;
}
