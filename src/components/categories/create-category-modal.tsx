"use client";

import { useCreateCategory } from "@/hooks/use-categories";
import type { Category } from "@/modules/categories/categories.types";
import type { CreateCategorySchemaValues } from "@/modules/categories/categories.schema";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "@/components/categories/category-form";

type CreateCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (category: Category) => void; // Made optional just in case
};

export default function CreateCategoryModal({
  open,
  onOpenChange,
  onCreated,
}: CreateCategoryModalProps) {
  const createCategoryMutation = useCreateCategory();

  const handleCreate = async (data: CreateCategorySchemaValues) => {
    // mutateAsync allows the CategoryForm's try/catch to handle the error
    const response = await createCategoryMutation.mutateAsync(data);

    // Ensure response and data exist before calling onCreated
    if (response?.data) {
      onCreated?.(response.data);
      onOpenChange(false);
      // Note: We don't need toast.success here because CategoryForm handles it!
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <CategoryForm
          onSubmitAction={handleCreate}
          submitText="Create Category"
        />
      </DialogContent>
    </Dialog>
  );
}
