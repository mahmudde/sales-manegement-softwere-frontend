"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/modules/categories/categories.api";
import { categoriesKeys } from "@/modules/categories/categories.keys";

export function useCategories(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: categoriesKeys.list(params),
    queryFn: () => getCategories(params),
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: categoriesKeys.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof updateCategory>[1]) =>
      updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
      queryClient.invalidateQueries({ queryKey: categoriesKeys.detail(id) });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}
