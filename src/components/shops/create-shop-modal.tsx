"use client";

import type { CreateShopSchemaValues } from "@/modules/shops/shops.schema";
import { useCreateShop } from "@/hooks/use-shops";
import { Store } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ShopForm from "@/components/shops/shop-form";

type CreateShopModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateShopModal({
  open,
  onOpenChange,
}: CreateShopModalProps) {
  const createShopMutation = useCreateShop();

  const handleCreate = async (data: CreateShopSchemaValues) => {
    await createShopMutation.mutateAsync(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-xl max-h-[90vh]">
        <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase italic text-slate-800">
            <Store className="h-5 w-5 text-violet-600" />
            Add Shop
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(90vh-90px)] overflow-y-auto bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="rounded-2xl border bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Shop Setup
                </span>
                <span className="text-sm font-black text-violet-700">
                  New Branch
                </span>
              </div>
            </div>

            <ShopForm onSubmitAction={handleCreate} submitText="Create Shop" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
