"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/modules/auth/auth.api";
import { authKeys } from "@/modules/auth/auth.keys";

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
