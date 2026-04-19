"use client";

import { Plus, RefreshCcw, Tag } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import type { Category } from "@/modules/categories/categories.types";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type CategorySelectProps = {
  value?: string;
  onChange: (value: string) => void;
  onAddCategory: () => void;
  disabled?: boolean;
  canAddCategory?: boolean;
};

export default function CategorySelect({
  value,
  onChange,
  onAddCategory,
  disabled,
  canAddCategory = true,
}: CategorySelectProps) {
  const { data, isLoading, isError, refetch } = useCategories({
    page: 1,
    limit: 100, // Fetching a large batch for the dropdown
  });

  const categories: Category[] = data?.data ?? [];

  return (
    <div className="space-y-3">
      {/* Header Label & Add Button */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
          Category
        </label>

        {canAddCategory && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onAddCategory}
            className="h-7 px-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all"
          >
            <Plus className="h-3 w-3" />
            New Category
          </Button>
        )}
      </div>

      {/* Main State Logic */}
      {isLoading ? (
        <div className="h-12 w-full rounded-2xl border-none bg-slate-50 dark:bg-slate-900 animate-pulse" />
      ) : isError ? (
        <div className="flex items-center justify-between rounded-2xl border-2 border-rose-50 bg-rose-50/20 p-3 text-sm">
          <p className="text-rose-500 font-bold text-xs ml-2">Failed to load</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-rose-600 hover:bg-rose-100 rounded-xl font-bold"
            onClick={() => refetch()}
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        </div>
      ) : (
        <Select
          value={value}
          onValueChange={onChange}
          disabled={disabled || categories.length === 0}
        >
          <SelectTrigger
            className={cn(
              "h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none px-4 font-bold focus:ring-2 focus:ring-violet-500 transition-all",
              !value && "text-slate-400",
            )}
          >
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-slate-400" />
              <SelectValue placeholder="Select a category" />
            </div>
          </SelectTrigger>

          <SelectContent className="rounded-2xl border-slate-100 dark:border-slate-800 shadow-xl">
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="rounded-xl focus:bg-violet-50 focus:text-violet-600 font-medium py-3"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Empty State Hint */}
      {!isLoading && !isError && categories.length === 0 && (
        <p className="text-[11px] font-bold text-slate-400 italic ml-1">
          No categories available. Please create one first.
        </p>
      )}
    </div>
  );
}
