import { apiClient } from "@/services/api-client";
import type {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/modules/categories/categories.types";

const CATEGORIES_BASE = "/categories";

export async function getCategories(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}) {
  const res = await apiClient.get(CATEGORIES_BASE, { params });
  return res.data;
}

export async function getCategoryById(id: string) {
  const res = await apiClient.get(`${CATEGORIES_BASE}/${id}`);
  return res.data;
}

export async function createCategory(payload: CreateCategoryPayload) {
  const res = await apiClient.post(CATEGORIES_BASE, payload);
  return res.data;
}

export async function updateCategory(
  id: string,
  payload: UpdateCategoryPayload,
) {
  const res = await apiClient.patch(`${CATEGORIES_BASE}/${id}`, payload);
  return res.data;
}

export async function deleteCategory(id: string) {
  const res = await apiClient.delete(`${CATEGORIES_BASE}/${id}`);
  return res.data;
}
