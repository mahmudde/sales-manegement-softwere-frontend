"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  updateStaffStatus,
} from "@/modules/staff/staff.api";
import { staffKeys } from "@/modules/staff/staff.keys";

export function useStaff(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: staffKeys.list(params),
    queryFn: () => getStaff(params),
  });
}

export function useStaffMember(id: string) {
  return useQuery({
    queryKey: staffKeys.detail(id),
    queryFn: () => getStaffById(id),
    enabled: !!id,
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
    },
  });
}

export function useUpdateStaff(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof updateStaff>[1]) =>
      updateStaff(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
      queryClient.invalidateQueries({ queryKey: staffKeys.detail(id) });
    },
  });
}

export function useUpdateStaffStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof updateStaffStatus>[1]) =>
      updateStaffStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
      queryClient.invalidateQueries({ queryKey: staffKeys.detail(id) });
    },
  });
}
