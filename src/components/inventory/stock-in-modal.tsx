"use client";

import type { StockInSchemaValues } from "@/modules/inventory/inventory.schema";
import { useStockIn } from "@/hooks/use-inventory";
import { ArrowDownToLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StockMovementForm from "@/components/inventory/stock-movement-form";

type StockInModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function StockInModal({
  open,
  onOpenChange,
}: StockInModalProps) {
  const stockInMutation = useStockIn();

  const handleStockIn = async (data: StockInSchemaValues) => {
    await stockInMutation.mutateAsync(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-xl">
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-black uppercase text-slate-800">
            <ArrowDownToLine className="h-5 w-5 text-violet-600" />
            Stock In
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="mb-5 rounded-2xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Inventory Movement
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
                Stock In
              </span>
            </div>
          </div>

          <StockMovementForm
            mode="stock-in"
            onSubmitAction={handleStockIn}
            submitText="Add Stock"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
