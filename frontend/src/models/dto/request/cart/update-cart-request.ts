import {z} from "zod";

export const updateCartSchema = z.object({
  id: z.string().min(1, "Cart ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type UpdateCartRequest = z.infer<typeof updateCartSchema>;