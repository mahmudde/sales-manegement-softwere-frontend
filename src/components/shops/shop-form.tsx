"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Store, MapPin, Phone, ToggleLeft, Loader2 } from "lucide-react";

import {
  createShopSchema,
  type CreateShopSchemaInput,
  type CreateShopSchemaValues,
} from "@/modules/shops/shops.schema";
import { parseApiError } from "@/lib/error-parser";
import type { Shop } from "@/modules/shops/shops.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ShopFormProps = {
  defaultValues?: Partial<Shop>;
  onSubmitAction: (payload: CreateShopSchemaValues) => Promise<void>;
  submitText?: string;
};

export default function ShopForm({
  defaultValues,
  onSubmitAction,
  submitText = "Save Shop",
}: ShopFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateShopSchemaInput, unknown, CreateShopSchemaValues>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      address: defaultValues?.address || "",
      phone: defaultValues?.phone || "",
      status: defaultValues?.status || "ACTIVE",
    },
  });

  const onSubmit = async (data: CreateShopSchemaValues) => {
    try {
      await onSubmitAction(data);
      toast.success("Shop saved successfully");
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        if (
          err.path === "name" ||
          err.path === "address" ||
          err.path === "phone" ||
          err.path === "status"
        ) {
          setError(err.path as keyof CreateShopSchemaInput, {
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
          <Store className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Shop Name
          </label>
        </div>

        <Input
          placeholder="Enter shop name"
          {...register("name")}
          className="h-12 rounded-2xl bg-slate-50 font-medium shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
        />

        {errors.name && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <MapPin className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Address
          </label>
        </div>

        <Input
          placeholder="Enter address"
          {...register("address")}
          className="h-12 rounded-2xl bg-slate-50 font-medium shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
        />

        {errors.address && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Phone className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Phone
          </label>
        </div>

        <Input
          placeholder="Enter phone"
          {...register("phone")}
          className="h-12 rounded-2xl bg-slate-50 font-medium shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
        />

        {errors.phone && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <ToggleLeft className="h-4 w-4 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Status
          </label>
        </div>

        <select
          {...register("status")}
          className="h-12 w-full rounded-2xl border border-input bg-slate-50 px-4 text-sm font-bold outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        {errors.status && (
          <p className="px-1 text-sm font-medium text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      <div className="rounded-2xl border bg-slate-50 p-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
          <span>Shop Mode</span>
          <span className="text-violet-700">
            {defaultValues?.status || "ACTIVE"}
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
              Saving...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
    </form>
  );
}
