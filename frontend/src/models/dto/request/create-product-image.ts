import { z } from "zod";

export const createProductImageSchema = z.object({
  id: z.string().optional(),
  productImage: z.string().min(1, "Product image is required"),
  imageFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Product image is required",
    })
    .optional(),
});

export type CreateProductImageRequest = z.infer<
  typeof createProductImageSchema
>;
