"use client";

import {
  ArrowLeftRight,
  AlertCircle,
  Boxes,
  CalendarDays,
  Store,
  Warehouse,
  StickyNote,
  User,
} from "lucide-react";

import type { InventoryTransaction } from "@/modules/inventory/inventory.types";

type InventoryTransactionsTableProps = {
  items: InventoryTransaction[];
};

function getProductName(item: InventoryTransaction) {
  return item.productName || item.productId || "-";
}

function getShopName(item: InventoryTransaction) {
  return item.shopName || item.shopId || "-";
}

function getStorageName(item: InventoryTransaction) {
  return item.storageName || item.storageId || "-";
}

function formatTransactionType(type?: string) {
  if (!type) return "-";

  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function InventoryTransactionsTable({
  items,
}: InventoryTransactionsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
          <AlertCircle className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          No transactions found. Transactions will appear when stock movements
          are recorded.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-muted/60 bg-white shadow-sm">
      <div className="border-b bg-muted/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-violet-500" />
          <h2 className="text-base font-bold text-slate-800">
            Inventory Transactions
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/5">
            <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Shop</th>
              <th className="px-6 py-4">Storage</th>
              <th className="px-6 py-4">Note</th>
              <th className="px-6 py-4">Created At</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {items.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-violet-50/40"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50">
                      <Boxes className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {getProductName(item)}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {item.productId || "-"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-700">
                    {formatTransactionType(item.type)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="font-black text-slate-800">
                    {Number(item.quantity || 0).toLocaleString()}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Store className="h-4 w-4 text-violet-500" />
                    <span>{getShopName(item)}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Warehouse className="h-4 w-4 text-violet-500" />
                    <span>{getStorageName(item)}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <StickyNote className="h-4 w-4 text-violet-500" />
                    <span className="max-w-[220px] truncate">
                      {item.note || "-"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CalendarDays className="h-4 w-4 text-violet-500" />
                    <span>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
