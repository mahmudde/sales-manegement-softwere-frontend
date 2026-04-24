"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Users,
  Mail,
  Phone,
  Store,
  Shield,
  PencilLine,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import type { Staff } from "@/modules/staff/staff.types";
import { useUpdateStaffStatus } from "@/hooks/use-staff";
import { cn } from "@/lib/utils";
import EditStaffModal from "@/components/staff/edit-staff-modal";

type Props = {
  staff: Staff[];
};

function getStaffName(member: Staff) {
  return member.user?.name || member.name || "-";
}

function getStaffEmail(member: Staff) {
  return member.user?.email || member.email || "-";
}

function getStaffPhone(member: Staff) {
  return member.user?.phone || member.phone || "-";
}

function getStaffImage(member: Staff) {
  if (typeof member.user?.image === "string") return member.user.image;
  return member.image || "";
}

function getStaffStatus(member: Staff) {
  return member.user?.status || member.status || "-";
}

function getShopName(member: Staff) {
  return member.shopName || member.shopId || member.organization?.name || "-";
}

export default function StaffTable({ staff }: Props) {
  console.log(staff);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  if (staff.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
          <AlertCircle className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          No staff found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-muted/60 bg-white shadow-sm">
        <div className="border-b bg-muted/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-violet-500" />
            <h2 className="text-base font-bold text-slate-800">Staff List</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/5">
              <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4">Staff</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Organization / Shop</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {staff.map((member) => (
                <StaffRow
                  key={member.id}
                  member={member}
                  onEdit={() => {
                    setEditingStaff(member);
                    setEditOpen(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditStaffModal
        staff={editingStaff}
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditingStaff(null);
        }}
      />
    </>
  );
}

function StaffRow({ member, onEdit }: { member: Staff; onEdit: () => void }) {
  const updateStatusMutation = useUpdateStaffStatus(member.userId || member.id);

  const currentStatus = getStaffStatus(member);
  const nextStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  const imageUrl = getStaffImage(member);

  const handleToggleStatus = async () => {
    try {
      await updateStatusMutation.mutateAsync({ status: nextStatus });
      toast.success("Staff status updated");
    } catch {
      toast.error("Failed to update staff status");
    }
  };

  return (
    <tr className="transition-colors hover:bg-violet-50/40">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={getStaffName(member)}
              className="h-10 w-10 rounded-2xl border object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50">
              <Users className="h-4 w-4 text-violet-600" />
            </div>
          )}

          <div>
            <p className="font-bold text-slate-800">{getStaffName(member)}</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              {member.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Mail className="h-4 w-4 text-violet-500" />
          <span>{getStaffEmail(member)}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Phone className="h-4 w-4 text-violet-500" />
          <span>{getStaffPhone(member)}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Shield className="h-4 w-4 text-violet-500" />
          <span>{member.role || "-"}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Store className="h-4 w-4 text-violet-500" />
          <span>{getShopName(member)}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-[11px] font-bold",
            currentStatus === "ACTIVE"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700",
          )}
        >
          {currentStatus}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-100"
            onClick={onEdit}
          >
            <PencilLine className="h-3.5 w-3.5" />
            Edit
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
            onClick={handleToggleStatus}
            disabled={updateStatusMutation.isPending}
          >
            <RefreshCw
              className={cn(
                "h-3.5 w-3.5",
                updateStatusMutation.isPending && "animate-spin",
              )}
            />
            {nextStatus}
          </button>
        </div>
      </td>
    </tr>
  );
}
