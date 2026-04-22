"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Search, Eye, Loader2, Receipt } from "lucide-react";

import { useSales } from "@/hooks/use-sales";

import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sale } from "@/modules/sales/sales.type";

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 1. Debounce logic to prevent API spam
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError } = useSales({
    page: 1,
    limit: 10,
    searchTerm: debouncedSearch,
  });

  const sales: Sale[] = data?.data ?? [];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <p className="text-muted-foreground mt-1">
            Manage transactions, collections, and due tracking.
          </p>
        </div>

        <Button
          asChild
          className="rounded-xl shadow-sm bg-violet-600 hover:bg-violet-700 transition-all"
        >
          <Link href="/sales/create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create Sale
          </Link>
        </Button>
      </div>

      {/* Filter Section */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by invoice or shop name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl focus-visible:ring-violet-500"
        />
      </div>

      {/* Table Section */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 p-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading transactions...
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="text-sm font-semibold text-destructive text-red-500">
            Failed to load sales data.
          </p>
        </div>
      ) : sales.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-20 text-center">
          <Receipt className="h-10 w-10 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">No sales found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
                  Invoice
                </th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
                  Shop
                </th>
                <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">
                  Total
                </th>
                <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">
                  Paid
                </th>
                <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">
                  Due
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
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-4 font-mono text-xs font-semibold">
                    {sale.invoiceNumber || sale.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-4 py-4 font-medium">
                    {sale.shopName || "Walk-in Customer"}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold">
                    {formatCurrency(Number(sale.totalAmount || 0))}
                  </td>
                  <td className="px-4 py-4 text-right text-emerald-600">
                    {formatCurrency(Number(sale.paidAmount || 0))}
                  </td>
                  <td className="px-4 py-4 text-right text-red-500">
                    {formatCurrency(Number(sale.dueAmount || 0))}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-2.5 py-0.5 border-none",
                        sale.paymentStatus === "PAID" &&
                          "bg-emerald-100 text-emerald-700",
                        sale.paymentStatus === "PARTIAL" &&
                          "bg-amber-100 text-amber-700",
                        sale.paymentStatus === "UNPAID" &&
                          "bg-rose-100 text-rose-700",
                      )}
                    >
                      {sale.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="rounded-lg hover:bg-violet-50 hover:text-violet-600"
                    >
                      <Link
                        href={`/sales/${sale.id}`}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" /> View
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
