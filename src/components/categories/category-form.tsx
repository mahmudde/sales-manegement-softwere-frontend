"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // Added for better UX

import {
  createCategorySchema,
  type CreateCategorySchemaValues,
} from "@/modules/categories/categories.schema";
import { parseApiError } from "@/lib/error-parser";
import type { Category } from "@/modules/categories/categories.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Assuming you have this shadcn component

type CategoryFormProps = {
  defaultValues?: Partial<Category>;
  onSubmitAction: (payload: CreateCategorySchemaValues) => Promise<void>;
  submitText?: string;
};

export default function CategoryForm({
  defaultValues,
  onSubmitAction,
  submitText = "Save Category",
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorySchemaValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      status: defaultValues?.status || "ACTIVE",
    },
  });

  const onSubmit = async (data: CreateCategorySchemaValues) => {
    try {
      await onSubmitAction(data);
      toast.success("Category saved successfully");
    } catch (error: unknown) {
      // 1. Strict Error Parsing
      const parsed = parseApiError(error);

      // 2. Type-safe field mapping
      parsed.fieldErrors.forEach((err) => {
        const fieldPath = err.path as keyof CreateCategorySchemaValues;

        // Ensure the path actually exists on our form schema
        if (fieldPath === "name" || fieldPath === "status") {
          setError(fieldPath, {
            type: "server",
            message: err.message,
          });
        }
      });

      toast.error(parsed.message || "Failed to save category");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category-name">Category Name</Label>
        <Input
          id="category-name"
          placeholder="e.g. Pet Food, Accessories"
          {...register("name")}
          disabled={isSubmitting}
          className={
            errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {errors.name && (
          <p className="text-sm font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-status">Status</Label>
        <select
          id="category-status"
          {...register("status")}
          disabled={isSubmitting}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        {errors.status && (
          <p className="text-sm font-medium text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px] rounded-xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
    </form>
  );
}
