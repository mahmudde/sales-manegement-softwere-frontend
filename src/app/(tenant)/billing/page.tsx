"use client";

import {
  useBillingHistory,
  useBillingPlans,
  useBillingStatus,
} from "@/hooks/use-billing";
import type {
  BillingPlan,
  OrganizationSubscription,
  PaymentTransaction,
} from "@/modules/billing/billing.types";
import {
  CreditCard,
  Loader2,
  AlertCircle,
  BadgeCheck,
  History,
} from "lucide-react";

import BillingStatusCard from "@/components/billing/billing-status-card";
import BillingPlansGrid from "@/modules/billing/billing-plans-grid";
import BillingHistoryTable from "@/modules/billing/billing-history-table";

export default function BillingPage() {
  const {
    data: statusData,
    isLoading: statusLoading,
    isError: statusError,
  } = useBillingStatus();

  const {
    data: plansData,
    isLoading: plansLoading,
    isError: plansError,
  } = useBillingPlans();

  const {
    data: historyData,
    isLoading: historyLoading,
    isError: historyError,
  } = useBillingHistory();

  const subscription: OrganizationSubscription | null =
    statusData?.data ?? null;

  const plans: BillingPlan[] = Array.isArray(plansData?.data)
    ? plansData.data
    : [];

  const payments: PaymentTransaction[] = Array.isArray(historyData?.data)
    ? historyData.data
    : [];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
            <CreditCard className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">
              Billing
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your organization subscription, billing plan, and payments.
            </p>
          </div>
        </div>
      </div>

      {statusLoading ? (
        <LoadingCard message="Loading billing status..." />
      ) : statusError ? (
        <ErrorCard message="Failed to load billing status." />
      ) : (
        <BillingStatusCard subscription={subscription} />
      )}

      <section className="space-y-4">
        <SectionHeader
          icon={<BadgeCheck className="h-5 w-5 text-violet-500" />}
          title="Available Plans"
          description="Choose a plan to create a Stripe payment intent."
        />

        {plansLoading ? (
          <LoadingCard message="Loading billing plans..." />
        ) : plansError ? (
          <ErrorCard message="Failed to load billing plans." />
        ) : (
          <BillingPlansGrid plans={plans} />
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader
          icon={<History className="h-5 w-5 text-violet-500" />}
          title="Billing History"
          description="Review previous payment attempts and subscription transactions."
        />

        {historyLoading ? (
          <LoadingCard message="Loading billing history..." />
        ) : historyError ? (
          <ErrorCard message="Failed to load billing history." />
        ) : (
          <BillingHistoryTable payments={payments} />
        )}
      </section>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-muted/60 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-black text-slate-800">{title}</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function LoadingCard({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
      <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
      <p className="text-sm font-medium text-destructive">{message}</p>
    </div>
  );
}
