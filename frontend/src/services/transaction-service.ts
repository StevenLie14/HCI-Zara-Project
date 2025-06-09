import {BaseService} from "@/services/base-service.ts";
import type {CategoryResponse} from "@/models/dto/response/category-response.ts";
import type {CreateCartRequest} from "@/models/dto/request/cart/create-cart.ts";
import type {CartResponse} from "@/models/dto/response/cart-response.ts";
import type {UpdateCartRequest} from "@/models/dto/request/cart/update-cart-request.ts";
import type {TransactionResponse} from "@/models/dto/response/transaction-response.ts";
import type {CreateTransactionRequest} from "@/models/dto/request/transaction/create-transaction-request.ts";

export class TransactionService extends BaseService {
  private static url = "/api/v1/transactions";

  public static getMyTransactions = async (): Promise<TransactionResponse[]> => {
    return this.get(this.url, "Get All Transactions Failed");
  }

  public static createTransaction = async (req: CreateTransactionRequest): Promise<TransactionResponse> => {
    return this.post(this.url, "Create Transaction Failed", req);
  }

  public static updateTransaction = async (cartRequest: UpdateCartRequest): Promise<TransactionResponse> => {
    return this.put(`${this.url}/${cartRequest.id}`, "Update Transaction Failed", cartRequest);
  }
}