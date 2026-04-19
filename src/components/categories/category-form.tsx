"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  createCategorySchema,
  type CreateCategorySchemaValues,
} from "@/modules/categories/categories.schema";
import { parseApiError } from "@/lib/error-parser";
import type { Category } from "@/modules/categories/categories.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
    // The 'as' cast here resolves the conflict between Zod's input and output types
    resolver: zodResolver(
      createCategorySchema,
    ) as Resolver<CreateCategorySchemaValues>,
    defaultValues: {
      name: defaultValues?.name ?? "",
      status: defaultValues?.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
    },
  });

  const onSubmit = async (data: CreateCategorySchemaValues) => {
    try {
      await onSubmitAction(data);
      toast.success("Category saved successfully");
    } catch (error: unknown) {
      const parsed = parseApiError(error);

      // Type-safe field error mapping without 'any'
      parsed.fieldErrors.forEach((err) => {
        const path = err.path;
        if (path === "name" || path === "status") {
          setError(path, {
            type: "server",
            message: err.message,
          });
        }
      });

      toast.error(parsed.message || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="category-name">Category Name</Label>
        <Input
          id="category-name"
          placeholder="e.g. Electronics"
          {...register("name")}
          disabled={isSubmitting}
          className={cn(
            errors.name && "border-destructive focus-visible:ring-destructive",
          )}
        />
        {errors.name && (
          <p className="text-sm font-medium text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Status Select */}
      <div className="space-y-2">
        <Label htmlFor="category-status">Status</Label>
        <select
          id="category-status"
          {...register("status")}
          disabled={isSubmitting}
          className={cn(
            "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errors.status && "border-destructive",
          )}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        {errors.status && (
          <p className="text-sm font-medium text-destructive">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Submit Action */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[140px] rounded-xl font-semibold shadow-sm"
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
