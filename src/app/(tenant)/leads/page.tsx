"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, Loader2, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getContactMessages,
  getDemoRequests,
  getSupportTickets,
  updateContactMessageStatus,
  updateDemoRequestStatus,
  updateSupportTicketStatus,
} from "@/modules/public/public.api";

type LeadKind = "contact" | "demo" | "support";

type CustomerRecord = {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject?: string;
  category?: string;
  status: string;
  createdAt: string;
  message?: string;
};

const leadTabs: { label: string; value: LeadKind }[] = [
  { label: "Contact messages", value: "contact" },
  { label: "Demo requests", value: "demo" },
  { label: "Support tickets", value: "support" },
];

const statusOptions: Record<LeadKind, string[]> = {
  contact: ["NEW", "CONTACTED", "SCHEDULED", "CLOSED"],
  demo: ["PENDING", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"],
  support: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
};

export default function LeadsPage() {
  const queryClient = useQueryClient();
  const [kind, setKind] = useState<LeadKind>("contact");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      searchTerm: searchTerm || undefined,
      status: status === "all" ? undefined : status,
    }),
    [page, searchTerm, status],
  );

  const query = useQuery({
    queryKey: ["customer-leads", kind, params],
    queryFn: () => {
      if (kind === "demo") return getDemoRequests(params);
      if (kind === "support") return getSupportTickets(params);
      return getContactMessages(params);
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: string }) => {
      if (kind === "demo") return updateDemoRequestStatus(id, nextStatus);
      if (kind === "support") return updateSupportTicketStatus(id, nextStatus);
      return updateContactMessageStatus(id, nextStatus);
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["customer-leads"] });
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const records: CustomerRecord[] = query.data?.data ?? [];
  const meta = query.data?.meta;

  const changeTab = (nextKind: LeadKind) => {
    setKind(nextKind);
    setStatus("all");
    setPage(1);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
              Customer interaction
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight">
              Customer Leads
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Review public contact messages, demo requests, and support
              tickets submitted from the open agency website.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
            <Inbox className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50 lg:grid-cols-[auto_1fr_auto]">
        <div className="flex flex-wrap gap-2">
          {leadTabs.map((tab) => (
            <Button
              key={tab.value}
              type="button"
              variant={kind === tab.value ? "default" : "outline"}
              onClick={() => changeTab(tab.value)}
              className="rounded-xl"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setPage(1);
            }}
            placeholder="Search name, email, company, or message"
            className="h-10 rounded-xl pl-9"
          />
        </div>

        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className="h-10 rounded-xl border border-slate-200 bg-transparent px-3 text-sm font-semibold dark:border-slate-800"
        >
          <option value="all">All statuses</option>
          {statusOptions[kind].map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50">
        {query.isLoading ? (
          <div className="flex min-h-64 items-center justify-center text-sm font-semibold text-slate-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-violet-600" />
            Loading customer records...
          </div>
        ) : records.length === 0 ? (
          <div className="min-h-64 p-8 text-center">
            <p className="font-black">No customer records found.</p>
            <p className="mt-1 text-sm text-slate-500">
              New public submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-widest text-slate-500 dark:bg-slate-950/60">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Context</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {records.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-4">
                      <p className="font-bold">{record.name}</p>
                      <p className="text-xs text-slate-500">{record.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold">
                        {record.company || record.subject || "General request"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {record.category || kind.replaceAll("_", " ")}
                      </p>
                    </td>
                    <td className="max-w-sm px-4 py-4 text-slate-600 dark:text-slate-300">
                      <span className="line-clamp-2">{record.message || "No message supplied"}</span>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={record.status}
                        onChange={(event) =>
                          mutation.mutate({
                            id: record.id,
                            nextStatus: event.target.value,
                          })
                        }
                        className="h-9 rounded-xl border border-slate-200 bg-transparent px-3 text-xs font-bold dark:border-slate-800"
                      >
                        {statusOptions[kind].map((item) => (
                          <option key={item} value={item}>
                            {item.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 text-xs font-semibold text-slate-500">
                      {new Date(record.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage((value) => Math.max(value - 1, 1))}
          className="rounded-xl"
        >
          Previous
        </Button>
        <span className="text-sm font-bold text-slate-500">
          Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
        </span>
        <Button
          type="button"
          variant="outline"
          disabled={meta ? page >= meta.totalPages : true}
          onClick={() => setPage((value) => value + 1)}
          className="rounded-xl"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
