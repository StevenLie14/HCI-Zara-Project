import {z} from "zod";

export const createTransactionSchema = z.object({
  shippingAddressId : z.string().min(1, "Shipping Address is required"),
  paymentMethod: z.string().min(1, "Payment Method is required"),
});

export type CreateTransactionRequest = z.infer<typeof createTransactionSchema>;