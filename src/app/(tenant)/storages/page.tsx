"use client";

import { useState } from "react";
import { useStorages } from "@/hooks/use-storages";
import { Warehouse, Plus, Search, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoragesTable from "@/components/storages/storages-table";
import CreateStorageModal from "@/components/storages/create-storage-modal";

export default function StoragesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading, isError } = useStorages({
    page: 1,
    limit: 20,
    searchTerm,
  });

  const storages: Storage[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
              <Warehouse className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800">
                Storages
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage storage locations and their shop association.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="h-12 rounded-2xl bg-violet-600 px-5 font-black uppercase shadow-lg hover:bg-violet-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Storage
        </Button>
      </div>

      <div className="rounded-2xl border border-muted/60 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />
          <Input
            placeholder="Search storages..."
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
              Loading storages...
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            Failed to load storages.
          </p>
        </div>
      ) : (
        <StoragesTable storages={storages} />
      )}

      <CreateStorageModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
