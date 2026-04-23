"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Warehouse,
  Store,
  MapPin,
  CalendarDays,
  PencilLine,
  Trash2,
  AlertCircle,
} from "lucide-react";

import { useDeleteStorage } from "@/hooks/use-storages";
import { cn } from "@/lib/utils";
import EditStorageModal from "@/components/storages/edit-storage-modal";

type StoragesTableProps = {
  storages: Storage[];
};

export default function StoragesTable({ storages }: StoragesTableProps) {
  const [editingStorage, setEditingStorage] = useState<Storage | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const deleteStorageMutation = useDeleteStorage();

  const handleDelete = async (storageId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this storage?",
    );

    if (!confirmed) return;

    try {
      await deleteStorageMutation.mutateAsync(storageId);
      toast.success("Storage deleted successfully");
    } catch {
      toast.error("Failed to delete storage");
    }
  };

  if (storages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
          <AlertCircle className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          No storages found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-muted/60 bg-white shadow-sm">
        <div className="border-b bg-muted/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Warehouse className="h-5 w-5 text-violet-500" />
            <h2 className="text-base font-bold text-slate-800">
              Storages List
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/5">
              <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Shop</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {storages.map((storage) => (
                <tr
                  key={storage.id}
                  className="transition-colors hover:bg-violet-50/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50">
                        <Warehouse className="h-4 w-4 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          {storage.name}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {storage.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Store className="h-4 w-4 text-violet-500" />
                      <span>{storage.shop?.name || "-"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-3 py-1 text-[11px] font-bold",
                        storage.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700",
                      )}
                    >
                      {storage.status || "-"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarDays className="h-4 w-4 text-violet-500" />
                      <span>
                        {storage.createdAt
                          ? new Date(storage.createdAt).toLocaleDateString()
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
                          setEditingStorage(storage);
                          setEditOpen(true);
                        }}
                      >
                        <PencilLine className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                        onClick={() => handleDelete(storage.id)}
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

      <EditStorageModal
        storage={editingStorage}
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditingStorage(null);
        }}
      />
    </>
  );
}
