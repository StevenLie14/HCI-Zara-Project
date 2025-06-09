import type {ProductVariantResponse} from "@/models/dto/response/product-variant-response.ts";
import type {ProductResponse} from "@/models/dto/response/product-response.ts";

export interface CartResponse {
  id: string
  quantity: number
  variant: ProductVariantResponse
  product: ProductResponse
}