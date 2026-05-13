import type { ReactNode } from "react";
import TenantSidebar from "@/components/layout/tenant-sidebar";
import TenantTopbar from "@/components/layout/tenant-topbar";

type TenantShellProps = {
  children: ReactNode;
};

export default function TenantShell({ children }: TenantShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#020617]">
      {/* 1. Sidebar - Still contains client logic for navigation, but called here */}
      <TenantSidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* 2. Topbar - Sticky at the top */}
        <TenantTopbar />

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-dot-slate-200/[0.3] dark:bg-dot-white/[0.05]">
          {/* Decorative Gradient Wash */}
          <div
            className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-violet-50/50 dark:from-violet-500/5 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 p-6 lg:p-10 max-w-[1600px] mx-auto">
            {children}
          </div>

          <footer className="p-8 text-center text-slate-400 text-xs font-medium tracking-wide">
            Copyright 2026 M ITSales Management. Enterprise Edition.
          </footer>
        </main>
      </div>
    </div>
  );
}

