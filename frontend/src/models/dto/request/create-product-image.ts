import { z } from "zod"

export const createProductImageSchema = z.object({
  productImage: z.string().min(1, "Product image is required"),
  imageFile : z
    .any()
    .refine((file) => file instanceof File, {
      message: "Product image is required",
    }).optional()
});

export type CreateProductImageDto = z.infer<typeof createProductImageSchema>