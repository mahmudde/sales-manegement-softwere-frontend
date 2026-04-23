import { z } from "zod";

export const stockInSchema = z.object({
  shopId: z.string().min(1, "Shop is required"),
  storageId: z.string().min(1, "Storage is required"),
  productId: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  note: z.string().optional(),
});

export const stockOutSchema = z.object({
  shopId: z.string().min(1, "Shop is required"),
  storageId: z.string().min(1, "Storage is required"),
  productId: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  note: z.string().optional(),
});

export type StockInSchemaValues = z.infer<typeof stockInSchema>;
export type StockOutSchemaValues = z.infer<typeof stockOutSchema>;
