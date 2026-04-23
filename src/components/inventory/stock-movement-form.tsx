"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Package2,
  StickyNote,
  Hash,
  Loader2,
} from "lucide-react";

import {
  stockInSchema,
  stockOutSchema,
  type StockInSchemaValues,
  type StockOutSchemaValues,
} from "@/modules/inventory/inventory.schema";
import { parseApiError } from "@/lib/error-parser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShopSelect from "@/components/sales/shop-select";
import StorageSelect from "@/components/sales/storage-select";
import ProductSelect from "@/components/sales/product-select";

type StockMovementMode = "stock-in" | "stock-out";

type StockMovementFormInput = z.input<typeof stockInSchema>;
type StockMovementFormValues = StockInSchemaValues;

type StockMovementFormProps = {
  mode: StockMovementMode;
  onSubmitAction: (
    payload: StockMovementFormValues | StockOutSchemaValues,
  ) => Promise<void>;
  submitText: string;
};

export default function StockMovementForm({
  mode,
  onSubmitAction,
  submitText,
}: StockMovementFormProps) {
  const schema = mode === "stock-in" ? stockInSchema : stockOutSchema;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StockMovementFormInput, unknown, StockMovementFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      shopId: "",
      storageId: "",
      productId: "",
      quantity: 1,
      note: "",
    },
  });

  const selectedShopId = watch("shopId");

  useEffect(() => {
    setValue("storageId", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [selectedShopId, setValue]);

  const onSubmit = async (data: StockMovementFormValues) => {
    try {
      await onSubmitAction(data);
      toast.success(
        mode === "stock-in"
          ? "Stock added successfully"
          : "Stock removed successfully",
      );
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        if (
          err.path === "shopId" ||
          err.path === "storageId" ||
          err.path === "productId" ||
          err.path === "quantity" ||
          err.path === "note"
        ) {
          setError(err.path as keyof StockMovementFormInput, {
            message: err.message,
          });
        }
      });

      toast.error(parsed.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="rounded-2xl border bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Movement Type
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold ${
              mode === "stock-in"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {mode === "stock-in" ? (
              <ArrowDownToLine className="h-3.5 w-3.5" />
            ) : (
              <ArrowUpFromLine className="h-3.5 w-3.5" />
            )}
            {mode === "stock-in" ? "Stock In" : "Stock Out"}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <ShopSelect
          value={watch("shopId")}
          onChange={(value) =>
            setValue("shopId", value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
          }
          disabled={isSubmitting}
        />
        {errors.shopId && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.shopId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <StorageSelect
          value={watch("storageId")}
          shopId={watch("shopId")}
          onChange={(value) =>
            setValue("storageId", value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
          }
          disabled={isSubmitting}
        />
        {errors.storageId && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.storageId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <ProductSelect
          value={watch("productId")}
          disabled={isSubmitting}
          onChange={(product) =>
            setValue("productId", product?.id ?? "", {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
          }
        />
        {errors.productId && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.productId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Hash className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Quantity
          </label>
        </div>

        <Input
          type="number"
          min={1}
          {...register("quantity")}
          className="h-12 rounded-2xl bg-slate-50 font-bold shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
        />

        {errors.quantity && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.quantity.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <StickyNote className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Note
          </label>
        </div>

        <Input
          placeholder="Optional note"
          {...register("note")}
          className="h-12 rounded-2xl bg-slate-50 font-medium shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
        />

        {errors.note && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.note.message}
          </p>
        )}
      </div>

      <div className="rounded-2xl border bg-slate-50 p-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
          <span>Selected Product</span>
          <span className="text-violet-700">
            {watch("productId") ? "Ready" : "Not Selected"}
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
              Processing...
            </>
          ) : (
            <>
              <Package2 className="mr-2 h-4 w-4" />
              {submitText}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
