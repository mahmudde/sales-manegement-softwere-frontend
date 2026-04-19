"use client";

import type { Category } from "@/modules/categories/categories.types";
import type { CreateCategorySchemaValues } from "@/modules/categories/categories.schema";
import { useUpdateCategory } from "@/hooks/use-categories";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "@/components/categories/category-form";

type EditCategoryModalProps = {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditCategoryModal({
  category,
  open,
  onOpenChange,
}: EditCategoryModalProps) {
  // We pass the ID into the hook.
  // If your hook uses this ID for invalidation, it's ready.
  const updateCategoryMutation = useUpdateCategory(category?.id ?? "");

  // It's better to render the Dialog but keep the content conditional
  // to avoid breaking Dialog's internal exit animations.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        {category ? (
          <CategoryForm
            key={category.id} // 🔥 Critical: resets form when switching categories
            defaultValues={category}
            onSubmitAction={async (data) => {
              await updateCategoryMutation.mutateAsync(data);
              onOpenChange(false);
            }}
            submitText="Update Category"
          />
        ) : (
          <div className="flex h-40 items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Loading category...
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
