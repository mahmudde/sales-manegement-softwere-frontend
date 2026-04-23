"use client";

import type { CreateStorageSchemaValues } from "@/modules/storages/storages.schema";
import { useUpdateStorage } from "@/hooks/use-storages";
import { Warehouse, PencilLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StorageForm from "@/components/storages/storage-form";

type EditStorageModalProps = {
  storage: Storage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditStorageModal({
  storage,
  open,
  onOpenChange,
}: EditStorageModalProps) {
  const updateStorageMutation = useUpdateStorage(storage?.id || "");

  if (!storage) return null;

  const handleUpdate = async (data: CreateStorageSchemaValues) => {
    await updateStorageMutation.mutateAsync(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl border-violet-100 p-0 shadow-2xl sm:max-w-xl">
        <div className="h-2 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase italic text-slate-800">
            <PencilLine className="h-5 w-5 text-violet-600" />
            Edit Storage
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="rounded-2xl border bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4 text-violet-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Editing Storage
                  </span>
                </div>

                <span className="text-sm font-black text-violet-700">
                  {storage.name || "Unnamed Storage"}
                </span>
              </div>
            </div>

            <StorageForm
              defaultValues={storage}
              onSubmitAction={handleUpdate}
              submitText="Update Storage"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
