"use client";

import { UserPlus } from "lucide-react";

import { useCreateStaff } from "@/hooks/use-staff";
import StaffForm from "@/components/staff/staff-form";
import type { CreateStaffPayload } from "@/modules/staff/staff.types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateStaffModal({ open, onOpenChange }: Props) {
  const createStaffMutation = useCreateStaff();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-2xl">
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-black uppercase text-slate-800">
            <UserPlus className="h-5 w-5 text-violet-600" />
            Add Staff
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="mb-5 rounded-2xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Staff Setup
              </span>
              <span className="text-sm font-black text-violet-700">
                New Member
              </span>
            </div>
          </div>

          <StaffForm
            mode="create"
            submitText="Create Staff"
            onSubmitAction={async (payload) => {
              await createStaffMutation.mutateAsync(
                payload as CreateStaffPayload,
              );
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
