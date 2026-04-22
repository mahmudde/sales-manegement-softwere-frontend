"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addSalePayment,
  cancelSale,
  createSale,
  createSaleReturn,
  getSaleById,
  getSalePayments,
  getSaleReturns,
  getSales,
} from "@/modules/sales/sales.api";
import { salesKeys } from "@/modules/sales/sales.keys";

export function useSales(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  paymentStatus?: string;
  shopId?: string;
}) {
  return useQuery({
    queryKey: salesKeys.list(params),
    queryFn: () => getSales(params),
  });
}

export function useSale(id: string) {
  return useQuery({
    queryKey: salesKeys.detail(id),
    queryFn: () => getSaleById(id),
    enabled: !!id,
  });
}

export function useSalePayments(id: string) {
  return useQuery({
    queryKey: salesKeys.payments(id),
    queryFn: () => getSalePayments(id),
    enabled: !!id,
  });
}

export function useSaleReturns(id: string) {
  return useQuery({
    queryKey: salesKeys.returns(id),
    queryFn: () => getSaleReturns(id),
    enabled: !!id,
  });
}

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.all });
    },
  });
}

export function useAddSalePayment(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof addSalePayment>[1]) =>
      addSalePayment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: salesKeys.payments(id) });
      queryClient.invalidateQueries({ queryKey: salesKeys.all });
    },
  });
}

export function useCreateSaleReturn(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof createSaleReturn>[1]) =>
      createSaleReturn(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: salesKeys.returns(id) });
      queryClient.invalidateQueries({ queryKey: salesKeys.all });
    },
  });
}

export function useCancelSale(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof cancelSale>[1]) =>
      cancelSale(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: salesKeys.all });
    },
  });
}
