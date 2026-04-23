import { apiClient } from "@/services/api-client";
import { CreateStoragePayload, UpdateStoragePayload } from "./storages.type";

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

export async function getStorageById(id: string) {
  const res = await apiClient.get(`${STORAGES_BASE}/${id}`);
  return res.data;
}

export async function createStorage(payload: CreateStoragePayload) {
  const res = await apiClient.post(STORAGES_BASE, payload);
  return res.data;
}

export async function updateStorage(id: string, payload: UpdateStoragePayload) {
  const res = await apiClient.patch(`${STORAGES_BASE}/${id}`, payload);
  return res.data;
}

export async function deleteStorage(id: string) {
  const res = await apiClient.delete(`${STORAGES_BASE}/${id}`);
  return res.data;
}
