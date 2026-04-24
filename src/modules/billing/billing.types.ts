export type BillingPlan = {
  id: string;
  name: string;
  description?: string | null;
  amount: number;
  currency: string;
  interval?: string;
  isActive?: boolean;
};

export type PaymentTransaction = {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCEEDED" | "FAILED" | string;
  stripePaymentIntentId?: string;
  note?: string | null;
  createdAt?: string;
  subscription?: {
    id: string;
    billingPlan?: BillingPlan;
  };
  createdBy?: {
    id: string;
    name?: string;
    email?: string;
  };
};

export type OrganizationSubscription = {
  id: string;
  status: "ACTIVE" | "INACTIVE" | "CANCELED" | "EXPIRED" | string;
  startsAt?: string | null;
  endsAt?: string | null;
  billingPlan?: BillingPlan;
  payments?: PaymentTransaction[];
};

export type CreatePaymentIntentPayload = {
  billingPlanId: string;
};

export type CreatePaymentIntentResponse = {
  success: true;
  message: string;
  data: {
    clientSecret: string;
    paymentIntentId: string;
    paymentTransaction: PaymentTransaction;
    billingPlan: BillingPlan;
    publishableKey: string;
  };
};
