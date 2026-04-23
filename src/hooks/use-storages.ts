"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStorage,
  deleteStorage,
  getStorageById,
  getStorages,
  updateStorage,
} from "@/modules/storages/storages.api";
import { storagesKeys } from "@/modules/storages/storages.keys";

export function useStorages(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  shopId?: string;
}) {
  return useQuery({
    queryKey: storagesKeys.list(params),
    queryFn: () => getStorages(params),
  });
}

export function useStorage(id: string) {
  return useQuery({
    queryKey: storagesKeys.detail(id),
    queryFn: () => getStorageById(id),
    enabled: !!id,
  });
}

export function useCreateStorage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStorage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storagesKeys.all });
    },
  });
}

export function useUpdateStorage(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof updateStorage>[1]) =>
      updateStorage(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storagesKeys.all });
      queryClient.invalidateQueries({ queryKey: storagesKeys.detail(id) });
    },
  });
}

export function useDeleteStorage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStorage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storagesKeys.all });
    },
  });
}
