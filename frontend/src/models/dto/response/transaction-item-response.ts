import type {ProductResponse} from "@/models/dto/response/product-response.ts";
import type {ProductVariantResponse} from "@/models/dto/response/product-variant-response.ts";

export interface TransactionItemResponse {
  id: string,
  quantity : number
  price: number
  product : ProductResponse,
  variant: ProductVariantResponse
}