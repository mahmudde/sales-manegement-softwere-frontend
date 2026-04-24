/* eslint-disable @typescript-eslint/no-explicit-any */
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

function getUserRole(user: any) {
  return (
    user?.role || user?.platformRole || user?.organizationMembers?.[0]?.role
  );
}

function isPlatformSuperAdmin(user: any) {
  return getUserRole(user) === "PLATFORM_SUPER_ADMIN";
}

function hasTenantAccess(user: any) {
  return Boolean(user?.organizationMembers?.length);
}

export default function TenantLayout({ children }: TenantLayoutProps) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useCurrentUser();

  const user = data?.data;
  const parsedError = isError ? parseApiError(error) : null;
  const errorMessage = parsedError?.message?.toLowerCase() || "";

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
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

    if (!user) {
      router.replace("/login");
      return;
    }

    if (isPlatformSuperAdmin(user)) {
      router.replace("/platform/dashboard");
      return;
    }

    if (!hasTenantAccess(user)) {
      router.replace("/login");
      return;
    }
  }, [isLoading, isError, errorMessage, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFCFE] dark:bg-[#020617]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-6">
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-xl shadow-violet-200 dark:shadow-none">
              <Zap className="h-8 w-8 fill-white/20 text-white" />
            </div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="absolute inset-0 -z-0 rounded-2xl bg-violet-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Authenticating
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (
    isError ||
    !user ||
    isPlatformSuperAdmin(user) ||
    !hasTenantAccess(user)
  ) {
    return null;
  }

  return <TenantShell>{children}</TenantShell>;
}
