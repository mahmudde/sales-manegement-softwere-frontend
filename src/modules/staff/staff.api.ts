import { apiClient } from "@/services/api-client";
import type {
  CreateStaffPayload,
  UpdateStaffPayload,
  UpdateStaffStatusPayload,
} from "@/modules/staff/staff.types";

const STAFF_BASE = "/staff";

function staffFormData(payload: CreateStaffPayload | UpdateStaffPayload) {
  const formData = new FormData();

  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.email !== undefined) formData.append("email", payload.email);
  if ("password" in payload && payload.password) {
    formData.append("password", payload.password);
  }
  if (payload.phone !== undefined) formData.append("phone", payload.phone);
  if (payload.role !== undefined) formData.append("role", payload.role);
  if (payload.shopId !== undefined) formData.append("shopId", payload.shopId);
  if (payload.image) formData.append("image", payload.image);

  return formData;
}

export async function getStaff(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
}) {
  const res = await apiClient.get(STAFF_BASE, { params });
  return res.data;
}

export async function getStaffById(id: string) {
  const res = await apiClient.get(`${STAFF_BASE}/${id}`);
  return res.data;
}

export async function createStaff(payload: CreateStaffPayload) {
  const res = await apiClient.post(STAFF_BASE, staffFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function updateStaff(id: string, payload: UpdateStaffPayload) {
  const res = await apiClient.patch(
    `${STAFF_BASE}/${id}`,
    staffFormData(payload),
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return res.data;
}

export async function updateStaffStatus(
  id: string,
  payload: UpdateStaffStatusPayload,
) {
  const res = await apiClient.patch(`${STAFF_BASE}/${id}/status`, payload);
  return res.data;
}
