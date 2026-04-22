import { apiClient } from "@/services/api-client";
import {
  AddSalePaymentPayload,
  CancelSalePayload,
  CreateSalePayload,
  CreateSaleReturnPayload,
} from "./sales.type";

const SALES_BASE = "/sales";

export async function getSales(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  paymentStatus?: string;
  shopId?: string;
}) {
  const res = await apiClient.get(SALES_BASE, { params });
  return res.data;
}

export async function getSaleById(id: string) {
  const res = await apiClient.get(`${SALES_BASE}/${id}`);
  return res.data;
}

export async function createSale(payload: CreateSalePayload) {
  const res = await apiClient.post(SALES_BASE, payload);
  return res.data;
}

export async function getSalePayments(id: string) {
  const res = await apiClient.get(`${SALES_BASE}/${id}/payments`);
  return res.data;
}

export async function addSalePayment(
  id: string,
  payload: AddSalePaymentPayload,
) {
  const res = await apiClient.post(`${SALES_BASE}/${id}/payments`, payload);
  return res.data;
}

export async function getSaleReturns(id: string) {
  const res = await apiClient.get(`${SALES_BASE}/${id}/returns`);
  return res.data;
}

export async function createSaleReturn(
  id: string,
  payload: CreateSaleReturnPayload,
) {
  const res = await apiClient.post(`${SALES_BASE}/${id}/returns`, payload);
  return res.data;
}

export async function cancelSale(id: string, payload: CancelSalePayload) {
  const res = await apiClient.patch(`${SALES_BASE}/${id}/cancel`, payload);
  return res.data;
}
