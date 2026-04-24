"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPaymentIntent,
  getBillingHistory,
  getBillingPlans,
  getBillingStatus,
} from "@/modules/billing/billing.api";
import { billingKeys } from "@/modules/billing/billing.keys";

export function useBillingPlans() {
  return useQuery({
    queryKey: billingKeys.plans,
    queryFn: getBillingPlans,
  });
}

export function useBillingStatus() {
  return useQuery({
    queryKey: billingKeys.status,
    queryFn: getBillingStatus,
  });
}

export function useBillingHistory() {
  return useQuery({
    queryKey: billingKeys.history,
    queryFn: getBillingHistory,
  });
}

export function useCreatePaymentIntent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: billingKeys.all });
    },
  });
}
