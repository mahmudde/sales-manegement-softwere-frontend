"use client";

import type { ReactNode, FormEvent } from "react";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createContactMessage } from "@/modules/public/public.api";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setIsSuccess(false);
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors: Partial<FormState> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid business email.";
    }

    if (form.company.trim().length < 2) {
      nextErrors.company = "Company name is required.";
    }

    if (form.message.trim().length < 20) {
      nextErrors.message = "Message must be at least 20 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await createContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        message: form.message,
      });
      setIsSuccess(true);
      setForm(initialState);
    } catch {
      setSubmitError("We could not submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <Input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="h-11 rounded-xl" />
        </Field>
        <Field label="Business email" error={errors.email}>
          <Input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="h-11 rounded-xl" />
        </Field>
        <Field label="Company" error={errors.company}>
          <Input value={form.company} onChange={(event) => updateField("company", event.target.value)} className="h-11 rounded-xl" />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <Input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="h-11 rounded-xl" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="How can we help?" error={errors.message}>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            rows={5}
            className="w-full rounded-xl border border-input bg-transparent px-3 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </Field>
      </div>

      {isSuccess ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          Your request has been submitted to the agency lead workflow.
        </div>
      ) : null}

      {submitError ? (
        <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
          {submitError}
        </div>
      ) : null}

      <Button disabled={isSubmitting} className="mt-5 h-11 rounded-xl bg-violet-600 px-5 text-white hover:bg-violet-700">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending request...
          </>
        ) : (
          "Send request"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
        {label}
      </span>
      {children}
      {error ? <span className="text-xs font-semibold text-rose-600">{error}</span> : null}
    </label>
  );
}
