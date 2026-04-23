"use client";

import { useState } from "react";
import { useInventory } from "@/hooks/use-inventory";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { InventoryItem } from "@/modules/inventory/inventory.types";
import {
  Boxes,
  Search,
  Loader2,
  AlertCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InventoryTable from "@/components/inventory/inventory-table";
import StockInModal from "@/components/inventory/stock-in-modal";
import StockOutModal from "@/components/inventory/stock-out-modal";

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockInOpen, setStockInOpen] = useState(false);
  const [stockOutOpen, setStockOutOpen] = useState(false);

  const { data: currentUserData } = useCurrentUser();

  const orgRole = currentUserData?.data?.organizationMembers?.[0]?.role;
  const platformRole = currentUserData?.data?.platformRole;

  const canManageInventory =
    orgRole === "ORG_SUPER_ADMIN" ||
    orgRole === "ORG_ADMIN" ||
    platformRole === "PLATFORM_SUPER_ADMIN";

  const { data, isLoading, isError } = useInventory({
    page: 1,
    limit: 20,
    searchTerm,
  });

  const items: InventoryItem[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
              <Boxes className="h-5 w-5 text-violet-600" />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800">
                Inventory
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Monitor product stock by shop and storage.
              </p>
            </div>
          </div>
        </div>

        {canManageInventory ? (
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStockOutOpen(true)}
              className="h-12 rounded-2xl border-2 border-rose-200 bg-rose-50 px-5 font-black uppercase text-rose-700 hover:bg-rose-100"
            >
              <ArrowUpFromLine className="mr-2 h-4 w-4" />
              Stock Out
            </Button>

            <Button
              type="button"
              onClick={() => setStockInOpen(true)}
              className="h-12 rounded-2xl bg-violet-600 px-5 font-black uppercase shadow-lg hover:bg-violet-700"
            >
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Stock In
            </Button>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-muted/60 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 rounded-2xl border-input bg-slate-50 pl-10 font-medium shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            <p className="text-sm font-medium text-muted-foreground">
              Loading inventory...
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            Failed to load inventory.
          </p>
        </div>
      ) : (
        <InventoryTable items={items} />
      )}

      <StockInModal open={stockInOpen} onOpenChange={setStockInOpen} />
      <StockOutModal open={stockOutOpen} onOpenChange={setStockOutOpen} />
    </div>
  );
}
