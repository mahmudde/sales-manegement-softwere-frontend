"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  Printer,
  CreditCard,
  RotateCcw,
  Package,
  Info,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  useSale,
  useSalePayments,
  useSaleReturns,
  useAddSalePayment,
} from "@/hooks/use-sales";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AddPaymentModal from "@/components/sales/add-payment-modal";

import type { AddPaymentSchemaValues } from "@/modules/sales/payment.schema";
import {
  Sale,
  SaleItem,
  SalePayment,
  SaleReturn,
} from "@/modules/sales/sales.type";

export default function SaleDetailsPage() {
  const params = useParams<{ id: string }>();
  const saleId = params.id;

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const addPaymentMutation = useAddSalePayment(saleId);

  const { data, isLoading, isError } = useSale(saleId);
  const { data: paymentsData } = useSalePayments(saleId);
  const { data: returnsData } = useSaleReturns(saleId);

  const sale: Sale | undefined = data?.data;

  const payments: SalePayment[] = Array.isArray(paymentsData?.data)
    ? paymentsData.data
    : Array.isArray(paymentsData)
      ? paymentsData
      : [];

  const returns: SaleReturn[] = Array.isArray(returnsData?.data)
    ? returnsData.data
    : Array.isArray(returnsData)
      ? returnsData
      : [];

  if (isLoading) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
          <p className="text-sm font-medium text-muted-foreground">
            Generating invoice view...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !sale) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-12 text-center">
        <AlertCircle className="mb-4 h-10 w-10 text-destructive" />
        <h2 className="text-lg font-semibold text-destructive">
          Failed to load sale
        </h2>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          The transaction you are looking for does not exist or you do not have
          permission.
        </p>
        <Button asChild variant="outline">
          <Link href="/sales">Return to Sales List</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-[1200px] animate-in space-y-8 p-4 fade-in duration-500 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between no-print">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="-ml-2 text-muted-foreground transition-colors hover:text-violet-600"
            >
              <Link href="/sales">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Sales
              </Link>
            </Button>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
              <Badge
                variant="outline"
                className="border-violet-200 bg-violet-50 px-3 font-mono text-violet-700"
              >
                #{sale.invoiceNumber || sale.id.slice(0, 8).toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setPaymentModalOpen(true)}
              disabled={Number(sale.dueAmount || 0) <= 0}
              className="rounded-xl bg-violet-600 hover:bg-violet-700"
            >
              Add Payment
            </Button>

            <Button
              variant="outline"
              className="rounded-xl bg-white shadow-sm"
              onClick={() => window.print()}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Invoice
            </Button>

            <Button asChild variant="outline" className="rounded-xl bg-white">
              <Link href="/sales">Back to Sales</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Amount",
              value: formatCurrency(Number(sale.totalAmount || 0)),
              color: "text-foreground",
            },
            {
              label: "Paid Amount",
              value: formatCurrency(Number(sale.paidAmount || 0)),
              color: "text-emerald-600",
            },
            {
              label: "Due Amount",
              value: formatCurrency(Number(sale.dueAmount || 0)),
              color: "text-red-500",
            },
            {
              label: "Status",
              value: sale.paymentStatus,
              isStatus: true,
            },
          ].map((stat, i) => (
            <Card key={i} className="rounded-2xl border-muted/60 shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
                  {stat.label}
                </p>

                {stat.isStatus ? (
                  <Badge
                    className={cn(
                      "mt-2 rounded-full border-none px-3",
                      stat.value === "PAID" &&
                        "bg-emerald-100 text-emerald-700",
                      stat.value === "PARTIAL" && "bg-amber-100 text-amber-700",
                      stat.value === "UNPAID" && "bg-rose-100 text-rose-700",
                    )}
                  >
                    {stat.value || "PENDING"}
                  </Badge>
                ) : (
                  <p
                    className={cn(
                      "mt-1 text-2xl font-bold tracking-tight",
                      stat.color,
                    )}
                  >
                    {stat.value}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="overflow-hidden rounded-2xl border-muted/60 bg-white shadow-sm lg:col-span-2">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-violet-500" />
                Order Items
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/5 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <th className="px-6 py-4">Product Name</th>
                      <th className="px-6 py-4 text-center">Qty</th>
                      <th className="px-6 py-4 text-right">Price</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {sale.items?.map((item: SaleItem) => (
                      <tr
                        key={item.id}
                        className="group transition-colors hover:bg-muted/5"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-foreground">
                            {item.productName || "Unknown Product"}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground">
                            {item.productId}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-center font-medium">
                          {item.quantity}
                        </td>

                        <td className="px-6 py-4 text-right text-muted-foreground">
                          {formatCurrency(Number(item.unitPrice || 0))}
                        </td>

                        <td className="px-6 py-4 text-right font-bold text-violet-600">
                          {formatCurrency(Number(item.subtotal || 0))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-2xl border-muted/60 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5 text-violet-500" />
                  Sale Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shop Name:</span>
                  <span className="font-semibold">
                    {sale.shopName || "Walk-in"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Storage Location:
                  </span>
                  <span className="font-semibold">
                    {sale.storageName || "Main"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date Created:</span>
                  <span className="font-semibold">
                    {sale.createdAt
                      ? new Date(sale.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                    Note
                  </span>
                  <div className="rounded-xl border bg-muted/30 p-3 text-xs italic text-muted-foreground">
                    {sale.note ||
                      "No specific instructions provided for this transaction."}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border bg-background p-4">
              <h2 className="mb-3 text-lg font-semibold">Payments</h2>

              {payments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No payments found.
                </p>
              ) : (
                <div className="space-y-3">
                  {payments.map((p: SalePayment) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{p.paymentMethod}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.note || "No note"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(Number(p.amount || 0))}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.createdAt || ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <RotateCcw className="h-4 w-4" />
                Returns & Credits
              </h3>

              {returns.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed bg-muted/10 py-6 text-center text-xs font-medium text-muted-foreground">
                  No returned items recorded
                </div>
              ) : (
                returns.map((r: SaleReturn) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/30 p-4"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-rose-700 underline decoration-rose-200">
                        Return Ref: {r.id.slice(0, 6)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Badge
                      variant="destructive"
                      className="h-5 rounded-full text-[10px]"
                    >
                      {r.items?.length || 0} Items
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <AddPaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        dueAmount={Number(sale.dueAmount || 0)}
        onSubmitAction={async (payload: AddPaymentSchemaValues) => {
          await addPaymentMutation.mutateAsync(payload);
        }}
      />
    </>
  );
}
