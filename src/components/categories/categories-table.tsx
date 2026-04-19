"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Edit, Trash2, Loader2 } from "lucide-react";

import type { Category } from "@/modules/categories/categories.types";
import { useDeleteCategory } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCategoryModal from "@/components/categories/edit-category-modal";

type CategoriesTableProps = {
  categories: Category[];
};

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = async (categoryId: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
      toast.success("Category deleted successfully");
    } catch (error: unknown) {
      // Type-safe error handling
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete category";
      toast.error(errorMessage);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-12 text-center text-sm text-muted-foreground">
        No categories found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30 transition-colors">
              <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
                Name
              </th>
              <th className="h-12 px-4 text-center align-middle font-semibold text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
                Created At
              </th>
              <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="group hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-4 font-medium text-foreground">
                  {category.name}
                </td>

                <td className="px-4 py-4 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-3 py-0.5 border-none",
                      category.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400",
                    )}
                  >
                    {category.status || "INACTIVE"}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-muted-foreground">
                  {category.createdAt
                    ? new Date(category.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-violet-50 hover:text-violet-600"
                        disabled={deleteCategoryMutation.isPending}
                      >
                        {deleteCategoryMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-44 rounded-xl shadow-xl"
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          setEditingCategory(category);
                          setEditOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" /> Edit Details
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onClick={() => handleDelete(category.id)}
                        disabled={deleteCategoryMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                        {deleteCategoryMutation.isPending
                          ? "Deleting..."
                          : "Delete Category"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditCategoryModal
        category={editingCategory}
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditingCategory(null);
        }}
      />
    </>
  );
}
