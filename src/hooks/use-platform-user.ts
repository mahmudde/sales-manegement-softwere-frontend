"use client";

import { useQuery } from "@tanstack/react-query";

import { authKeys } from "@/modules/auth/auth.keys";
import { getPlatformUser } from "@/modules/platform/platform.api";

export function usePlatformUser() {
  return useQuery({
    queryKey: authKeys.platformMe,
    queryFn: getPlatformUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
