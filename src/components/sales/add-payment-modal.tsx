"use client";

import type { AddPaymentSchemaValues } from "@/modules/sales/payment.schema";
import { CreditCard, Wallet } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddPaymentForm from "@/components/sales/add-payment-form";

type AddPaymentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitAction: (payload: AddPaymentSchemaValues) => Promise<void>;
  dueAmount?: number;
};

export default function AddPaymentModal({
  open,
  onOpenChange,
  onSubmitAction,
  dueAmount,
}: AddPaymentModalProps) {
  const handleSubmit = async (payload: AddPaymentSchemaValues) => {
    await onSubmitAction(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-lg">
        <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase italic text-slate-800">
            <CreditCard className="h-5 w-5 text-violet-600" />
            Add Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 bg-white px-6 py-6">
          <div className="rounded-2xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-violet-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Current Due
                </span>
              </div>

              <span className="text-xl font-black text-violet-700">
                ৳{Number(dueAmount || 0).toLocaleString()}
              </span>
            </div>
          </div>

          <AddPaymentForm onSubmitAction={handleSubmit} maxAmount={dueAmount} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
