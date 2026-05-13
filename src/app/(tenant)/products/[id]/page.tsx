"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertCircle, ArrowLeft, Edit, Loader2, Package, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/use-products";
import { formatCurrency } from "@/lib/format";

function getImageUrl(image: unknown) {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (typeof image === "object" && "url" in image) {
    return String((image as { url?: string }).url || "");
  }
  return "";
}

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const { data, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border bg-white p-8 text-center">
        <AlertCircle className="mb-3 h-9 w-9 text-rose-500" />
        <h1 className="text-xl font-black">Product not found</h1>
        <Button asChild className="mt-4 rounded-xl">
          <Link href="/products">Back to products</Link>
        </Button>
      </div>
    );
  }

  const product = data.data;
  const imageUrl = getImageUrl(product.image);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <Button asChild variant="outline" className="mb-4 rounded-xl">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            SKU: {product.sku || "Not assigned"}
          </p>
        </div>

        <Button asChild className="rounded-xl bg-violet-600 text-white hover:bg-violet-700">
          <Link href={`/products/${product.id}/edit`}>
            <Edit className="h-4 w-4" />
            Edit Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center bg-slate-50">
              <Package className="h-16 w-16 text-slate-300" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black">Overview</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {product.description ||
                "This product is part of the organization catalog and can be connected to inventory, sale items, and category-based reporting."}
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <InfoCard label="Selling Price" value={formatCurrency(Number(product.price || 0))} />
            <InfoCard label="Cost Price" value={product.costPrice ? formatCurrency(Number(product.costPrice)) : "Not set"} />
            <InfoCard label="Status" value={product.status || "ACTIVE"} />
            <InfoCard
              label="Category"
              value={product.category?.name || product.categoryName || "Uncategorized"}
              icon={<Tag className="h-4 w-4 text-violet-600" />}
            />
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black">Key Information</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <Row label="Product ID" value={product.id} />
              <Row label="Slug" value={product.slug || "-"} />
              <Row label="Created" value={product.createdAt ? new Date(product.createdAt).toLocaleString() : "-"} />
              <Row label="Updated" value={product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "-"} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-semibold text-slate-500">{label}</span>
      <span className="break-all font-bold text-slate-800">{value}</span>
    </div>
  );
}
