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

export async function getContactMessages(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}) {
  const res = await apiClient.get("/contact-messages", { params });
  return res.data;
}

export async function updateContactMessageStatus(id: string, status: string) {
  const res = await apiClient.patch(`/contact-messages/${id}/status`, {
    status,
  });
  return res.data;
}

export async function getDemoRequests(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}) {
  const res = await apiClient.get("/demo-requests", { params });
  return res.data;
}

export async function updateDemoRequestStatus(id: string, status: string) {
  const res = await apiClient.patch(`/demo-requests/${id}/status`, {
    status,
  });
  return res.data;
}

export async function getSupportTickets(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}) {
  const res = await apiClient.get("/support-tickets", { params });
  return res.data;
}

export async function updateSupportTicketStatus(id: string, status: string) {
  const res = await apiClient.patch(`/support-tickets/${id}/status`, {
    status,
  });
  return res.data;
}
