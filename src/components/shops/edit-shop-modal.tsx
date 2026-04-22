"use client";

import type { Shop } from "@/modules/shops/shops.types";
import type { CreateShopSchemaValues } from "@/modules/shops/shops.schema";
import { useUpdateShop } from "@/hooks/use-shops";
import { Store, PencilLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ShopForm from "@/components/shops/shop-form";

type EditShopModalProps = {
  shop: Shop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditShopModal({
  shop,
  open,
  onOpenChange,
}: EditShopModalProps) {
  const updateShopMutation = useUpdateShop(shop?.id || "");

  if (!shop) return null;

  const handleUpdate = async (data: CreateShopSchemaValues) => {
    await updateShopMutation.mutateAsync(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-xl">
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase italic text-slate-800">
            <PencilLine className="h-5 w-5 text-violet-600" />
            Edit Shop
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="rounded-2xl border bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-violet-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Editing Shop
                  </span>
                </div>

                <span className="text-sm font-black text-violet-700">
                  {shop.name || "Unnamed Shop"}
                </span>
              </div>
            </div>

            <ShopForm
              defaultValues={shop}
              onSubmitAction={handleUpdate}
              submitText="Update Shop"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
