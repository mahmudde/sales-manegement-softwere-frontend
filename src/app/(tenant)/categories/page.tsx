"use client";

import { useState } from "react";
import {
  Plus,
  Tag,
  Layers,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useCategories } from "@/hooks/use-categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateCategoryModal from "@/components/categories/create-category-modal";
import CategoriesTable from "@/components/categories/categories-table"; // Assuming this exists or will be built next
import { cn } from "@/lib/utils";
import { Category } from "@/modules/categories/categories.types";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useCategories({
    page: 1,
    limit: 50,
  });

  const categories = data?.data ?? [];
  const activeCategories = categories.filter(
    (c: Category) => c.status === "ACTIVE",
  ).length;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Categories
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Organize your products into logical groups for better filtering.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl px-6 py-6 h-auto shadow-xl shadow-violet-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="font-bold text-base">New Category</span>
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-slate-900/50">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-violet-50 dark:bg-violet-500/10 text-violet-600">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                Total Groups
              </p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                {categories.length}
              </h4>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-slate-900/50">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                Active Status
              </p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                {activeCategories}
              </h4>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] rounded-[2rem] border-2 border-slate-50 dark:border-slate-900 bg-white dark:bg-slate-950">
          <Loader2 className="h-10 w-10 text-violet-600 animate-spin mb-4" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Fetching Categories
          </p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] rounded-[2rem] border-2 border-rose-100 bg-rose-50/20 text-rose-600 p-8 text-center">
          <AlertCircle className="h-8 w-8 mb-4 opacity-50" />
          <h3 className="font-black text-xl">Sync Failed</h3>
          <Button
            variant="ghost"
            className="mt-4 font-bold text-rose-600 hover:bg-rose-100 rounded-xl"
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <div className="animate-in fade-in duration-700">
          {/* If you haven't built CategoriesTable yet, you can map categories here */}
          <CategoriesTable categories={categories} />
        </div>
      )}

      {/* Create Modal */}
      <CreateCategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreated={() => refetch()} // Refresh list after creation
      />
    </div>
  );
}
