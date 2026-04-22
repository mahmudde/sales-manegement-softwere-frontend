"use client";

import { useQuery } from "@tanstack/react-query";
import { getInventory } from "@/modules/inventory/inventory.api";
import { inventoryKeys } from "@/modules/inventory/inventory.keys";

export function useInventory(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  shopId?: string;
  storageId?: string;
}) {
  return useQuery({
    queryKey: inventoryKeys.list(params),
    queryFn: () => getInventory(params),
    enabled: !!params.shopId && !!params.storageId,
  });
}
