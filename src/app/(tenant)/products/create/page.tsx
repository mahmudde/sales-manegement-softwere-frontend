"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";

import { useCreateProduct } from "@/hooks/use-products";
import ProductForm from "@/components/products/product-form";
import { Button } from "@/components/ui/button";

export default function CreateProductPage() {
  const router = useRouter();
  const createProductMutation = useCreateProduct();

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
              Back to Inventory
            </span>
          </Link>
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-violet-500" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Create Product
              </h1>
            </div>
            <p className="text-slate-500 font-medium">
              Add a new product to your organization catalog.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <ProductForm
          onSubmitAction={async (payload) => {
            await createProductMutation.mutateAsync(payload);
            router.push("/products");
          }}
          submitText="Create Product"
          canManageCategories={true}
        />
      </div>
    </div>
  );
}
