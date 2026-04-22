"use client";

import { useQuery } from "@tanstack/react-query";
import { getStorages } from "@/modules/storages/storages.api";
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
