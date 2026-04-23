"use client";

import {
  Boxes,
  Store,
  Warehouse,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

import type { InventoryItem } from "@/modules/inventory/inventory.types";

type InventoryTableProps = {
  items: InventoryItem[];
};

function getInventoryProductName(item: InventoryItem) {
  return item.product?.name || item.productName || "-";
}

function getInventoryStock(item: InventoryItem) {
  return item.availableQuantity ?? item.quantity ?? item.stock ?? 0;
}

export default function InventoryTable({ items }: InventoryTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
          <AlertCircle className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          No inventory found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-muted/60 bg-white shadow-sm">
      <div className="border-b bg-muted/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <Boxes className="h-5 w-5 text-violet-500" />
          <h2 className="text-base font-bold text-slate-800">Inventory List</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/5">
            <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Shop</th>
              <th className="px-6 py-4">Storage</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Updated At</th>
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
                        {getInventoryProductName(item)}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {item.productId || item.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Store className="h-4 w-4 text-violet-500" />
                    <span>{item.shopName || item.shopId || "-"}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Warehouse className="h-4 w-4 text-violet-500" />
                    <span>{item.storageName || item.storageId || "-"}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-700">
                    {Number(getInventoryStock(item)).toLocaleString()}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CalendarDays className="h-4 w-4 text-violet-500" />
                    <span>
                      {item.updatedAt
                        ? new Date(item.updatedAt).toLocaleDateString()
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
