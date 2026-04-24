"use client";

import type { OrganizationSubscription } from "@/modules/billing/billing.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import {
  CreditCard,
  CalendarDays,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  subscription?: OrganizationSubscription | null;
};

export default function BillingStatusCard({ subscription }: Props) {
  if (!subscription) {
    return (
      <Card className="rounded-3xl border border-amber-100 bg-white shadow-sm">
        <CardHeader className="border-b bg-amber-50/40">
          <CardTitle className="flex items-center gap-2 text-lg font-black text-slate-800">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            Subscription Status
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <p className="text-sm font-medium text-muted-foreground">
            No active subscription found. Choose a plan below to continue.
          </p>
        </CardContent>
      </Card>
    );
  }

  const plan = subscription.billingPlan;

  return (
    <Card className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
      <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

      <CardHeader className="border-b bg-white">
        <CardTitle className="flex items-center gap-2 text-lg font-black text-slate-800">
          <CreditCard className="h-5 w-5 text-violet-600" />
          Subscription Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Current Status
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-black uppercase",
              subscription.status === "ACTIVE"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700",
            )}
          >
            {subscription.status}
          </span>
        </div>

        {plan ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-violet-500" />
                Plan
              </div>
              <p className="text-xl font-black text-slate-800">{plan.name}</p>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                <CreditCard className="h-4 w-4 text-violet-500" />
                Amount
              </div>
              <p className="text-xl font-black text-violet-700">
                {formatCurrency(Number(plan.amount || 0))}
              </p>
            </div>
          </div>
        ) : null}

        <div className="flex items-center gap-2 rounded-2xl border bg-slate-50 p-4 text-sm font-medium text-slate-700">
          <CalendarDays className="h-4 w-4 text-violet-500" />
          <span className="text-muted-foreground">Starts:</span>
          <span className="font-bold">
            {subscription.startsAt
              ? new Date(subscription.startsAt).toLocaleDateString()
              : "-"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
