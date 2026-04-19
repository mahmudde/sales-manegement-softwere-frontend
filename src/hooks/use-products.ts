// @/hooks/use-products.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/modules/products/products.api";
import { productsKeys } from "@/modules/products/products.keys";
import { toast } from "sonner";

/**
 * Hook for Listing Products
 */
export function useProducts(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  categoryId?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: productsKeys.list(params),
    queryFn: () => getProducts(params),
  });
}

/**
 * Hook for Single Product Detail
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

/**
 * Hook for Creating Product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess: () => {
      // Refresh the products list automatically
      queryClient.invalidateQueries({ queryKey: productsKeys.all });
    },
  });
}

/**
 * Hook for Updating Product
 */
export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => updateProduct(id, data),
    onSuccess: () => {
      // Refresh list AND specific product detail
      queryClient.invalidateQueries({ queryKey: productsKeys.all });
      queryClient.invalidateQueries({ queryKey: productsKeys.detail(id) });
    },
  });
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (error: unknown) => {
      let errorMessage = "Failed to delete product";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = String((error as { message: unknown }).message);
      }

      toast.error(errorMessage);
    },
  });
};
