"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  Edit,
  MoreHorizontal,
  Eye,
  Trash2,
  ImageIcon,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/products.types";
import { useDeleteProduct } from "@/hooks/use-products";

type ProductsTableProps = {
  products: Product[];
};

export default function ProductsTable({ products }: ProductsTableProps) {
  // 1. Initialize the delete mutation hook
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone.",
      )
    ) {
      deleteProduct(id);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/30 transition-colors">
            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground w-[80px]">
              Image
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
              Product Details
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
              SKU
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground text-right">
              Price
            </th>
            <th className="h-12 px-4 text-center align-middle font-semibold text-muted-foreground">
              Status
            </th>
            <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((product) => {
            const imageUrl =
              typeof product.image === "string"
                ? product.image
                : product.image?.url;

            return (
              <tr
                key={product.id}
                className="group hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-muted flex items-center justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="aspect-square h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground line-clamp-1">
                      {product.name}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      ID: {product.id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-medium">
                    {product.sku || "N/A"}
                  </code>
                </td>

                <td className="px-4 py-4 text-right font-medium text-violet-600">
                  {formatCurrency(Number(product.price || 0))}
                </td>

                <td className="px-4 py-4 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-3 py-0.5 border-none",
                      product.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400",
                    )}
                  >
                    {product.status || "DRAFT"}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-violet-50 hover:text-violet-600"
                        disabled={isPending} // Disable trigger if an action is pending
                      >
                        <span className="sr-only">Open menu</span>
                        {isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-44 rounded-xl shadow-xl"
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link
                          href={`/products/${product.id}/edit`}
                          className="flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" /> Edit Product
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* 2. Attach the delete handler here */}
                      <DropdownMenuItem
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        disabled={isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                        {isPending ? "Deleting..." : "Delete Product"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
