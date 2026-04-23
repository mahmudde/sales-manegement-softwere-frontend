/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Package, Receipt, Loader2, AlertCircle } from "lucide-react";

import { useAddSalePayment, useSale, useSalePayments } from "@/hooks/use-sales";
import { formatCurrency } from "@/lib/format";

import type { AddPaymentSchemaValues } from "@/modules/sales/payment.schema";

import { Button } from "@/components/ui/button";
import AddPaymentModal from "@/components/sales/add-payment-modal";
import { SalePayment } from "@/modules/sales/sales.type";

export default function SaleDetailsPage() {
  const params = useParams<{ id: string }>();
  const saleId = params.id;

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const { data, isLoading, isError } = useSale(saleId);
  const { data: paymentsData } = useSalePayments(saleId);

  const addPaymentMutation = useAddSalePayment(saleId);

  const sale = data?.data;

  const payments: SalePayment[] = Array.isArray(paymentsData?.data)
    ? paymentsData.data
    : Array.isArray(paymentsData?.data?.payments)
      ? paymentsData.data.payments
      : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (isError || !sale) {
    return (
      <div className="p-10 text-center">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-500" />
        <p className="text-red-500">Failed to load sale.</p>
      </div>
    );
  }

  const dueAmount = Number(sale.dueAmount || 0);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Sale Details</h1>
          <p className="text-sm text-muted-foreground">
            Invoice: {sale.invoiceNumber || sale.id}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setPaymentModalOpen(true)}
            disabled={dueAmount <= 0}
            className="bg-violet-600 hover:bg-violet-700"
          >
            Add Payment
          </Button>

          <Button asChild variant="outline">
            <Link href="/sales">Back</Link>
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total" value={sale.totalAmount} />
        <Stat label="Paid" value={sale.paidAmount} />
        <Stat label="Due" value={sale.dueAmount} />
        <Stat label="Status" value={sale.paymentStatus} isText />
      </div>

      {/* Items */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-violet-500" />
          <h2 className="text-lg font-bold">Sale Items</h2>
        </div>

        {!sale.items?.length ? (
          <p className="text-sm text-muted-foreground">No items found.</p>
        ) : (
          <div className="space-y-3">
            {sale.items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">
                    {item.productName ||
                      item.product?.name ||
                      "Unknown Product"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-violet-600">
                  {formatCurrency(
                    Number(item.totalPrice || item.subtotal || 0),
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payments */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="h-5 w-5 text-violet-500" />
          <h2 className="text-lg font-bold">Payments</h2>
        </div>

        {payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payments found.</p>
        ) : (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-2xl border p-3"
              >
                <div>
                  <p className="font-semibold">{payment.paymentMethod}</p>
                  <p className="text-xs text-muted-foreground">
                    {payment.note || "No note"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-violet-600">
                    {formatCurrency(Number(payment.amount || 0))}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.createdAt || ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddPaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        dueAmount={dueAmount}
        onSubmitAction={async (payload: AddPaymentSchemaValues) => {
          await addPaymentMutation.mutateAsync(payload);
        }}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  isText,
}: {
  label: string;
  value: any;
  isText?: boolean;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="text-xl font-black text-slate-800">
        {isText ? value || "-" : formatCurrency(Number(value || 0))}
      </p>
    </div>
  );
}
