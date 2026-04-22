"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Store,
  MapPin,
  Phone,
  CalendarDays,
  PencilLine,
  Trash2,
  AlertCircle,
} from "lucide-react";

import type { Shop } from "@/modules/shops/shops.types";
import { useDeleteShop } from "@/hooks/use-shops";
import { cn } from "@/lib/utils";
import EditShopModal from "@/components/shops/edit-shop-modal";

type ShopsTableProps = {
  shops: Shop[];
};

export default function ShopsTable({ shops }: ShopsTableProps) {
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const deleteShopMutation = useDeleteShop();

  const handleDelete = async (shopId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shop?",
    );

    if (!confirmed) return;

    try {
      await deleteShopMutation.mutateAsync(shopId);
      toast.success("Shop deleted successfully");
    } catch {
      toast.error("Failed to delete shop");
    }
  };

  if (shops.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
          <AlertCircle className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          No shops found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-muted/60 bg-white shadow-sm">
        <div className="border-b bg-muted/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-violet-500" />
            <h2 className="text-base font-bold text-slate-800">Shops List</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/5">
              <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {shops.map((shop) => (
                <tr
                  key={shop.id}
                  className="transition-colors hover:bg-violet-50/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50">
                        <Store className="h-4 w-4 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{shop.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {shop.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-4 w-4 text-violet-500" />
                      <span>{shop.address || "-"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="h-4 w-4 text-violet-500" />
                      <span>{shop.phone || "-"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-3 py-1 text-[11px] font-bold",
                        shop.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700",
                      )}
                    >
                      {shop.status || "-"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarDays className="h-4 w-4 text-violet-500" />
                      <span>
                        {shop.createdAt
                          ? new Date(shop.createdAt).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-100"
                        onClick={() => {
                          setEditingShop(shop);
                          setEditOpen(true);
                        }}
                      >
                        <PencilLine className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                        onClick={() => handleDelete(shop.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditShopModal
        shop={editingShop}
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditingShop(null);
        }}
      />
    </>
  );
}
