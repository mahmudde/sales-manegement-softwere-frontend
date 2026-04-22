"use client";

import { Store, AlertCircle, RefreshCw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShops } from "@/hooks/use-shops";
import { cn } from "@/lib/utils";
import { Shop } from "@/modules/shop/sgop.types";

type ShopSelectProps = {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function ShopSelect({
  value,
  onChange,
  disabled,
}: ShopSelectProps) {
  const { data, isLoading, isError, refetch } = useShops({
    page: 1,
    limit: 100,
    status: "ACTIVE",
  });

  const shops: Shop[] = data?.data ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <Store className="h-4 w-4 text-violet-500" />
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Operating Shop
        </label>
      </div>

      {isLoading ? (
        <div className="relative">
          <div className="h-11 w-full rounded-xl border border-muted bg-muted/20 animate-pulse" />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground/50" />
          </div>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-3">
          <div className="flex items-center gap-2 text-sm text-destructive font-medium">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to sync shops</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs hover:bg-destructive/10 text-destructive underline"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="relative group">
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(
              "w-full h-11 appearance-none rounded-xl border border-input bg-background pl-4 pr-10 text-sm font-medium transition-all outline-none",
              "focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "hover:border-violet-300 cursor-pointer",
            )}
          >
            <option value="" disabled className="text-muted-foreground">
              Choose a branch...
            </option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id} className="py-2">
                {shop.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground group-hover:text-violet-500 transition-colors">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      )}

      {!isLoading && !isError && shops.length === 0 && (
        <div className="flex items-center gap-2 px-2 py-1 text-[11px] font-medium text-amber-600 bg-amber-50 rounded-lg">
          <AlertCircle className="h-3 w-3" />
          No active shops found in the registry.
        </div>
      )}
    </div>
  );
}
