"use client";

import { useQuery } from "@tanstack/react-query";

import { getShops } from "@/modules/shop/shop.api";
import { shopsKeys } from "@/modules/shop/shop.keys";

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
