import { z } from "zod";

export const createShopSchema = z.object({
  name: z.string().min(2, "Shop name must be at least 2 characters"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type CreateShopSchemaInput = z.input<typeof createShopSchema>;
export type CreateShopSchemaValues = z.output<typeof createShopSchema>;
