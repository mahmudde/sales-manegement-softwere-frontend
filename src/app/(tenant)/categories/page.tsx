"use client";

import CategoriesTable from "@/components/categories/categories-table";
import CreateCategoryModal from "@/components/categories/create-category-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/use-categories";
import { Category } from "@/modules/categories/categories.types";
import { Loader2, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  // 1. Debounce Search:
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400); // 400ms delay
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError } = useCategories({
    page: 1,
    limit: 20,
    searchTerm: debouncedSearch,
  });

  const categories: Category[] = data?.data ?? [];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Organize and manage your product catalog hierarchy.
          </p>
        </div>

        <Button
          onClick={() => setCreateOpen(true)}
          className="rounded-xl shadow-sm bg-violet-600 hover:bg-violet-700 transition-all flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Filter/Search Section */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl focus-visible:ring-violet-500"
        />
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 p-20">
          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Fetching categories...
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="text-sm font-semibold text-destructive">
            Failed to load categories. Please check your connection.
          </p>
        </div>
      ) : (
        <CategoriesTable categories={categories} />
      )}

      {/* Create Modal */}
      <CreateCategoryModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => {
          setCreateOpen(false);
        }}
      />
    </div>
  );
}
