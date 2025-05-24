import {BaseService} from "@/services/base-service.ts";
import type {CategoryResponse} from "@/models/dto/response/category-response.ts";

export class CategoryService extends BaseService {
  private static url = "/api/v1/category";

  public static getAllCategories = async (): Promise<CategoryResponse[]> => {
    return this.get(this.url, "Get All Categories Failed");
  };
}