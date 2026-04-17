"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { parseApiError } from "@/lib/error-parser";
import TenantShell from "@/components/layout/tenant-shell";

type TenantLayoutProps = {
  children: ReactNode;
};

export default function TenantLayout({ children }: TenantLayoutProps) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useCurrentUser();

  const parsedError = isError ? parseApiError(error) : null;
  const errorMessage = parsedError?.message?.toLowerCase() || "";

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      // Handle subscription-specific redirects
      if (
        errorMessage.includes("subscription") ||
        errorMessage.includes("expired") ||
        errorMessage.includes("inactive")
      ) {
        router.replace("/billing");
        return;
      }

      router.replace("/login");
      return;
    }

    if (!data?.data) {
      router.replace("/login");
      return;
    }

    // Redirect Platform Admins away from the Tenant space
    if (data.data.role === "PLATFORM_SUPER_ADMIN") {
      router.replace("/platform/dashboard");
      return;
    }
  }, [data, isLoading, isError, errorMessage, router]);

  // Premium Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFE] dark:bg-[#020617]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          {/* Pulsing Brand Mark */}
          <div className="relative mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-200 dark:shadow-none relative z-10">
              <Zap className="h-8 w-8 text-white fill-white/20" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-violet-400 rounded-2xl -z-0"
            />
          </div>

          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
            <p className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
              Authenticating
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Prevent flash of content during redirects
  if (isError || !data?.data || data.data.role === "PLATFORM_SUPER_ADMIN") {
    return null;
  }

  return <TenantShell>{children}</TenantShell>;
}
