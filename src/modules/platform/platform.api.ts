import { apiClient } from "@/services/api-client";

const PLATFORM_BASE = "/platform";

export async function getPlatformDashboard() {
  const res = await apiClient.get(`${PLATFORM_BASE}/dashboard`);
  return res.data;
}

export async function getOrganizations(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
}) {
  const res = await apiClient.get(`${PLATFORM_BASE}/organizations`, {
    params,
  });
  return res.data;
}

export async function getOrganizationById(id: string) {
  const res = await apiClient.get(`${PLATFORM_BASE}/organizations/${id}`);
  return res.data;
}

export async function getPlatformUser() {
  const res = await apiClient.get("/auth/platform/me");
  return res.data;
}

export async function updateOrganizationStatus(
  id: string,
  payload: { status: string },
) {
  const res = await apiClient.patch(
    `${PLATFORM_BASE}/organizations/${id}`,
    payload,
  );
  return res.data;
}
