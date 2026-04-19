import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  costPrice: z.coerce
    .number()
    .min(0, "Cost price must be at least 0")
    .optional(),
  categoryId: z.string().min(1, "Category is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type ProductSchemaValues = z.infer<typeof productSchema>;
