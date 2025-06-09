import {z} from "zod";

export const createCartSchema = z.object({
  variantId: z.string().min(1, "VariantId is required"),
  productId: z.string().min(1, "ProductId is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type CreateCartRequest = z.infer<typeof createCartSchema>;