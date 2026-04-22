"use client";

import { Box, AlertCircle, RefreshCw, ChevronDown, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products.types";

type ProductSelectProps = {
  value?: string;
  onChange: (product: Product | null) => void;
  disabled?: boolean;
};

export default function ProductSelect({
  value,
  onChange,
  disabled,
}: ProductSelectProps) {
  const { data, isLoading, isError, refetch } = useProducts({
    page: 1,
    limit: 100,
  });

  const products: Product[] = data?.data ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Inventory Product
          </label>
        </div>

        {!isLoading && products.length > 0 && (
          <span className="text-[10px] font-medium bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full border border-violet-100">
            {products.length} Items
          </span>
        )}
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
            <span>Product sync failed</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs hover:bg-destructive/10 text-destructive underline transition-all"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="relative group">
          <select
            value={value || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedProduct =
                products.find((product) => product.id === selectedId) ?? null;

              onChange(selectedProduct);
            }}
            disabled={disabled}
            className={cn(
              "w-full h-11 appearance-none rounded-xl border border-input bg-background pl-4 pr-10 text-sm font-medium transition-all outline-none",
              "focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "hover:border-violet-300 cursor-pointer",
            )}
          >
            <option value="">Search or select product...</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} {product.sku ? `(${product.sku})` : ""}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground group-hover:text-violet-500 transition-colors">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-amber-600 bg-amber-50 rounded-xl border border-amber-100">
          <Tag className="h-3 w-3" />
          Your inventory is currently empty.
        </div>
      )}
    </div>
  );
}
