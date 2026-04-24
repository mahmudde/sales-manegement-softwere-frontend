import { z } from "zod";

export const createStaffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum(["ORG_ADMIN", "SHOP_ADMIN", "STAFF"]),
  shopId: z.string().optional(),
});

export const updateStaffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  role: z.enum(["ORG_ADMIN", "SHOP_ADMIN", "STAFF"]),
  shopId: z.string().optional(),
});

export type CreateStaffSchemaValues = z.infer<typeof createStaffSchema>;
export type UpdateStaffSchemaValues = z.infer<typeof updateStaffSchema>;
