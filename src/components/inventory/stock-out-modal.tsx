"use client";

import type { StockOutSchemaValues } from "@/modules/inventory/inventory.schema";
import { useStockOut } from "@/hooks/use-inventory";
import { ArrowUpFromLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StockMovementForm from "@/components/inventory/stock-movement-form";

type StockOutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function StockOutModal({
  open,
  onOpenChange,
}: StockOutModalProps) {
  const stockOutMutation = useStockOut();

  const handleStockOut = async (data: StockOutSchemaValues) => {
    await stockOutMutation.mutateAsync(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-xl">
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-black uppercase text-slate-800">
            <ArrowUpFromLine className="h-5 w-5 text-violet-600" />
            Stock Out
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="mb-5 rounded-2xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Inventory Movement
              </span>
              <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-bold text-rose-700">
                Stock Out
              </span>
            </div>
          </div>

          <StockMovementForm
            mode="stock-out"
            onSubmitAction={handleStockOut}
            submitText="Remove Stock"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
