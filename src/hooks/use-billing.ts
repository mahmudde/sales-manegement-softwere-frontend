"use client";

import { useQuery } from "@tanstack/react-query";
import { getBillingStatus } from "@/modules/billing/billing.api";

export function useBillingStatus(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["billing", "status"],
    queryFn: getBillingStatus,
    enabled: options?.enabled ?? true,
  });
}
