"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LogOut,
  Search,
  Bell,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

import { logout } from "@/modules/auth/auth.api";
import { authKeys } from "@/modules/auth/auth.keys";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TenantTopbar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useCurrentUser();

  const user = data?.data;
  const displayName = user?.name || user?.name || "User";
  const displayRole =
    user?.role || user?.organizationMembers?.[0]?.role || user?.platformRole;

  const handleLogout = async () => {
    try {
      await logout();

      queryClient.removeQueries({
        queryKey: authKeys.me,
      });

      queryClient.removeQueries({
        queryKey: authKeys.platformMe,
      });

      toast.success("Logged out successfully");
      router.replace("/login");
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
          <input
            type="text"
            placeholder="Search analytics..."
            className="h-10 w-64 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all text-sm font-medium"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-xl"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#020617]" />
        </Button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="pl-2 pr-4 h-12 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl gap-3 transition-all group"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-200 dark:shadow-none">
                {displayName.charAt(0)}
              </div>

              <div className="hidden sm:flex flex-col items-start">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-200 leading-none mb-1">
                  {displayName}
                </p>

                <p className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider leading-none">
                  {displayRole?.replaceAll("_", " ") || "USER"}
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-violet-500 transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 p-2 rounded-2xl shadow-xl border-slate-200 dark:border-slate-800"
          >
            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              My Account
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="rounded-xl px-3 py-2.5 cursor-pointer flex items-center gap-2 font-medium focus:bg-violet-50 focus:text-violet-600 dark:focus:bg-violet-500/10"
            >
              <User className="h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="rounded-xl px-3 py-2.5 cursor-pointer flex items-center gap-2 font-medium focus:bg-violet-50 focus:text-violet-600 dark:focus:bg-violet-500/10"
            >
              <Settings className="h-4 w-4" />
              System Config
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-slate-100 dark:bg-slate-800" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="rounded-xl px-3 py-2.5 cursor-pointer flex items-center gap-2 font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-700 dark:focus:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
