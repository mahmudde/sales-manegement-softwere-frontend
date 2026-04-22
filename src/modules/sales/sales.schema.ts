import { z } from "zod";

export const createSaleSchema = z.object({
  shopId: z.string().min(1, "Please select a shop"),
  storageId: z.string().min(1, "Please select a storage"),
  paymentMethod: z.enum(["CASH", "CARD", "BANK", "MOBILE_BANKING"]),
  discount: z.coerce.number().min(0).default(0),
  paidAmount: z.coerce.number().min(0),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product is required"),
        quantity: z.coerce.number().min(1, "Min quantity is 1"),
      }),
    )
    .min(1, "At least one item is required"),
});

export type CreateSaleSchemaValues = z.output<typeof createSaleSchema>;
