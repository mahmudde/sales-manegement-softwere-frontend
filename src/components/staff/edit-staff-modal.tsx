"use client";

import { UserCog } from "lucide-react";

import type { Staff } from "@/modules/staff/staff.types";
import type { UpdateStaffPayload } from "@/modules/staff/staff.types";
import { useUpdateStaff } from "@/hooks/use-staff";

import StaffForm from "@/components/staff/staff-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  staff: Staff | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditStaffModal({ staff, open, onOpenChange }: Props) {
  const updateStaffMutation = useUpdateStaff(staff?.id || "");

  if (!staff) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-2xl">
        {/* top gradient */}
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        {/* header */}
        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-black uppercase text-slate-800">
            <UserCog className="h-5 w-5 text-violet-600" />
            Edit Staff
          </DialogTitle>
        </DialogHeader>

        {/* scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="mb-5 rounded-2xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Staff Update
              </span>
              <span className="text-sm font-black text-violet-700">
                Edit Member
              </span>
            </div>
          </div>

          <StaffForm
            mode="edit"
            defaultValues={staff}
            submitText="Update Staff"
            onSubmitAction={async (payload) => {
              await updateStaffMutation.mutateAsync(
                payload as UpdateStaffPayload,
              );
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
