import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type CreateCategorySchemaValues = z.infer<typeof createCategorySchema>;
