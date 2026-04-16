"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { parseApiError } from "@/lib/error-parser";
import { motion } from "framer-motion";
import { Loader2, Zap, ShieldCheck } from "lucide-react";

type TenantLayoutProps = {
  children: ReactNode;
};

export default function TenantLayout({ children }: TenantLayoutProps) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useCurrentUser();

  const parsedError = isError ? parseApiError(error) : null;

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      const message = parsedError?.message?.toLowerCase() || "";

      // Handle Suspended Accounts
      if (message.includes("suspended")) {
        router.replace("/suspended");
        return;
      }

      // Handle Subscription Issues
      if (message.includes("subscription")) {
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

    // Redirect Super Admins to their specific portal
    if (data.data.role === "PLATFORM_SUPER_ADMIN") {
      router.replace("/platform/dashboard");
    }
  }, [data, isLoading, isError, parsedError, router]);

  // --- PREMIUM BRANDED LOADER ---
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFCFE] dark:bg-[#020617]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-8">
            <div className="h-20 w-20 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-200 dark:shadow-none relative z-10">
              <Zap className="h-10 w-10 text-white fill-white/20" />
            </div>
            {/* Animated Background Pulse */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 h-20 w-20 bg-violet-400 rounded-3xl"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm">
              <ShieldCheck className="h-4 w-4 text-violet-600" />
              <span className="text-[11px] font-bold tracking-[0.1em] text-slate-500 dark:text-slate-400 uppercase">
                Securing Session
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
              <p className="text-xs font-medium text-slate-400">
                Please wait a moment...
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isError || !data?.data || data.data.role === "PLATFORM_SUPER_ADMIN") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
