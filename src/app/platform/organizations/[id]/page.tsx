"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Power,
  CreditCard,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  useOrganization,
  useUpdateOrganizationStatus,
} from "@/hooks/use-platform";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PlatformOrganization = {
  id: string;
  name: string;
  slug?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED" | string;
  createdAt?: string | null;
  subscriptions?: unknown;
  subscription?: unknown;
  billingPlan?: unknown;
};

export default function PlatformOrganizationDetailsPage() {
  const params = useParams<{ id: string }>();
  const organizationId = params.id;

  const { data, isLoading, isError } = useOrganization(organizationId);
  const updateStatusMutation = useUpdateOrganizationStatus(organizationId);

  const organization: PlatformOrganization | undefined = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading organization...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
        <p className="text-sm font-medium text-destructive">
          Failed to load organization.
        </p>
      </div>
    );
  }

  const isActive = organization.status === "ACTIVE";
  const nextStatus = isActive ? "SUSPENDED" : "ACTIVE";
  const billingData =
    organization.subscriptions ||
    organization.subscription ||
    organization.billingPlan;

  const handleToggleStatus = async () => {
    try {
      await updateStatusMutation.mutateAsync({
        status: nextStatus,
      });

      toast.success(`Organization marked as ${nextStatus}`);
    } catch {
      toast.error("Failed to update organization status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
            <Building2 className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">
              {organization.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Platform organization details and status control.
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="h-11 rounded-2xl bg-white font-bold"
        >
          <Link href="/platform/organizations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Organizations
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden rounded-3xl border border-muted/60 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2 text-lg font-black text-slate-800">
              <Building2 className="h-5 w-5 text-violet-500" />
              Organization Info
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 p-6 text-sm">
            <InfoRow
              label="Name"
              value={organization.name}
              icon={<Building2 />}
            />
            <InfoRow
              label="Slug"
              value={organization.slug || "-"}
              icon={<Building2 />}
            />
            <InfoRow
              label="Email"
              value={organization.email || "-"}
              icon={<Mail />}
            />
            <InfoRow
              label="Phone"
              value={organization.phone || "-"}
              icon={<Phone />}
            />
            <InfoRow
              label="Address"
              value={organization.address || "-"}
              icon={<MapPin />}
            />
            <InfoRow
              label="Created At"
              value={
                organization.createdAt
                  ? new Date(organization.createdAt).toLocaleDateString()
                  : "-"
              }
              icon={<CalendarDays />}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-3xl border border-muted/60 bg-white shadow-sm">
          <div
            className={cn("h-2", isActive ? "bg-emerald-500" : "bg-rose-500")}
          />

          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2 text-lg font-black text-slate-800">
              <Power className="h-5 w-5 text-violet-500" />
              Status Control
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 p-6 text-sm">
            <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Current Status
              </span>

              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-black uppercase",
                  organization.status === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-700"
                    : organization.status === "SUSPENDED"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700",
                )}
              >
                {organization.status || "UNKNOWN"}
              </span>
            </div>

            <Button
              type="button"
              variant={isActive ? "destructive" : "default"}
              onClick={handleToggleStatus}
              disabled={updateStatusMutation.isPending}
              className={cn(
                "h-12 rounded-2xl px-5 font-black uppercase shadow-lg",
                !isActive && "bg-emerald-600 hover:bg-emerald-700",
              )}
            >
              {updateStatusMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : isActive ? (
                <>
                  <Power className="mr-2 h-4 w-4" />
                  Suspend Organization
                </>
              ) : (
                <>
                  <Power className="mr-2 h-4 w-4" />
                  Activate Organization
                </>
              )}
            </Button>

            <p className="rounded-2xl border bg-slate-50 p-4 text-xs font-medium text-muted-foreground">
              Suspended organizations should lose access to protected tenant
              business modules according to backend auth rules.
            </p>
          </CardContent>
        </Card>
      </div>

      {billingData ? (
        <Card className="overflow-hidden rounded-3xl border border-muted/60 bg-white shadow-sm">
          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2 text-lg font-black text-slate-800">
              <CreditCard className="h-5 w-5 text-violet-500" />
              Billing / Subscription
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <pre className="max-h-[360px] overflow-auto rounded-2xl border bg-slate-950 p-4 text-xs text-slate-100">
              {JSON.stringify(billingData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactElement;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <span className="text-violet-500 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>

      <span className="text-right font-bold text-slate-800">{value}</span>
    </div>
  );
}
