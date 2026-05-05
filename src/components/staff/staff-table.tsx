"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { Staff } from "@/modules/staff/staff.types";
import { useUpdateStaffStatus } from "@/hooks/use-staff";
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

function getStaffImage(member: Staff): string {
  if (typeof member.user?.image === "string") {
    return member.user.image;
  }

  if (typeof member.image === "string") {
    return member.image;
  }

  if (
    member.image &&
    typeof member.image === "object" &&
    "url" in member.image &&
    typeof member.image.url === "string"
  ) {
    return member.image.url;
  }

  return "";
}

function getStaffStatus(member: Staff) {
  if (typeof member.isActive === "boolean") {
    return member.isActive ? "ACTIVE" : "INACTIVE";
  }

  return member.status || member.user?.status || "ACTIVE";
}

export default function StaffTable({ staff }: Props) {
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  if (staff.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-6 text-sm text-muted-foreground">
        No staff found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Shop</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
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
  const staffStatus = getStaffStatus(member);
  const nextStatus = staffStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  const statusTargetId = member.userId || member.id;
  const updateStatusMutation = useUpdateStaffStatus(statusTargetId);

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
    <tr className="border-t">
      <td className="px-4 py-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={getStaffName(member)}
            className="h-10 w-10 rounded-2xl border object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-2xl border bg-muted" />
        )}
      </td>

      <td className="px-4 py-3 font-medium">{getStaffName(member)}</td>
      <td className="px-4 py-3">{getStaffEmail(member)}</td>
      <td className="px-4 py-3">{getStaffPhone(member)}</td>
      <td className="px-4 py-3">{member.role}</td>
      <td className="px-4 py-3">{member.shopName || member.shopId || "-"}</td>

      <td className="px-4 py-3">
        <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
          {staffStatus}
        </span>
      </td>

      <td className="px-4 py-3 space-x-3">
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          type="button"
          className="text-orange-500 hover:underline disabled:opacity-50"
          onClick={handleToggleStatus}
          disabled={updateStatusMutation.isPending}
        >
          {updateStatusMutation.isPending ? "Updating..." : nextStatus}
        </button>
      </td>
    </tr>
  );
}
