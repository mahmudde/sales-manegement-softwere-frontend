/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm, useWatch, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Calculator,
  Receipt,
  ShoppingBag,
  Loader2,
} from "lucide-react";

import {
  createSaleSchema,
  type CreateSaleSchemaValues,
} from "@/modules/sales/sales.schema";
import { parseApiError } from "@/lib/error-parser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ShopSelect from "@/components/sales/shop-select";
import StorageSelect from "@/components/sales/storage-select";
import InventoryProductSelect from "@/components/sales/inventory-product-select";
import { CreateSalePayload } from "@/modules/sales/sales.type";

type SaleItemUI = {
  productId: string;
  quantity: number;
  price: number;
};

type SaleFormValues = Omit<CreateSaleSchemaValues, "items"> & {
  items: SaleItemUI[];
};

type SaleFormProps = {
  onSubmitAction: (payload: CreateSalePayload) => Promise<unknown>;
};

const EMPTY_ITEM: SaleItemUI = {
  productId: "",
  quantity: 1,
  price: 0,
};

export default function SaleForm({ onSubmitAction }: SaleFormProps) {
  const [submitError, setSubmitError] = useState("");

  const clearSubmitError = () => {
    if (submitError) setSubmitError("");
  };

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SaleFormValues>({
    resolver: zodResolver(createSaleSchema) as any,
    defaultValues: {
      shopId: "",
      storageId: "",
      paymentMethod: "CASH",
      discount: 0,
      paidAmount: 0,
      note: "",
      items: [{ ...EMPTY_ITEM }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = useWatch({ control, name: "items" }) ?? [];
  const watchedDiscount = useWatch({ control, name: "discount" });
  const watchedPaidAmount = useWatch({ control, name: "paidAmount" });
  const watchedShopId = useWatch({ control, name: "shopId" });
  const watchedStorageId = useWatch({ control, name: "storageId" });

  const previousShopIdRef = useRef<string>("");

  const subtotal = useMemo(() => {
    return watchedItems.reduce((sum, item) => {
      const qty = Number(item?.quantity) || 0;
      const price = Number(item?.price) || 0;
      return sum + qty * price;
    }, 0);
  }, [watchedItems]);

  const totalQuantity = useMemo(() => {
    return watchedItems.reduce((sum, item) => {
      return sum + (Number(item?.quantity) || 0);
    }, 0);
  }, [watchedItems]);

  const discount = Math.max(0, Number(watchedDiscount) || 0);
  const grandTotal = Math.max(0, subtotal - discount);

  useEffect(() => {
    const prevShopId = previousShopIdRef.current;

    if (prevShopId && watchedShopId && prevShopId !== watchedShopId) {
      setValue("storageId", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    previousShopIdRef.current = watchedShopId || "";
  }, [watchedShopId, setValue]);

  useEffect(() => {
    const currentPaidAmount = Number(watchedPaidAmount);

    if (!Number.isFinite(currentPaidAmount) || currentPaidAmount < 0) {
      setValue("paidAmount", grandTotal, {
        shouldValidate: true,
      });
      return;
    }

    if (currentPaidAmount > grandTotal) {
      setValue("paidAmount", grandTotal, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchedPaidAmount, grandTotal, setValue]);

  const onSubmit = async (data: SaleFormValues) => {
    clearSubmitError();

    try {
      const sanitizedItems = data.items
        .map((item) => ({
          productId: item.productId?.trim(),
          quantity: Number(item.quantity) || 0,
        }))
        .filter((item) => item.productId && item.quantity > 0);

      if (!data.shopId) {
        setError("shopId", { message: "Shop is required" });
        return;
      }

      if (!data.storageId) {
        setError("storageId", { message: "Storage is required" });
        return;
      }

      if (sanitizedItems.length === 0) {
        const msg = "Please add at least one valid item";
        setSubmitError(msg);
        toast.error(msg);
        return;
      }

      const safePaidAmount = Math.max(
        0,
        Math.min(Number(data.paidAmount) || 0, grandTotal),
      );

      const payload: CreateSalePayload = {
        shopId: data.shopId,
        storageId: data.storageId,
        paymentMethod: data.paymentMethod,
        discount: Math.max(0, Number(data.discount) || 0),
        paidAmount: safePaidAmount,
        note: data.note?.trim() || "",
        items: sanitizedItems,
      };

      await onSubmitAction(payload);

      toast.success("Transaction completed!");
      setSubmitError("");

      reset({
        shopId: "",
        storageId: "",
        paymentMethod: "CASH",
        discount: 0,
        paidAmount: 0,
        note: "",
        items: [{ ...EMPTY_ITEM }],
      });
    } catch (error) {
      const parsed = parseApiError(error);
      let message = parsed?.message || "Failed to create sale";

      if (message.includes("No inventory found for product")) {
        message = `${message}. Please add stock for this product in the selected storage before selling.`;
      }

      if (message.includes("Insufficient stock for product")) {
        message = `${message}. Please increase stock or reduce the quantity.`;
      }

      setSubmitError(message);
      toast.error(message);

      parsed?.fieldErrors?.forEach((err: any) => {
        if (err.path) {
          setError(err.path as Path<SaleFormValues>, {
            message: err.message,
          });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-2xl border-muted/60 shadow-sm">
            <CardHeader className="border-b bg-muted/5 py-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
                <Receipt className="h-5 w-5 text-violet-500" />
                Origin Details
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
              <div className="space-y-1">
                <ShopSelect
                  value={watchedShopId || ""}
                  onChange={(val) => {
                    clearSubmitError();
                    setValue("shopId", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                {errors.shopId?.message && (
                  <p className="text-sm text-red-500">
                    {String(errors.shopId.message)}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <StorageSelect
                  value={watchedStorageId || ""}
                  shopId={watchedShopId || ""}
                  onChange={(val) => {
                    clearSubmitError();
                    setValue("storageId", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                {errors.storageId?.message && (
                  <p className="text-sm text-red-500">
                    {String(errors.storageId.message)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                <ShoppingBag className="h-5 w-5 text-violet-500" />
                Cart Items
              </h3>

              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-2 border-dashed font-bold text-violet-600 hover:bg-violet-50"
                onClick={() => {
                  clearSubmitError();
                  append({ ...EMPTY_ITEM });
                }}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => {
                const item = watchedItems[index] ?? EMPTY_ITEM;
                const itemQty = Number(item.quantity) || 0;
                const itemPrice = Number(item.price) || 0;
                const rowTotal = Math.max(0, itemQty * itemPrice);

                return (
                  <div
                    key={field.id}
                    className="grid items-start gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:border-violet-200 md:grid-cols-[1fr_100px_120px_auto]"
                  >
                    <div className="space-y-1">
                      <InventoryProductSelect
                        value={item.productId}
                        shopId={watchedShopId || ""}
                        storageId={watchedStorageId || ""}
                        disabled={isSubmitting}
                        onChange={(product) => {
                          clearSubmitError();

                          const productId = product?.id ?? "";
                          const price = product?.price ?? 0;

                          setValue(`items.${index}.productId`, productId, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });

                          setValue(`items.${index}.price`, price, {
                            shouldDirty: true,
                            shouldTouch: true,
                          });

                          if (!productId) {
                            setValue(`items.${index}.quantity`, 1, {
                              shouldDirty: true,
                            });
                          }
                        }}
                      />

                      <input
                        type="hidden"
                        {...register(`items.${index}.price`, {
                          valueAsNumber: true,
                        })}
                      />

                      {errors.items?.[index]?.productId?.message && (
                        <p className="text-sm text-red-500">
                          {String(errors.items[index]?.productId?.message)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-center text-[10px] font-black uppercase text-muted-foreground">
                        Qty
                      </label>
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        {...register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                          min: 1,
                          onChange: clearSubmitError,
                        })}
                        className="h-11 rounded-xl text-center font-bold"
                      />
                      {errors.items?.[index]?.quantity?.message && (
                        <p className="text-center text-sm text-red-500">
                          {String(errors.items[index]?.quantity?.message)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-center text-[10px] font-black uppercase text-muted-foreground">
                        Total
                      </label>
                      <div className="flex h-11 items-center justify-center rounded-xl border bg-slate-50 font-bold tabular-nums text-slate-700">
                        ৳{rowTotal.toLocaleString()}
                      </div>
                      <div className="text-center text-xs text-slate-500">
                        ৳{itemPrice.toLocaleString()} each
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-500"
                        onClick={() => {
                          clearSubmitError();
                          remove(index);
                        }}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6 overflow-hidden rounded-3xl border-violet-100 bg-white shadow-xl">
            <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl font-black uppercase italic text-slate-800">
                <Calculator className="h-5 w-5 text-violet-600" />
                POS Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Payment Method
                  </label>
                  <select
                    {...register("paymentMethod", {
                      onChange: clearSubmitError,
                    })}
                    className="h-12 w-full rounded-xl bg-slate-100 px-4 font-bold outline-none"
                  >
                    <option value="CASH">CASH</option>
                    <option value="CARD">CARD</option>
                    <option value="BANK">BANK</option>
                    <option value="MOBILE_BANKING">MOBILE_BANKING</option>
                  </select>
                  {errors.paymentMethod?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.paymentMethod.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Discount (৳)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    {...register("discount", {
                      valueAsNumber: true,
                      min: 0,
                      onChange: clearSubmitError,
                    })}
                    className="h-12 rounded-xl bg-slate-50 font-bold text-red-500"
                  />
                  {errors.discount?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.discount.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-violet-700">
                    Paid Amount
                  </label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    {...register("paidAmount", {
                      valueAsNumber: true,
                      min: 0,
                      onChange: clearSubmitError,
                    })}
                    className="h-14 rounded-2xl border-2 border-violet-100 text-xl font-black text-violet-950"
                  />
                  {errors.paidAmount?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.paidAmount.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Note
                  </label>
                  <Input
                    type="text"
                    {...register("note", {
                      onChange: clearSubmitError,
                    })}
                    className="h-12 rounded-xl bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border bg-slate-50 p-5">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>ITEMS</span>
                  <span className="font-black text-slate-800">
                    {totalQuantity}
                  </span>
                </div>

                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>SUBTOTAL</span>
                  <span className="font-black text-slate-800">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-xs font-bold text-red-500">
                  <span>DISCOUNT</span>
                  <span>-৳{discount.toLocaleString()}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-black text-violet-700">
                  <span>PAYABLE</span>
                  <span>৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {submitError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {submitError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-16 w-full rounded-2xl bg-violet-600 text-lg font-black uppercase shadow-lg hover:bg-violet-700"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "EXECUTE SALE"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
