"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInventory,
  getInventoryTransactions,
  stockIn,
  stockOut,
} from "@/modules/inventory/inventory.api";
import { inventoryKeys } from "@/modules/inventory/inventory.keys";

export function useInventory(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  shopId?: string;
  storageId?: string;
  productId?: string;
}) {
  return useQuery({
    queryKey: inventoryKeys.list(params),
    queryFn: () => getInventory(params),
  });
}

export function useInventoryTransactions(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  shopId?: string;
  storageId?: string;
  productId?: string;
  type?: string;
}) {
  return useQuery({
    queryKey: inventoryKeys.transactions(params),
    queryFn: () => getInventoryTransactions(params),
  });
}

export function useStockIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stockIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
    },
  });
}

export function useStockOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stockOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
    },
  });
}
