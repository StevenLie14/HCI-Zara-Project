import { createProductImageSchema } from "src/models/dto/request/create-product-image.ts";
import { createProductVariantSchema } from "src/models/dto/request/create-product-variant.ts";
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product Name is required"),
  description: z.string().min(1, "Product Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  variants: z
    .array(createProductVariantSchema)
    .min(1, "At least one variant is required"),
  images: z
    .array(createProductImageSchema)
    .min(1, "At least one product image is required"),
});

export type CreateProductRequest = z.infer<typeof createProductSchema>;
