"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createShop,
  deleteShop,
  getShopById,
  getShops,
  updateShop,
} from "@/modules/shops/shops.api";
import { shopsKeys } from "@/modules/shops/shops.keys";

export function useShops(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: shopsKeys.list(params),
    queryFn: () => getShops(params),
  });
}

export function useShop(id: string) {
  return useQuery({
    queryKey: shopsKeys.detail(id),
    queryFn: () => getShopById(id),
    enabled: !!id,
  });
}

export function useCreateShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopsKeys.all });
    },
  });
}

export function useUpdateShop(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof updateShop>[1]) =>
      updateShop(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopsKeys.all });
      queryClient.invalidateQueries({ queryKey: shopsKeys.detail(id) });
    },
  });
}

export function useDeleteShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopsKeys.all });
    },
  });
}
