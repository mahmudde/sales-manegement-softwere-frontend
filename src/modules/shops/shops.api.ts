import { apiClient } from "@/services/api-client";
import type {
  CreateShopPayload,
  UpdateShopPayload,
} from "@/modules/shops/shops.types";

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

export async function getShopById(id: string) {
  const res = await apiClient.get(`${SHOPS_BASE}/${id}`);
  return res.data;
}

export async function createShop(payload: CreateShopPayload) {
  const res = await apiClient.post(SHOPS_BASE, payload);
  return res.data;
}

export async function updateShop(id: string, payload: UpdateShopPayload) {
  const res = await apiClient.patch(`${SHOPS_BASE}/${id}`, payload);
  return res.data;
}

export async function deleteShop(id: string) {
  const res = await apiClient.delete(`${SHOPS_BASE}/${id}`);
  return res.data;
}
