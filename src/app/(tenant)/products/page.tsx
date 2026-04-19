"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/use-products";
import ProductsTable from "@/components/products/products-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, PackageX } from "lucide-react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  // Debounce logic: Wait 500ms after the user stops typing before fetching
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 on new search
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 10,
    searchTerm: debouncedSearch,
  });

  const products = data?.data ?? [];
  const meta = data?.meta; // Assuming your API returns pagination meta (total, page, etc.)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your inventory, pricing, and stock levels.
          </p>
        </div>

        <Button asChild className="rounded-xl shadow-lg shadow-primary/20">
          <Link href="/products/create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or SKU..."
          className="pl-10 rounded-xl bg-background border-muted-foreground/20 focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-muted/50 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-3xl bg-destructive/5 border-destructive/20 text-destructive">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm opacity-80">
            Could not fetch products from the server.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-muted/30">
          <div className="bg-muted p-4 rounded-full mb-4">
            <PackageX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-sm text-muted-foreground max-w-[250px] text-center mt-1">
            {debouncedSearch
              ? `We couldn't find anything matching "${debouncedSearch}"`
              : "Start by adding your first product to the system."}
          </p>
          {!debouncedSearch && (
            <Button asChild variant="outline" className="mt-4 rounded-xl">
              <Link href="/products/create">Create Product</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
          <ProductsTable products={products} />

          {/* Simple Pagination Controls */}
          {meta && meta.total > 10 && (
            <div className="flex items-center justify-end px-6 py-4 bg-muted/20 border-t gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-xs font-medium px-4">Page {page}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={products.length < 10}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
