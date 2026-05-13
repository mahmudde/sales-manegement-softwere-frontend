"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupportTicket } from "@/modules/public/public.api";

const initialState = {
  name: "",
  email: "",
  subject: "",
  category: "Onboarding",
  priority: "MEDIUM" as const,
  message: "",
};

export default function SupportTicketForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (key: keyof typeof initialState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setIsSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      form.name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
      form.subject.trim().length < 4 ||
      form.message.trim().length < 20
    ) {
      setError("Please complete the required fields with valid information.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createSupportTicket(form);
      setForm(initialState);
      setIsSuccess(true);
    } catch {
      setError("We could not create the support ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Full name" className="h-11 rounded-xl" />
        <Input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="Business email" className="h-11 rounded-xl" />
        <Input value={form.subject} onChange={(event) => updateField("subject", event.target.value)} placeholder="Ticket subject" className="h-11 rounded-xl" />
        <select value={form.category} onChange={(event) => updateField("category", event.target.value)} className="h-11 rounded-xl border border-input bg-transparent px-3 text-sm font-semibold outline-none">
          <option value="Onboarding">Onboarding</option>
          <option value="Billing">Billing</option>
          <option value="Inventory">Inventory</option>
          <option value="Sales">Sales</option>
          <option value="Technical">Technical</option>
        </select>
      </div>
      <textarea
        value={form.message}
        onChange={(event) => updateField("message", event.target.value)}
        placeholder="Describe the support request"
        rows={5}
        className="mt-4 w-full rounded-xl border border-input bg-transparent px-3 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />

      {error ? (
        <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      {isSuccess ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          Support ticket submitted successfully.
        </div>
      ) : null}

      <Button disabled={isSubmitting} className="mt-5 h-11 rounded-xl bg-violet-600 px-5 text-white hover:bg-violet-700">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating ticket...
          </>
        ) : (
          "Create support ticket"
        )}
      </Button>
    </form>
  );
}
