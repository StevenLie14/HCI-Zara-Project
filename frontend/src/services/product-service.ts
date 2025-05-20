import {BaseService} from "./base-service.ts";

export class ProductService extends BaseService {
  private static url = "/api/v1/products"
  public static getAllUser = async () => {
    const response = await ProductService.axios()
      .get(ProductService.url)
    return response.data
  }


}