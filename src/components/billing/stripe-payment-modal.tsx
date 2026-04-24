"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { CreditCard } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StripeCheckoutForm from "@/components/billing/stripe-checkout-form";

type StripePaymentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientSecret: string | null;
  publishableKey: string | null;
  onPaymentSuccess?: () => void;
};

export default function StripePaymentModal({
  open,
  onOpenChange,
  clientSecret,
  publishableKey,
  onPaymentSuccess,
}: StripePaymentModalProps) {
  const stripePromise = useMemo<Promise<Stripe | null> | null>(() => {
    if (!publishableKey) return null;
    return loadStripe(publishableKey);
  }, [publishableKey]);

  if (!clientSecret || !stripePromise) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-lg">
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-black uppercase text-slate-800">
            <CreditCard className="h-5 w-5 text-violet-600" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
              },
            }}
          >
            <StripeCheckoutForm
              onSuccess={() => {
                onPaymentSuccess?.();
                onOpenChange(false);
              }}
            />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
}
