"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Edit3, Loader2, AlertCircle } from "lucide-react";

import { useProduct, useUpdateProduct } from "@/hooks/use-products";
import ProductForm from "@/components/products/product-form";
import { Button } from "@/components/ui/button";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const { data, isLoading, isError } = useProduct(productId);
  const updateProductMutation = useUpdateProduct(productId);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] rounded-[2rem] border-2 border-slate-50 dark:border-slate-900 bg-white dark:bg-slate-950">
        <Loader2 className="h-10 w-10 text-violet-600 animate-spin mb-4" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
          Retrieving Product Data
        </p>
      </div>
    );
  }

  // --- Error State ---
  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] rounded-[2rem] border-2 border-rose-100 bg-rose-50/20 text-rose-600 p-8 text-center">
        <div className="p-4 bg-rose-100 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-rose-600" />
        </div>
        <h3 className="font-black text-xl text-slate-900 dark:text-white">
          Product Not Found
        </h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2 mb-6">
          The product you are trying to edit does not exist or has been removed
          from the catalog.
        </p>
        <Button
          asChild
          variant="outline"
          className="rounded-xl border-rose-200 hover:bg-rose-50 font-bold"
        >
          <Link href="/products">Return to Inventory</Link>
        </Button>
      </div>
    );
  }

  const product = data.data;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          asChild
          className="w-fit -ml-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all"
        >
          <Link href="/products" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-bold text-xs uppercase tracking-widest">
              Cancel Editing
            </span>
          </Link>
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Edit3 className="h-5 w-5 text-violet-500" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Edit {product.name}
              </h1>
            </div>
            <p className="text-slate-500 font-medium">
              Update product information and category assignment.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <ProductForm
          defaultValues={product}
          onSubmitAction={async (payload) => {
            await updateProductMutation.mutateAsync(payload);
            router.push("/products");
          }}
          submitText="Update Product"
          canManageCategories={true}
        />
      </div>
    </div>
  );
}
