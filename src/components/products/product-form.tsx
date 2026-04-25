"use client";

import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Loader2,
  X,
  Plus,
  CheckCircle2,
} from "lucide-react";

import { parseApiError } from "@/lib/error-parser";
import type { Category } from "@/modules/categories/categories.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import CategorySelect from "@/components/products/category-select";
import CreateCategoryModal from "@/components/categories/create-category-modal";
import { Product } from "@/types/products.types";
import {
  productSchema,
  ProductSchemaValues,
} from "@/modules/products/product.schema";

type ProductFormProps = {
  defaultValues?: Partial<Product>;
  // Updated to accept FormData to match your backend logic
  onSubmitAction: (data: FormData) => Promise<void>;
  submitText?: string;
  canManageCategories?: boolean;
};

export default function ProductForm({
  defaultValues,
  onSubmitAction,
  submitText = "Save Product",
  canManageCategories = true,
}: ProductFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    defaultValues?.image?.url || "",
  );

  useEffect(() => {
    if (!selectedImage) {
      setImagePreviewUrl(defaultValues?.image?.url || "");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage, defaultValues?.image?.url]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchemaValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductSchemaValues>,
    defaultValues: {
      name: defaultValues?.name || "",
      sku: defaultValues?.sku || "",
      price: defaultValues?.price ?? 0,
      costPrice: defaultValues?.costPrice ?? 0,
      categoryId: defaultValues?.categoryId || "",
      status: defaultValues?.status || "ACTIVE",
    },
  });

  const selectedCategoryId = watch("categoryId");

  const onSubmit = async (values: ProductSchemaValues) => {
    try {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          name: values.name,
          sku: values.sku,
          price: Number(values.price),
          costPrice: Number(values.costPrice),
          categoryId: values.categoryId,
          status: values.status,
        }),
      );

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await onSubmitAction(formData);
      toast.success("Product saved successfully");
    } catch (error) {
      const parsed = parseApiError(error);
      if (parsed.fieldErrors) {
        parsed.fieldErrors.forEach((err) => {
          const path = err.path as keyof ProductSchemaValues;
          setError(path, { message: err.message });
        });
      }
      toast.error(parsed.message || "Failed to save product");
    }
  };

  const handleCategoryCreated = (category: Category) => {
    setValue("categoryId", category.id, { shouldValidate: true });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-950">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-violet-600" />
                <h3 className="text-lg font-black tracking-tight">
                  General Information
                </h3>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Product Name
                  </label>
                  <Input
                    placeholder="e.g. M ITPro Mouse"
                    className="h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none px-4 font-bold"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-bold text-red-500 ml-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    SKU / Barcode
                  </label>
                  <Input
                    placeholder="NX-001-BLU"
                    className="h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none px-4 font-mono text-sm font-bold"
                    {...register("sku")}
                  />
                  {errors.sku && (
                    <p className="text-[11px] font-bold text-red-500 ml-2">
                      {errors.sku.message}
                    </p>
                  )}
                </div>

                <CategorySelect
                  value={selectedCategoryId}
                  onChange={(val) =>
                    setValue("categoryId", val, { shouldValidate: true })
                  }
                  onAddCategory={() => setCategoryModalOpen(true)}
                  disabled={isSubmitting}
                  canAddCategory={canManageCategories}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-950">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-black tracking-tight">
                  Pricing & Status
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Selling Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      $
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      className="h-12 pl-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none font-black"
                      {...register("price", { valueAsNumber: true })}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-[11px] font-bold text-red-500 ml-2">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Cost Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      $
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      className="h-12 pl-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none font-black"
                      {...register("costPrice", { valueAsNumber: true })}
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Availability
                  </label>
                  <div className="relative">
                    <select
                      {...register("status")}
                      className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none px-4 text-sm font-bold appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-950 overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-black tracking-tight">
                  Product Media
                </h3>
              </div>
              <div className="relative aspect-square rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center overflow-hidden group">
                {imagePreviewUrl ? (
                  <>
                    <img
                      src={imagePreviewUrl}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-rose-500" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm mb-4">
                      <Plus className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Upload Image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    setSelectedImage(e.target.files?.[0] || null)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 rounded-[2rem] bg-violet-600 hover:bg-violet-700 text-white font-black text-lg shadow-xl shadow-violet-200 dark:shadow-none transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              submitText
            )}
          </Button>
        </div>
      </form>

      <CreateCategoryModal
        open={categoryModalOpen}
        onOpenChange={setCategoryModalOpen}
        onCreated={handleCategoryCreated}
      />
    </>
  );
}
