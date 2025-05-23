import { z } from "zod";

export const createProductVariantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  variantImage: z.string().min(1, "Variant image is required"),
  imageFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Product image is required",
    })
    .optional(),
  price: z.number().min(0, "Price must be at least 0"),
  stock: z.number().min(0, "Stock must be at least 0"),
});

export type CreateProductVariantRequest = z.infer<
  typeof createProductVariantSchema
>;
