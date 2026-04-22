import { z } from "zod";

export const addPaymentSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  paymentMethod: z.enum(["CASH", "CARD", "BANK", "MOBILE_BANKING"]),
  note: z.string().optional(),
});

export type AddPaymentSchemaValues = z.output<typeof addPaymentSchema>;
export type AddPaymentSchemaInput = z.input<typeof addPaymentSchema>;
