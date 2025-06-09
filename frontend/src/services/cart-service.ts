import {BaseService} from "@/services/base-service.ts";
import type {CategoryResponse} from "@/models/dto/response/category-response.ts";
import type {CreateCartRequest} from "@/models/dto/request/cart/create-cart.ts";
import type {CartResponse} from "@/models/dto/response/cart-response.ts";
import type {UpdateCartRequest} from "@/models/dto/request/cart/update-cart-request.ts";

export class CartService extends BaseService {
  private static url = "/api/v1/carts";

  public static getMyCarts = async (): Promise<CartResponse[]> => {
    return this.get(this.url, "Get All Categories Failed");
  };

  public static createCart = async (cartRequest: CreateCartRequest): Promise<CategoryResponse> => {
    return this.post(this.url, "Create Cart Failed", cartRequest);
  }

  public static deleteCart = async (id: string): Promise<void> => {
    return this.delete(`${this.url}/${id}`, "Delete Cart Failed");
  };

  public static updateCart = async (cartRequest: UpdateCartRequest): Promise<CartResponse> => {
    return this.put(`${this.url}/${cartRequest.id}`, "Update Cart Failed", cartRequest);
  };

  public static deleteAllCarts = async (): Promise<void> => {
    return this.delete(`${this.url}`, "Delete All Carts Failed");
  }
}