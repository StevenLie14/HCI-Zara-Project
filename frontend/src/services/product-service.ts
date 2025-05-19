import {BaseService} from "./base-service.ts";
import type {AxiosResponse} from "axios";
import type {ProductResponse} from "src/models/dto/response/product-response.ts";

export class ProductService extends BaseService {
  private static url = "/api/v1/products"
  public static getAllUser = async () => {
    const response: AxiosResponse<ProductResponse> = await ProductService.axios().get(ProductService.url+"/", {withCredentials: true})
    return response.data
  }


}