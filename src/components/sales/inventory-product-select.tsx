"use client";

import {
  Box,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  PackageSearch,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/hooks/use-inventory";
import { cn } from "@/lib/utils";
import type { InventoryItem } from "@/modules/inventory/inventory.types";

type InventoryProductSelectProps = {
  value?: string;
  shopId?: string;
  storageId?: string;
  disabled?: boolean;
  onChange: (
    product: {
      id: string;
      name: string;
      price: number;
      stock: number;
    } | null,
  ) => void;
};

function getInventoryProductName(item: InventoryItem) {
  return item.product?.name || item.productName || "Unknown Product";
}

function getInventoryProductPrice(item: InventoryItem) {
  const raw =
    item.product?.price ??
    item.product?.salePrice ??
    item.product?.sellingPrice ??
    item.product?.unitPrice ??
    item.product?.mrp ??
    0;

  const num = Number(raw);
  return Number.isFinite(num) ? num : 0;
}

function getInventoryStock(item: InventoryItem) {
  const raw = item.availableQuantity ?? item.quantity ?? item.stock ?? 0;
  const num = Number(raw);
  return Number.isFinite(num) ? num : 0;
}

export default function InventoryProductSelect({
  value,
  shopId,
  storageId,
  disabled,
  onChange,
}: InventoryProductSelectProps) {
  const { data, isLoading, isError, refetch } = useInventory({
    page: 1,
    limit: 100,
    shopId,
    storageId,
  });

  const items: InventoryItem[] = data?.data ?? [];

  const selectableItems = items.filter((item) => getInventoryStock(item) > 0);

  const isDisabled = disabled || !shopId || !storageId;

  if (!shopId || !storageId) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Box className="h-4 w-4 text-violet-500" />
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Inventory Product
            </label>
          </div>
        </div>

        <div className="flex h-11 items-center rounded-xl border border-dashed border-violet-200 bg-violet-50/60 px-4 text-sm font-medium text-violet-700">
          Select shop and storage first
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Inventory Product
          </label>
        </div>

        {!isLoading && !isError && selectableItems.length > 0 && (
          <span className="rounded-full border border-violet-100 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">
            {selectableItems.length} Sellable
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="relative">
          <div className="h-11 w-full animate-pulse rounded-xl border border-muted bg-muted/20" />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground/50" />
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>Failed to load inventory products</span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-destructive underline transition-all hover:bg-destructive/10"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <div className="group relative">
          <select
            value={value || ""}
            disabled={isDisabled}
            onChange={(e) => {
              const selectedId = e.target.value;

              if (!selectedId) {
                onChange(null);
                return;
              }

              const selectedItem = selectableItems.find(
                (item) => item.productId === selectedId,
              );

              if (!selectedItem) {
                onChange(null);
                return;
              }

              onChange({
                id: selectedItem.productId,
                name: getInventoryProductName(selectedItem),
                price: getInventoryProductPrice(selectedItem),
                stock: getInventoryStock(selectedItem),
              });
            }}
            className={cn(
              "h-11 w-full appearance-none rounded-xl border border-input bg-background pl-4 pr-10 text-sm font-medium outline-none transition-all",
              "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
              "hover:cursor-pointer hover:border-violet-300",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <option value="">Select a product</option>
            {selectableItems.map((item) => (
              <option key={item.id} value={item.productId}>
                {getInventoryProductName(item)} (Stock:{" "}
                {getInventoryStock(item)})
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground transition-colors group-hover:text-violet-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      )}

      {!isLoading && !isError && selectableItems.length === 0 ? (
        <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700">
          <PackageSearch className="h-3.5 w-3.5" />
          No sellable products found in this storage.
        </div>
      ) : null}

      {!isLoading && !isError && selectableItems.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-600">
          <Tag className="h-3.5 w-3.5 text-violet-500" />
          Only products with available stock are shown.
        </div>
      )}
    </div>
  );
}
