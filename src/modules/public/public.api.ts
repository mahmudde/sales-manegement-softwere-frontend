import { apiClient } from "@/services/api-client";

export type ContactMessagePayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

export type SupportTicketPayload = {
  name: string;
  email: string;
  subject: string;
  category: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  message: string;
};

export async function createContactMessage(payload: ContactMessagePayload) {
  const res = await apiClient.post("/contact", payload);
  return res.data;
}

export async function createSupportTicket(payload: SupportTicketPayload) {
  const res = await apiClient.post("/support-tickets", payload);
  return res.data;
}

export async function subscribeToNewsletter(email: string) {
  const res = await apiClient.post("/newsletter", { email });
  return res.data;
}
