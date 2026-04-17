"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { tenantNavigation } from "@/config/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

export default function TenantSidebar() {
  const pathname = usePathname();
  const { data } = useCurrentUser();

  const role = data?.data.role;

  // Filter items based on user role
  const navItems = tenantNavigation.filter((item) =>
    role ? item.roles.includes(role) : false,
  );

  return (
    <aside className="hidden md:flex md:w-72 md:flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] h-screen sticky top-0">
      {/* Sidebar Header / Logo */}
      <div className="h-20 border-b border-slate-100 dark:border-slate-800/50 px-8 flex items-center gap-3">
        <div className="h-9 w-9 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-none">
          <Zap className="h-5 w-5 text-white fill-white/20" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Nexus <span className="text-violet-600">Sales</span>
        </span>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-4 mb-4 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
          Main Menu
        </p>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon; // Assuming lucide icons are in your config

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "relative group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 shadow-sm shadow-violet-100/50 dark:shadow-none"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                <div className="flex items-center gap-3 relative z-10">
                  {Icon && (
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-violet-600"
                          : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300",
                      )}
                    />
                  )}
                  <span>{item.label}</span>
                </div>

                {/* Active Indicator Arrow */}
                {isActive && (
                  <motion.div layoutId="activeArrow">
                    <ChevronRight className="h-4 w-4 text-violet-600" />
                  </motion.div>
                )}

                {/* Left Active Glow Border */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 w-1 h-6 bg-violet-600 rounded-r-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Optional: Sidebar Bottom User Summary (Quick Look) */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center border border-violet-200 dark:border-violet-800 font-bold text-violet-700 dark:text-violet-400">
            {data?.data.name?.charAt(0) || "U"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate leading-none mb-1">
              {data?.data.name}
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">
              {role?.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
