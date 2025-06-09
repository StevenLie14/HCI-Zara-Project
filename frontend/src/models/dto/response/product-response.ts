import type {CategoryResponse} from "@/models/dto/response/category-response.ts";
import type {ProductVariantResponse} from "@/models/dto/response/product-variant-response.ts";
import type {ProductImageResponse} from "@/models/dto/response/product-image-response.ts";

export interface ProductResponse {
  id : string
  name : string
  description : string
  gender: string
  category : CategoryResponse
  productVariants : ProductVariantResponse[]
  productImages : ProductImageResponse[]
  createdAt : string
}
