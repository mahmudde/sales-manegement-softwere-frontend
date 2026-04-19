// @/modules/products/products.api.ts
import {
  ProductsListResponse,
  SingleProductResponse,
  Product,
} from "@/types/products.types";

/**
 * FETCH LIST OF PRODUCTS
 */
export const getProducts = async (params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  categoryId?: string;
  status?: string;
}): Promise<ProductsListResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.searchTerm) query.append("search", params.searchTerm);
  if (params.categoryId) query.append("categoryId", params.categoryId);
  if (params.status) query.append("status", params.status);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${query.toString()}`,
    {
      credentials: "include",
    },
  );

  const result = await res.json();
  if (!res.ok) throw result;
  return result;
};

export const getProductById = async (
  id: string,
): Promise<SingleProductResponse> => {
  // Add a check to ensure ID isn't 'undefined' or 'edit'
  if (!id || id === "edit") {
    throw new Error("Invalid Product ID");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "GET", // Explicitly set GET
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  // Handle cases where the response might not be JSON
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Backend returned non-JSON response:", text);
    throw new Error("Server returned an invalid response format.");
  }

  const result = await res.json();

  if (!res.ok) {
    console.error("Fetch Product Error (404/500):", result);
    throw result;
  }

  return result;
};

/**
 * CREATE PRODUCT (Multipart/FormData)
 */
export const createProduct = async (
  formData: FormData,
): Promise<SingleProductResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    body: formData, // Browser sets boundary automatically
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) throw result;
  return result;
};

/**
 * UPDATE PRODUCT (Multipart/FormData)
 */
export const updateProduct = async (
  id: string,
  formData: FormData,
): Promise<SingleProductResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) throw result;
  return result;
};

export const deleteProduct = async (
  id: string,
): Promise<{ success: boolean }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) throw result;
  return result;
};
