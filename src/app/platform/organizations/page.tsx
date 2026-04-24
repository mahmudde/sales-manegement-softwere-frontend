"use client";

import Link from "next/link";
import { useState } from "react";
import { useOrganizations } from "@/hooks/use-platform";
import {
  Building2,
  Search,
  Loader2,
  AlertCircle,
  ArrowRight,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PlatformOrganization = {
  id: string;
  name: string;
  slug?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED" | string;
  createdAt?: string | null;
};

export default function PlatformOrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useOrganizations({
    page: 1,
    limit: 20,
    searchTerm,
  });

  const organizations: PlatformOrganization[] = Array.isArray(data?.data)
    ? data.data
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
            <Building2 className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">
              Organizations
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage all tenant organizations on the platform.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-muted/60 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 rounded-2xl border-input bg-slate-50 pl-10 font-medium shadow-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            <p className="text-sm font-medium text-muted-foreground">
              Loading organizations...
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            Failed to load organizations.
          </p>
        </div>
      ) : organizations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-violet-500" />
          <p className="text-sm font-medium text-muted-foreground">
            No organizations found.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-muted/60 bg-white shadow-sm">
          <div className="border-b bg-muted/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-500" />
              <h2 className="text-base font-bold text-slate-800">
                Organization List
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/5">
                <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {organizations.map((org) => (
                  <tr
                    key={org.id}
                    className="transition-colors hover:bg-violet-50/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50">
                          <Building2 className="h-4 w-4 text-violet-600" />
                        </div>

                        <div>
                          <p className="font-bold text-slate-800">{org.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {org.slug || "-"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail className="h-4 w-4 text-violet-500" />
                          <span>{org.email || "-"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="h-4 w-4 text-violet-500" />
                          <span>{org.phone || "-"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase",
                          org.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : org.status === "SUSPENDED"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-rose-100 text-rose-700",
                        )}
                      >
                        {org.status || "UNKNOWN"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CalendarDays className="h-4 w-4 text-violet-500" />
                        <span>
                          {org.createdAt
                            ? new Date(org.createdAt).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/platform/organizations/${org.id}`}
                        className="inline-flex items-center gap-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-100"
                      >
                        View
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
