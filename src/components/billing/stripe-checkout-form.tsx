"use client";

import { useState, type FormEvent } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

type StripeCheckoutFormProps = {
  onSuccess?: () => void;
};

export default function StripeCheckoutForm({
  onSuccess,
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Payment failed");
      return;
    }

    toast.success("Payment completed successfully");
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50">
            <CreditCard className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-slate-800">
              Secure Checkout
            </h3>
            <p className="text-xs text-muted-foreground">
              Complete your payment securely with Stripe.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-slate-50 p-4">
          <PaymentElement />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border bg-slate-50 p-4 text-xs font-medium text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-violet-500" />
        Your payment information is encrypted and processed securely.
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-2xl bg-violet-600 font-black uppercase shadow-lg hover:bg-violet-700"
        disabled={!stripe || !elements || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay Now
          </>
        )}
      </Button>
    </form>
  );
}
