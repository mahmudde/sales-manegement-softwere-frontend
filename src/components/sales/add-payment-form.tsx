"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CreditCard, Loader2, NotebookPen, Wallet } from "lucide-react";

import {
  addPaymentSchema,
  type AddPaymentSchemaInput,
  type AddPaymentSchemaValues,
} from "@/modules/sales/payment.schema";
import { parseApiError } from "@/lib/error-parser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddPaymentFormProps = {
  onSubmitAction: (payload: AddPaymentSchemaValues) => Promise<void>;
  maxAmount?: number;
};

export default function AddPaymentForm({
  onSubmitAction,
  maxAmount,
}: AddPaymentFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddPaymentSchemaInput, unknown, AddPaymentSchemaValues>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: {
      amount: maxAmount && maxAmount > 0 ? maxAmount : 0,
      paymentMethod: "CASH",
      note: "",
    },
  });

  const onSubmit = async (data: AddPaymentSchemaValues) => {
    try {
      await onSubmitAction(data);
      toast.success("Payment added successfully");
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        if (
          err.path === "amount" ||
          err.path === "paymentMethod" ||
          err.path === "note"
        ) {
          setError(err.path as keyof AddPaymentSchemaInput, {
            message: err.message,
          });
        }
      });

      toast.error(parsed.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Wallet className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Amount
          </label>
        </div>

        <Input
          type="number"
          step="0.01"
          {...register("amount")}
          className="h-12 rounded-2xl border-2 border-violet-100 bg-slate-50 text-lg font-black text-violet-950 shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
        />

        {errors.amount && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.amount.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <CreditCard className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Payment Method
          </label>
        </div>

        <select
          {...register("paymentMethod")}
          className="h-12 w-full rounded-2xl border border-input bg-slate-50 px-4 text-sm font-bold outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        >
          <option value="CASH">CASH</option>
          <option value="CARD">CARD</option>
          <option value="BANK">BANK</option>
          <option value="MOBILE_BANKING">MOBILE_BANKING</option>
        </select>

        {errors.paymentMethod && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.paymentMethod.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <NotebookPen className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Note
          </label>
        </div>

        <Input
          placeholder="Optional note"
          {...register("note")}
          className="h-12 rounded-2xl bg-slate-50 font-medium shadow-sm"
        />

        {errors.note && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.note.message as string}
          </p>
        )}
      </div>

      <div className="rounded-2xl border bg-slate-50 p-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
          <span>Maximum Suggested</span>
          <span className="text-violet-700">
            ৳{Number(maxAmount || 0).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-2xl bg-violet-600 px-6 font-black uppercase shadow-lg hover:bg-violet-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Payment...
            </>
          ) : (
            "Add Payment"
          )}
        </Button>
      </div>
    </form>
  );
}
