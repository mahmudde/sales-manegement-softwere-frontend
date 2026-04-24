import { apiClient } from "@/services/api-client";
import type { CreatePaymentIntentPayload } from "@/modules/billing/billing.types";

const BILLING_BASE = "/billing";

export async function getBillingPlans() {
  const res = await apiClient.get(`${BILLING_BASE}/plans`);
  return res.data;
}

export async function getBillingStatus() {
  const res = await apiClient.get(`${BILLING_BASE}/status`);
  return res.data;
}

export async function getBillingHistory() {
  const res = await apiClient.get(`${BILLING_BASE}/history`);
  return res.data;
}

export async function createPaymentIntent(payload: CreatePaymentIntentPayload) {
  const res = await apiClient.post(
    `${BILLING_BASE}/create-payment-intent`,
    payload,
  );
  return res.data;
}
