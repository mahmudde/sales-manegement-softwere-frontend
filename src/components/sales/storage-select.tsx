"use client";

import {
  Warehouse,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStorages } from "@/hooks/use-storages";
import { cn } from "@/lib/utils";

type StorageSelectProps = {
  value?: string;
  onChange: (value: string) => void;
  shopId?: string;
  disabled?: boolean;
};

export default function StorageSelect({
  value,
  onChange,
  shopId,
  disabled,
}: StorageSelectProps) {
  const { data, isLoading, isError, refetch } = useStorages({
    page: 1,
    limit: 100,
    status: "ACTIVE",
    shopId,
  });

  const storages: Storage[] = data?.data ?? [];
  const isDisabled = disabled || !shopId;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <Warehouse className="h-4 w-4 text-violet-500" />
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Storage Location
        </label>
      </div>

      {!shopId ? (
        /* Empty/Locked State: Directing user to select shop first */
        <div className="flex items-center gap-3 h-11 w-full rounded-xl border border-dashed border-muted-foreground/20 bg-muted/5 px-4 text-sm text-muted-foreground transition-all">
          <Lock className="h-3.5 w-3.5 opacity-50" />
          <span>Select a shop branch first</span>
        </div>
      ) : isLoading ? (
        /* Loading State */
        <div className="relative">
          <div className="h-11 w-full rounded-xl border border-muted bg-muted/20 animate-pulse" />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground/50" />
          </div>
        </div>
      ) : isError ? (
        /* Error State */
        <div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-3">
          <div className="flex items-center gap-2 text-sm text-destructive font-medium">
            <AlertCircle className="h-4 w-4" />
            <span>Sync failed</span>
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
        /* Active Select State */
        <div className="relative group">
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={isDisabled}
            className={cn(
              "w-full h-11 appearance-none rounded-xl border border-input bg-background pl-4 pr-10 text-sm font-medium transition-all outline-none",
              "focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "hover:border-violet-300 cursor-pointer",
            )}
          >
            <option value="" disabled>
              Select storage point...
            </option>
            {storages.map((storage) => (
              <option key={storage.id} value={storage.id}>
                {storage.name}
              </option>
            ))}
          </select>

          {/* Custom Arrow Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground group-hover:text-violet-500 transition-colors">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      )}

      {/* Empty State Helper */}
      {shopId && !isLoading && !isError && storages.length === 0 && (
        <div className="flex items-center gap-2 px-2 py-1 text-[11px] font-medium text-amber-600 bg-amber-50 rounded-lg">
          <AlertCircle className="h-3 w-3" />
          No storage zones found for this branch.
        </div>
      )}
    </div>
  );
}
