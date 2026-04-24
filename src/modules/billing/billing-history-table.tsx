"use client";

import type { PaymentTransaction } from "@/modules/billing/billing.types";
import { formatCurrency } from "@/lib/format";
import {
  CreditCard,
  CalendarDays,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  payments: PaymentTransaction[];
};

export default function BillingHistoryTable({ payments }: Props) {
  if (payments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
          <AlertCircle className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          No billing history found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-muted/60 bg-white shadow-sm">
      {/* header */}
      <div className="border-b bg-muted/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-violet-500" />
          <h2 className="text-base font-bold text-slate-800">
            Billing History
          </h2>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/5">
            <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Payment ID</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {payments.map((payment) => {
              const status = payment.status || "UNKNOWN";

              return (
                <tr
                  key={payment.id}
                  className="transition-colors hover:bg-violet-50/40"
                >
                  {/* PLAN */}
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {payment.subscription?.billingPlan?.name || "-"}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4 font-bold text-violet-700">
                    {formatCurrency(Number(payment.amount || 0))}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase",
                        status === "SUCCEEDED" || status === "SUCCESS"
                          ? "bg-emerald-100 text-emerald-700"
                          : status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700",
                      )}
                    >
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {status}
                    </span>
                  </td>

                  {/* PAYMENT ID */}
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {payment.stripePaymentIntentId || "-"}
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CalendarDays className="h-4 w-4 text-violet-500" />
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleDateString()
                        : "-"}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
