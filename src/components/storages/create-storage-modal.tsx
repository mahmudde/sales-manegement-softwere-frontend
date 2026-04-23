"use client";

import type { CreateStorageSchemaValues } from "@/modules/storages/storages.schema";
import { useCreateStorage } from "@/hooks/use-storages";
import { Warehouse } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StorageForm from "@/components/storages/storage-form";

type CreateStorageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateStorageModal({
  open,
  onOpenChange,
}: CreateStorageModalProps) {
  const createStorageMutation = useCreateStorage();

  const handleCreate = async (data: CreateStorageSchemaValues) => {
    await createStorageMutation.mutateAsync(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-xl">
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-black uppercase text-slate-800">
            <Warehouse className="h-5 w-5 text-violet-600" />
            Add Storage
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="mb-5 rounded-2xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Storage Setup
              </span>
              <span className="text-sm font-black text-violet-700">
                New Location
              </span>
            </div>
          </div>

          <StorageForm
            onSubmitAction={handleCreate}
            submitText="Create Storage"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
