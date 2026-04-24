/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrganizations,
  getOrganizationById,
  getPlatformDashboard,
  updateOrganizationStatus,
} from "@/modules/platform/platform.api";

export function usePlatformDashboard() {
  return useQuery({
    queryKey: ["platform", "dashboard"],
    queryFn: getPlatformDashboard,
  });
}

export function useOrganizations(params: any) {
  return useQuery({
    queryKey: ["platform", "organizations", params],
    queryFn: () => getOrganizations(params),
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ["platform", "organization", id],
    queryFn: () => getOrganizationById(id),
    enabled: !!id,
  });
}

export function useUpdateOrganizationStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { status: string }) =>
      updateOrganizationStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform"] });
    },
  });
}
