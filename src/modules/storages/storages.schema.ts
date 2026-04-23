import { z } from "zod";

export const createStorageSchema = z.object({
  name: z.string().min(2, "Storage name must be at least 2 characters"),
  address: z.string().optional(),
  shopId: z.string().min(1, "Shop is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type CreateStorageSchemaValues = z.infer<typeof createStorageSchema>;
