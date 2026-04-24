"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, BadgeCheck, AlertCircle, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import type { BillingPlan } from "@/modules/billing/billing.types";
import { billingKeys } from "@/modules/billing/billing.keys";
import { useCreatePaymentIntent } from "@/hooks/use-billing";
import { formatCurrency } from "@/lib/format";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StripePaymentModal from "@/components/billing/stripe-payment-modal";

type Props = {
  plans: BillingPlan[];
};

export default function BillingPlansGrid({ plans }: Props) {
  const queryClient = useQueryClient();
  const createPaymentIntentMutation = useCreatePaymentIntent();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [publishableKey, setPublishableKey] = useState<string | null>(null);

  const handleChoosePlan = async (billingPlanId: string) => {
    try {
      const response = await createPaymentIntentMutation.mutateAsync({
        billingPlanId,
      });

      setClientSecret(response?.data?.clientSecret || null);
      setPublishableKey(response?.data?.publishableKey || null);
      setPaymentModalOpen(true);

      toast.success("Payment form ready");
    } catch {
      toast.error("Failed to prepare payment");
    }
  };

  if (plans.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
          <AlertCircle className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          No billing plans found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                <BadgeCheck className="h-6 w-6 text-violet-600" />
              </div>

              <div>
                <CardTitle className="text-xl font-black text-slate-800">
                  {plan.name}
                </CardTitle>

                {plan.description ? (
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {plan.description}
                  </p>
                ) : null}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="rounded-2xl border bg-slate-50 p-4">
                <p className="text-3xl font-black text-violet-700">
                  {formatCurrency(Number(plan.amount || 0))}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {plan.currency} {plan.interval ? `/ ${plan.interval}` : ""}
                </p>
              </div>

              <Button
                type="button"
                className="h-12 w-full rounded-2xl bg-violet-600 font-black uppercase shadow-lg hover:bg-violet-700"
                onClick={() => handleChoosePlan(plan.id)}
                disabled={createPaymentIntentMutation.isPending}
              >
                {createPaymentIntentMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Choose Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <StripePaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        clientSecret={clientSecret}
        publishableKey={publishableKey}
        onPaymentSuccess={async () => {
          setClientSecret(null);
          setPublishableKey(null);

          await queryClient.invalidateQueries({
            queryKey: billingKeys.all,
          });

          await queryClient.refetchQueries({
            queryKey: billingKeys.status,
          });

          await queryClient.refetchQueries({
            queryKey: billingKeys.history,
          });

          toast.success("Billing updated successfully");
        }}
      />
    </>
  );
}
