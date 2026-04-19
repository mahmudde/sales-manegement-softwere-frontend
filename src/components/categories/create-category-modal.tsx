"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tag, Loader2, CheckCircle2 } from "lucide-react";

import {
  createCategorySchema,
  type CreateCategorySchemaValues,
} from "@/modules/categories/categories.schema";
import { useCreateCategory } from "@/hooks/use-categories";
import { parseApiError } from "@/lib/error-parser";
import type { Category } from "@/modules/categories/categories.types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CreateCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (category: Category) => void;
};

export default function CreateCategoryModal({
  open,
  onOpenChange,
  onCreated,
}: CreateCategoryModalProps) {
  const createCategoryMutation = useCreateCategory();

  // 1. Initialize useForm with strict generic and Resolver cast
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorySchemaValues>({
    // Explicit casting solves the 'Type unknown is not assignable to number/string' issue
    resolver: zodResolver(
      createCategorySchema,
    ) as Resolver<CreateCategorySchemaValues>,
    defaultValues: {
      name: "",
      status: "ACTIVE",
    },
  });

  // 2. Submit Handler
  const onSubmit = async (data: CreateCategorySchemaValues) => {
    try {
      const response = await createCategoryMutation.mutateAsync(data);

      // Accessing the data based on common API response structures
      const createdCategory = response.data;

      onCreated(createdCategory);
      toast.success("Category created successfully");

      reset(); // Clear form fields
      onOpenChange(false); // Close modal
    } catch (error: unknown) {
      const parsed = parseApiError(error);

      // 3. Strict field error mapping
      parsed.fieldErrors.forEach((err) => {
        // Ensuring the field name matches our schema keys
        if (err.path === "name" || err.path === "status") {
          setError(err.path, {
            message: err.message,
          });
        }
      });

      toast.error(parsed.message || "Failed to create category");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        // Prevent closing the modal while the request is in progress
        if (!isSubmitting) {
          if (!nextOpen) reset();
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-950">
        {/* Modal Header */}
        <DialogHeader className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-600 rounded-xl text-white shadow-lg shadow-violet-200 dark:shadow-none">
              <Tag className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              New Category
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Category Name
            </label>
            <Input
              placeholder="e.g. Wireless Peripherals"
              className={cn(
                "h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-violet-500 font-medium transition-all text-slate-900 dark:text-white",
                errors.name && "ring-2 ring-red-500",
              )}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-[11px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-left-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Visibility Status
            </label>
            <div className="relative">
              <select
                {...register("status")}
                className={cn(
                  "w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none px-4 text-sm font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-violet-500 outline-none transition-all text-slate-900 dark:text-white",
                  errors.status && "ring-2 ring-red-500",
                )}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <CheckCircle2 className="h-4 w-4 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Form Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Discard
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-600 hover:bg-violet-700 text-white font-black px-6 rounded-xl shadow-lg shadow-violet-100 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Create Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
