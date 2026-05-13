"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Loader2 } from "lucide-react";

import StorageSelect from "@/components/sales/storage-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateSaleReturnPayload, SaleItem } from "@/modules/sales/sales.type";

type SaleReturnModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shopId?: string;
  items: SaleItem[];
  isSubmitting?: boolean;
  onSubmitAction: (payload: CreateSaleReturnPayload) => Promise<void>;
};

export default function SaleReturnModal({
  open,
  onOpenChange,
  shopId,
  items,
  isSubmitting,
  onSubmitAction,
}: SaleReturnModalProps) {
  const [storageId, setStorageId] = useState("");
  const [note, setNote] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [error, setError] = useState("");

  const selectedItems = useMemo(
    () =>
      items
        .map((item) => ({
          saleItemId: item.id,
          quantity: quantities[item.id] || 0,
        }))
        .filter((item) => item.quantity > 0),
    [items, quantities],
  );

  const handleSubmit = async () => {
    setError("");

    if (!storageId) {
      setError("Select the storage where returned stock should be restored.");
      return;
    }

    if (selectedItems.length === 0) {
      setError("Enter at least one returned item quantity.");
      return;
    }

    await onSubmitAction({
      storageId,
      note: note || undefined,
      items: selectedItems,
    });

    setStorageId("");
    setNote("");
    setQuantities({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-2xl">
        <div className="h-2 bg-gradient-to-r from-violet-500 to-emerald-500" />
        <DialogHeader className="border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase italic text-slate-800">
            <RotateCcw className="h-5 w-5 text-violet-600" />
            Create Sale Return
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 bg-white px-6 py-6">
          <StorageSelect value={storageId} onChange={setStorageId} shopId={shopId} />

          <div className="space-y-3">
            {items.map((item) => {
              const maxQuantity = item.quantity || 0;
              return (
                <div key={item.id} className="grid gap-3 rounded-2xl border p-4 sm:grid-cols-[1fr_130px] sm:items-center">
                  <div>
                    <p className="font-bold text-slate-800">
                      {item.productName || item.product?.name || "Unknown product"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sold quantity: {maxQuantity}
                    </p>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={maxQuantity}
                    value={quantities[item.id] || ""}
                    onChange={(event) => {
                      const value = Math.min(
                        Number(event.target.value || 0),
                        maxQuantity,
                      );
                      setQuantities((current) => ({
                        ...current,
                        [item.id]: value,
                      }));
                    }}
                    className="h-11 rounded-xl border px-3 text-sm font-bold outline-none focus:border-violet-500"
                    placeholder="Qty"
                  />
                </div>
              );
            })}
          </div>

          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Return note"
            className="w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:border-violet-500"
          />

          {error ? (
            <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          ) : null}

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="h-11 rounded-xl bg-violet-600 px-5 text-white hover:bg-violet-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating return...
              </>
            ) : (
              "Create Return"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
