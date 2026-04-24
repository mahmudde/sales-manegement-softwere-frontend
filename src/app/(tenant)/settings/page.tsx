"use client";

import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useBillingStatus } from "@/hooks/use-billing";
import {
  User,
  CreditCard,
  Settings,
  Loader2,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function getImageUrl(user: any) {
  if (!user) return "";

  if (typeof user.image === "string") return user.image;
  if (typeof user.user?.image === "string") return user.user.image;
  if (typeof user.image?.url === "string") return user.image.url;

  return "";
}

function normalizeAuthUser(rawUser: any) {
  const nestedUser = rawUser?.user;

  return {
    name: rawUser?.name || nestedUser?.name || "-",
    email: rawUser?.email || nestedUser?.email || "-",
    phone: rawUser?.phone || nestedUser?.phone || "-",
    imageUrl: getImageUrl(rawUser),
    role:
      rawUser?.role ||
      rawUser?.organizationMembers?.[0]?.role ||
      rawUser?.platformRole ||
      "UNKNOWN",
    organization:
      rawUser?.organization ||
      rawUser?.organizationMembers?.[0]?.organization ||
      null,
  };
}

export default function SettingsPage() {
  const { data: userData, isLoading: userLoading, isError } = useCurrentUser();
  const { data: billingData, isLoading: billingLoading } = useBillingStatus();

  const rawUser = userData?.data;
  const profile = normalizeAuthUser(rawUser);
  const subscription = billingData?.data;

  if (userLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed p-10">
        <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
      </div>
    );
  }

  if (isError || !rawUser) {
    return (
      <div className="rounded-2xl border bg-background p-6 text-sm text-red-500">
        Failed to load profile settings.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
            <Settings className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-800">
              Organization Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage profile, organization context, and billing.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-3xl border border-muted/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-black">
              <User className="h-5 w-5 text-violet-500" />
              Current User
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-4">
              {profile.imageUrl ? (
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="h-16 w-16 rounded-2xl border object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-muted">
                  <User className="h-7 w-7 text-muted-foreground" />
                </div>
              )}

              <div>
                <p className="text-lg font-black text-slate-800">
                  {profile.name}
                </p>
                <p className="text-xs font-semibold text-violet-700">
                  {profile.role}
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border bg-slate-50 p-4">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-violet-500" />
                <span className="font-semibold text-slate-800">
                  {profile.email}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-violet-500" />
                <span className="font-semibold text-slate-800">
                  {profile.phone}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-500" />
                <span className="font-semibold text-slate-800">
                  {profile.role}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-muted/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-black">
              <CreditCard className="h-5 w-5 text-violet-500" />
              Subscription
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            {billingLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading subscription...
              </div>
            ) : subscription ? (
              <>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Status
                  </p>
                  <p className="text-lg font-black text-violet-700">
                    {subscription.status || "-"}
                  </p>
                </div>

                <div className="rounded-2xl border bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Plan
                  </p>
                  <p className="text-lg font-black text-slate-800">
                    {subscription.billingPlan?.name || "-"}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">No subscription found.</p>
            )}

            <Button
              asChild
              className="w-full rounded-2xl bg-violet-600 font-black uppercase hover:bg-violet-700"
            >
              <Link href="/billing">Manage Billing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border border-muted/60 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-black">
            <Building2 className="h-5 w-5 text-violet-500" />
            Organization Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          {profile.organization ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Organization Name
                </p>
                <p className="text-lg font-black text-slate-800">
                  {profile.organization.name || "-"}
                </p>
              </div>

              <div className="rounded-2xl border bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Slug
                </p>
                <p className="text-lg font-black text-slate-800">
                  {profile.organization.slug || "-"}
                </p>
              </div>

              <div className="rounded-2xl border bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Status
                </p>
                <p className="text-lg font-black text-violet-700">
                  {profile.organization.status || "-"}
                </p>
              </div>

              <div className="rounded-2xl border bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Phone
                </p>
                <p className="text-lg font-black text-slate-800">
                  {profile.organization.phone || "-"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Organization information was not found in the current user
              response.
            </p>
          )}

          <div className="rounded-2xl border bg-slate-50 p-4">
            <p className="font-bold text-slate-800">Future update fields:</p>

            <ul className="mt-2 list-disc pl-5 text-muted-foreground space-y-1">
              <li>Organization name</li>
              <li>Phone</li>
              <li>Address</li>
              <li>Logo</li>
              <li>Business email</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
